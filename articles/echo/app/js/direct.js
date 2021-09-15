dprevuid = "na";
abritaryindex = 0;
abritarysecondindex = 0;
infScrollEnabled = false;
sessionStorage.setItem("itwasmesoskip", "false");
sessionStorage.setItem("active_dm", "false");

function loaddirect() {
  loadactive();
  loadpendingfr();
  PREPARE_LISTEN_MESSAGES();

  document
    .getElementById("newdmmsg")
    .addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("newdmmsgbtn").click();
      }
    });
}

// Request to DM someone
async function newdm() {
  username = document.getElementById("newdmfield").value;

  doc = await db.collection("app").doc("details").get();
  index = doc.data().usernames.indexOf(username);
  if (index == -1) {
    // Username does not exist
    Snackbar.show({
      showAction: false,
      pos: "bottom-center",
      text: "This username does not exist.",
    });
    return;
  }

  dmuid = doc.data().map[index];
  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(dmuid);

  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
  doc = await db.collection("direct").doc(string).get();

  if (doc.exists) {
    Snackbar.show({ text: "DM already exists." });
  } else {
    var now = new Date();
    db.collection("direct")
      .doc(string)
      .set({
        info: {
          start_date: firebase.firestore.FieldValue.serverTimestamp(),
          start_user: user.uid,
        },

        messages: [
          {
            sender: user.uid,
            app_preset: "echo-direct-invitation",
            content: "Invitation",
            timestamp: now,
          },
        ],
      });

    await db
      .collection("users")
      .doc(user.uid)
      .update({
        direct_active: firebase.firestore.FieldValue.arrayUnion(dmuid),
      });

    refreshactive();

    await db
      .collection("follow")
      .doc(dmuid)
      .collection("direct")
      .doc(user.uid)
      .set({
        name: cacheuser.name,
        photo_url: cacheuser.url,
        username: cacheuser.username,
        uid: user.uid,
        status: true,
      });
  }
}

async function buildDirectItem(data) {
  return new Promise(async (resolve, reject) => {
    p = document.createElement("div");
    p.classList.add("userFollowCard");
    verify = "";
    if (typeof cacheverify == "undefined") {
      verifyDoc = await db.collection("app").doc("verified").get();
      window.cacheverify = verifyDoc.data().verified;
      window.verifySnippet = verifyDoc.data().verifiedSnippet;
    }
    if (cacheverify.includes(data.uid)) {
      verify = verifySnippet;
    }
    p.id = data.uid + "dmrqitem";
    p.innerHTML = `
            <div class="relativ">
                <img class="followCardPFP" src="${data.photo_url}">
                <div class="followCardText">
                    <h4 class="bold">${efilter(data.name)}${verify}</h4>
                    <span class="chip">@${efilter(data.username)}</span>
                </div>
                <div class="followCardActions">
                    <button onclick="usermodal('${
                      data.uid
                    }')" class="eon-text waves-effect waves-button">view profile</button>
                </div>
            </div>
            <br>
            <hr>
            <center>
                <button onclick='acceptDirect(${JSON.stringify(
                  data
                )})' class="eon-text iconbtn acceptbtn">
                    <i class="material-icons">done</i>
                </button>
    
                <button onclick='rejectDirect(${JSON.stringify(
                  data
                )})' class="eon-text iconbtn rejectbtn">
                    <i class="material-icons">close</i>
                </button>
            </center>
        `;
    $("#dm_rq").get(0).appendChild(p);
    $("#dmreqstatus").html(parseInt($("#dmreqstatus").html()) + 1);
    resolve();
  });
}

// DM requests

async function acceptDirect(data) {
  // Remove requests
  await db
    .collection("follow")
    .doc(user.uid)
    .collection("direct")
    .doc(data.uid)
    .update({
      status: false,
    });

  // Add direct message
  await db
    .collection("users")
    .doc(user.uid)
    .update({
      direct_active: firebase.firestore.FieldValue.arrayUnion(data.uid),
    });

  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(data.uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
  now = new Date();

  // Send the approval message
  unreadkey = "unread_" + data.uid;

  await db
    .collection("direct")
    .doc(string)
    .update({
      [unreadkey]: true,
      messages: firebase.firestore.FieldValue.arrayUnion({
        app_preset: "echo-direct-approval",
        content: "Approved",
        sender: user.uid,
        timestamp: now,
      }),
    });

  $(`#${data.uid}dmrqitem`).addClass("animated");
  $(`#${data.uid}dmrqitem`).addClass("zoomOut");
  $(`#${data.uid}dmrqitem`).addClass("faster");

  window.setTimeout(() => {
    $(`#${data.uid}dmrqitem`).remove();
    $("#dmreqstatus").html(parseInt($("#dmreqstatus").html()) - 1);
    Snackbar.show({
      text: "Accepted message request from " + efilter(data.name),
    });
    refreshactive();
  }, 600);
}

async function rejectDirect(data) {
  x = confirm(
    "Are you sure you would like to decline " +
      efilter(data.name) +
      ". This action is permanent and cannot easily be reversed."
  );
  if (!x) {
    Snackbar.show({ text: "Cancelled; Nothing changed." });
    return;
  }

  // Remove requests
  await db
    .collection("follow")
    .doc(user.uid)
    .collection("direct")
    .doc(data.uid)
    .update({
      status: false,
    });

  // Do not add direct message and send a message saying declined.

  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(data.uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
  now = new Date();

  await db
    .collection("direct")
    .doc(string)
    .update({
      [unreadkey]: true,
      messages: firebase.firestore.FieldValue.arrayUnion({
        app_preset: "echo-direct-rejection",
        content: "Declined",
        sender: user.uid,
        timestamp: now,
      }),
    });

  $(`#${data.uid}dmrqitem`).addClass("animated");
  $(`#${data.uid}dmrqitem`).addClass("zoomOut");
  $(`#${data.uid}dmrqitem`).addClass("faster");

  window.setTimeout(() => {
    $(`#${data.uid}dmrqitem`).remove();
    $("#dmreqstatus").html(parseInt($("#dmreqstatus").html()) - 1);
    Snackbar.show({
      text: "Rejected message request from " + efilter(data.name),
    });
  }, 600);
}

async function loadpending() {
  directquery = await db
    .collection("follow")
    .doc(user.uid)
    .collection("direct")
    .where("status", "==", true)
    .limit(8)
    .get();
  for (let i = 0; i < directquery.docs.length; i++) {
    const doc = directquery.docs[i];
    await buildDirectItem(doc.data());
  }

  if (directquery.docs.length == 0) {
    $("#nodmrq").removeClass("hidden");
    return;
  }

  if (directquery.docs.length == 8) {
    n = document.createElement("div");
    n.innerHTML = `<center><button id="loadmoredrbtn" onclick="loadnextpendingdr()" class="eon-text">Load More</button></center>`;
    document.getElementById("potentailmorebtn2").appendChild(n);
  }

  window.lastVisibleDr = directquery.docs[directquery.docs.length - 1];
}

async function loadnextpendingdr() {
  directquery = await db
    .collection("follow")
    .doc(user.uid)
    .collection("direct")
    .where("status", "==", true)
    .startAfter(lastVisibleDr)
    .limit(8)
    .get();
  window.lastVisibleDr = directquery.docs[directquery.docs.length - 1];
  for (let i = 0; i < directquery.docs.length; i++) {
    const doc = directquery.docs[i];
    buildDirectItem(doc.data());
  }

  if (directquery.docs.length < 8) {
    $("#loadmoredrbtn").addClass("hidden");
    Snackbar.show({ text: "No more requests." });
  }
}

// Follow Requests
async function loadpendingfr() {
  followquery = await db
    .collection("follow")
    .doc(user.uid)
    .collection("requested")
    .where("status", "==", true)
    .limit(8)
    .get();
  for (let i = 0; i < followquery.docs.length; i++) {
    const doc = followquery.docs[i];
    await buildFollowItem(doc.data());
  }

  if (followquery.docs.length == 0) {
    $("#nofollowrq").removeClass("hidden");
    return;
  }

  if (followquery.docs.length == 8) {
    n = document.createElement("div");
    n.innerHTML = `<center><button id="loadmorefrbtn" onclick="loadnextpendingfr()" class="eon-text">Load More</button></center>`;
    document.getElementById("potentailmorebtn").appendChild(n);
  }

  window.lastVisibleFr = followquery.docs[followquery.docs.length - 1];
}

async function loadnextpendingfr() {
  followquery = await db
    .collection("follow")
    .doc(user.uid)
    .collection("requested")
    .where("status", "==", true)
    .startAfter(lastVisibleFr)
    .limit(8)
    .get();
  window.lastVisibleFr = followquery.docs[followquery.docs.length - 1];
  for (let i = 0; i < followquery.docs.length; i++) {
    const doc = followquery.docs[i];
    buildFollowItem(doc.data());
  }

  if (followquery.docs.length < 8) {
    $("#loadmorefrbtn").addClass("hidden");
    Snackbar.show({ text: "No more requests." });
  }
}

async function buildFollowItem(data) {
  return new Promise(async (resolve, reject) => {
    m = document.createElement("div");
    m.classList.add("userFollowCard");
    verify = "";
    if (typeof cacheverify == "undefined") {
      verifyDoc = await db.collection("app").doc("verified").get();
      window.cacheverify = verifyDoc.data().verified;
      window.verifySnippet = verifyDoc.data().verifiedSnippet;
    }
    if (cacheverify.includes(data.uid)) {
      verify = verifySnippet;
    }
    m.id = data.uid + "followrqitem";
    m.innerHTML = `
            <div class="relativ">
                <img class="followCardPFP" src="${data.photo_url}">
                <div class="followCardText">
                    <h4 class="bold">${efilter(data.name)}${verify}</h4>
                    <span class="chip">@${efilter(data.username)}</span>
                </div>
                <div class="followCardActions">
                    <button onclick="usermodal('${
                      data.uid
                    }')" class="eon-text waves-effect waves-button">view profile</button>
                </div>
            </div>
            <br>
            <hr>
            <center>
                <button onclick='acceptFollow(${JSON.stringify(
                  data
                )})' class="eon-text iconbtn acceptbtn">
                    <i class="material-icons">done</i>
                </button>

                <button onclick='rejectFollow(${JSON.stringify(
                  data
                )})' class="eon-text iconbtn rejectbtn">
                    <i class="material-icons">close</i>
                </button>
            </center>
        `;
    console.log(data.username);
    console.log(m);
    $("#follow_req").get(0).appendChild(m);
    $("#frreqstatus").html(parseInt($("#frreqstatus").html()) + 1);

    resolve();
  });
}

async function acceptFollow(data) {
  // Remove requests
  await db
    .collection("follow")
    .doc(user.uid)
    .collection("requested")
    .doc(data.uid)
    .update({
      status: false,
    });

  await db
    .collection("follow")
    .doc(data.uid)
    .collection("requesting")
    .doc(user.uid)
    .update({
      status: false,
    });

  // Add follow
  await db
    .collection("follow")
    .doc(user.uid)
    .collection("followers")
    .doc(data.uid)
    .set({
      name: data.name,
      uid: data.uid,
      photo_url: data.photo_url,
      status: true,
      username: data.username,
    });

  await db
    .collection("follow")
    .doc(data.uid)
    .collection("following")
    .doc(user.uid)
    .set({
      name: cacheuser.name,
      uid: user.uid,
      photo_url: cacheuser.url,
      status: true,
      username: cacheuser.username,
    });

  $(`#${data.uid}followrqitem`).addClass("animated");
  $(`#${data.uid}followrqitem`).addClass("zoomOut");
  $(`#${data.uid}followrqitem`).addClass("faster");

  window.setTimeout(() => {
    $(`#${data.uid}followrqitem`).remove();
    $("#frreqstatus").html(parseInt($("#frreqstatus").html()) - 1);
    Snackbar.show({
      text: "Approved follow request from " + efilter(data.name),
    });
  }, 600);
}

async function rejectFollow(data) {
  // Remove requests
  await db
    .collection("follow")
    .doc(user.uid)
    .collection("requested")
    .doc(data.uid)
    .update({
      status: false,
    });

  await db
    .collection("follow")
    .doc(data.uid)
    .collection("requesting")
    .doc(user.uid)
    .update({
      status: false,
    });

  $(`#${data.uid}followrqitem`).addClass("animated");
  $(`#${data.uid}followrqitem`).addClass("zoomOut");
  $(`#${data.uid}followrqitem`).addClass("faster");

  window.setTimeout(() => {
    $(`#${data.uid}followrqitem`).remove();
    $("#frreqstatus").html(parseInt($("#frreqstatus").html()) - 1);
    Snackbar.show({
      text: "Declined follow request from " + efilter(data.name),
    });
  }, 600);
}

function addpendingcardcontent(element, verification) {
  db.collection("users")
    .doc(element)
    .get()
    .then(function (doc) {
      verified = "";
      for (let i = 0; i < verification.length; i++) {
        if (verification[i] == element) {
          verified =
            '<i id="' +
            name +
            'verifiedelement" data-toggle="tooltip" data-placement="top" title="Verified" class="material-icons verified">verified_user</i><br><br>';
        }
      }

      rejectFunc = "reject('" + element + "')";
      approveFunc = "approve('" + element + "')";
      viewuserFunc = "usermodal('" + element + "')";

      document.getElementById(element + "pendingcardel").innerHTML =
        '<img class="dmreqpfp" src="' +
        doc.data().url +
        '" alt=""><h3>' +
        efilter(doc.data().name) +
        "</h3>" +
        verified +
        '<p class="nolineheight">' +
        doc.data().rep +
        ' Rep</p><br><center><button onclick="' +
        viewuserFunc +
        '" class="eon-contained">view user</button><br><br></center><button onclick="' +
        rejectFunc +
        '" class="eon-text reject refreshbtn"><i class="material-icons">close</i></button><button onclick="' +
        approveFunc +
        '" class="eon-text approve refreshbtn"><i class="material-icons">check</i></button>';
      $(".verified").tooltip();
      addWaves();
    });
}

function refreshactive() {
  $("#messagelist").empty();
  $("#messagecontent").empty();
  loadactive();
}

function loadactive() {
  if (sessionStorage.getItem("currenDM") == "echo-news") {
    showEchoNews();
    window.setTimeout(function () {
      $("#changelogbamstyle").html(
        "#messagecontent {height: calc(100%) !important;  margin-top: 0px; overflow-y: scroll; transition: all 1s;}"
      );
    }, 600);
    $("#unselectedconten").addClass("fadeOutUp");
    $("#unselectedconten").removeClass("fadeInDown");
  }

  db.collection("users")
    .doc(user.uid)
    .get()
    .then(function (doc) {
      db.collection("app")
        .doc("verified")
        .get()
        .then(function (verifieddoc) {
          arr = doc.data().direct_active;
          if (arr == undefined) {
            arr = [];
          }
          verification = verifieddoc.data().verified;

          for (let i = 0; i < arr.length; i++) {
            const element = arr[i];

            q = document.createElement("div");
            q.classList.add("messagelistbox");
            q.classList.add("animated");
            q.classList.add("shadow-sm");
            q.onclick = function () {
              BUILD_DIRECT(element, this.id);
              ScrollBottom();
              history.pushState(
                null,
                "",
                "app.html?tab=inbox&dm=" + this.id.split("chatsidebarboxel")[0]
              );
            };
            q.classList.add("fadeInUp");
            q.classList.add("hidden");
            q.id = element + "chatsidebarboxel";
            document.getElementById("messagelist").appendChild(q);
            addsidebarcardcontent(element, verification);

            if (element == sessionStorage.getItem("currenDM")) {
              window.setTimeout(function () {
                document.getElementById(element + "chatsidebarboxel").click();
              }, 1500);
            }
          }
          ;
        });
    });
}

function addsidebarcardcontent(uid, verification) {
  console.log(uid)
  db.collection("users")
    .doc(uid)
    .get()
    .then(function (doc) {
      if (!doc.exists) {
        return;
      }
      alphabeticalized = [];
      alphabeticalized.push(user.uid);
      alphabeticalized.push(uid);
      alphabeticalized.sort(function (a, b) {
        var textA = a.toUpperCase();
        var textB = b.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
      document.getElementById(uid + "chatsidebarboxel").innerHTML =
        '<img src="' +
        doc.data().url +
        '" class="msgimg centeredy" alt=""><div class="boxtext centeredy"><h4 class="heavy">' +
        doc.data().name +
        '</h4><br><p id="' +
        uid +
        'recenttextel" class="grey nolineheight"></p></div><div class="boxtext2 centeredy"><span id="' +
        string +
        'notifbadge" class="badge badge-pill notifbadge badge-secondary animated jello infinite"></span></div>';
      document
        .getElementById(uid + "chatsidebarboxel")
        .classList.remove("hidden");
      addWaves();
      BUILD_DIRECT_VARIABLES(uid);
    });
}

function BUILD_DIRECT_VARIABLES(uid) {
  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  this[string + abritaryindex] =
    alphabeticalized[0].toString() + alphabeticalized[1].toString();
  db.collection("direct")
    .doc(this[string + abritaryindex])
    .get()
    .then(function (doc) {
      this["marker" + doc.id] = doc.data().messages;

      reallength = doc.data().messages.length - 1;
      if (doc.data().messages[reallength].content.length > 12) {
        document.getElementById(uid + "recenttextel").innerHTML =
          doc.data().messages[reallength].content.substring(0, 12) + "...";
      } else {
        document.getElementById(
          uid + "recenttextel"
        ).innerHTML = doc.data().messages[reallength].content.substring(0, 12);
      }

      unreadkey = "unread_" + user.uid;

      if (doc.data()[unreadkey]) {
        document.getElementById(doc.id + "notifbadge").innerHTML = "!!";
        checkAllNotifs();
      }
    });
}

function BUILD_DIRECT(uid, btnel) {
  sessionStorage.setItem("active_dm", uid);
  infScroll_enable();
  window.setTimeout(function() {
    
  }, 800)

  $("#echoNewsContent").addClass("hidden");
  $("#changelogbamstyle").html("");
  document.getElementById("newdmmsg").click();
  document.getElementById("unselectedconten").classList.remove("fadeInDown");
  document.getElementById("unselectedconten").classList.add("fadeOutUp");

  $("#chatnav").removeClass("fadeOutUp");
  $("#chatnav").addClass("fadeIn");
  $("#divider1").removeClass("fadeOutUp");
  $("#divider1").removeClass("hidden");
  $("#divider1").addClass("zoomIn");
  $("#directfooter").addClass("fadeInUp");
  $("#directfooter").removeClass("fadeOutDown");

  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();

  if ($("#" + string + "chatcontainer").length) {
    if (!$("#" + string + "chatcontainer").hasClass("hidden")) {
      // Do nothing if chat exists and it's not hidden
      return;
    }
  }

  if (document.getElementById(string + "notifbadge").innerHTML == "!!") {
    // Clear notifications
    document.getElementById(string + "notifbadge").innerHTML = "";
    checkAllNotifs();
    notifkey = "unread_" + user.uid;
    db.collection("direct")
      .doc(string)
      .update({
        [notifkey]: false,
      });
  }

  // Element Management
  $(".messagelistboxactive").removeClass("messagelistboxactive");
  $("#" + btnel).addClass("messagelistboxactive");
  $(".chatcontainer").addClass("hidden");

  if (this["dmcache" + uid] == undefined) {
    db.collection("users")
      .doc(uid)
      .get()
      .then(function (doc) {
        this["dmcache" + uid] = doc.data();
        $(".topbarimg").attr("src", doc.data().url);
        document.getElementById("topbarimg").onclick = function () {
          usermodal(uid);
        };
        $("#navbarname").text(doc.data().name);

        document.getElementById("refreshstatusbtn").onclick = function () {
          Snackbar.show({
            showAction: false,
            pos: "bottom-center",
            text: "You are doing this too much!",
          });
        };

        window.setTimeout(function () {
          document.getElementById("refreshstatusbtn").onclick = function () {
            $("#navbarstatus").html("Loading...");
            window.setTimeout(function () {
              refreshStatus(uid);
            }, 500);
          };
        }, 3000);

        if (
          doc.data().direct_activity == undefined ||
          doc.data().direct_activity == null
        ) {
          status = "unknown status";
        } else {
          ts = doc.data().direct_activity.toDate();
          now = new Date();
          const diff = now.getTime() - ts.getTime();

          if (diff > 10 * 60 * 1000) {
            status = "Inactive";
          } else {
            status = "Online";
          }
        }
        $("#navbarstatus").html(status);

        $("#chatnav").removeClass("hidden");
        $(".divider1").removeClass("hidden");
        $(".divider2").removeClass("hidden");
        $(".directfooter").removeClass("hidden");
        document.getElementById("newdmmsgbtn").onclick = function () {
          ADD_MESSAGE(uid);
        };
        document.getElementById("addfilebtn").onclick = function () {
          direct_UploadFile(uid);
        };

        alphabeticalized = [];
        alphabeticalized.push(user.uid);
        alphabeticalized.push(uid);
        alphabeticalized.sort(function (a, b) {
          var textA = a.toUpperCase();
          var textB = b.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        string =
          alphabeticalized[0].toString() + alphabeticalized[1].toString();
        stringvar = this["marker" + string];

        this["messagesarray" + uid] = [];
        if ($("#" + string + "chatcontainer").is(":empty")) {
          // If its empty, build messages
          for (let i = 0; i < stringvar.length; i++) {
            var item = {
              name: doc.data().name,
              stringvar: stringvar[i],
              string: string,
            };
            this["messagesarray" + uid].push(item);
          }
          this["messagesarray" + uid].reverse();
          $("#info2c").html(this["messagesarray" + uid].length);
          buildInfScroll();
        }
      });
  } else {
    $(".topbarimg").attr("src", this["dmcache" + uid].url);
    document.getElementById("topbarimg").onclick = function () {
      usermodal(uid);
    };
    $("#navbarname").html(this["dmcache" + uid].name);

    document.getElementById("refreshstatusbtn").onclick = function () {
      Snackbar.show({
        showAction: false,
        pos: "bottom-center",
        text: "You are doing this too much!",
      });
    };

    window.setTimeout(function () {
      document.getElementById("refreshstatusbtn").onclick = function () {
        $("#navbarstatus").html("Loading...");
        window.setTimeout(function () {
          refreshStatus(uid);
        }, 500);
      };
    }, 3000);

    if (
      this["dmcache" + uid].direct_activity == undefined ||
      this["dmcache" + uid].direct_activity == null
    ) {
      status = "unknown status";
    } else {
      ts = this["dmcache" + uid].direct_activity.toDate();
      now = new Date();
      const diff = now.getTime() - ts.getTime();

      if (diff > 10 * 60 * 1000) {
        status = "Inactive";
      } else {
        status = "Online";
      }
    }
    $("#navbarstatus").html(status);

    $("#chatnav").removeClass("hidden");
    $(".divider1").removeClass("hidden");
    $(".divider2").removeClass("hidden");
    $(".directfooter").removeClass("hidden");
    document.getElementById("newdmmsgbtn").onclick = function () {
      ADD_MESSAGE(uid);
    };
    document.getElementById("addfilebtn").onclick = function () {
      direct_UploadFile(uid);
    };
    alphabeticalized = [];
    alphabeticalized.push(user.uid);
    alphabeticalized.push(uid);
    alphabeticalized.sort(function (a, b) {
      var textA = a.toUpperCase();
      var textB = b.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
    stringvar = this["marker" + string];
    if ($("#" + string + "chatcontainer").is(":empty")) {
      // If its empty, build messages
      for (let i = 0; i < stringvar.length; i++) {
        BUILD_MESSAGE(this["dmcache" + uid].name, stringvar[i], string);
      }
      prevuid = "na";
      ScrollBottom();
    }
  }

  // Chat Management
  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();

  if ($("#" + string + "chatcontainer").length) {
    $("#" + string + "chatcontainer").removeClass("hidden");
  } else {
    chatcontainer = document.createElement("div");
    chatcontainer.classList.add("chatcontainer");
    chatcontainer.classList.add("animated");
    chatcontainer.classList.add("fadeIn");
    chatcontainer.onscroll = function () {
      loadScrollingdirect(string);
    };
    chatcontainer.id = string + "chatcontainer";

    document.getElementById("messagecontent").appendChild(chatcontainer);
  }

  // WebRTC Management
  document.getElementById("direct-callbtn").onclick = function () {
    window.open("rtc.html?type=a&target=" + uid);
    sendCallMsg(uid);
  };

  document.getElementById("direct-videobtn").onclick = function () {
    window.open("rtc.html?type=av&target=" + uid);
    sendVideoMsg(uid);
  };

  document.getElementById("direct-flagbtn").onclick = function () {
    reportUser(uid);
  };

  document.getElementById("direct-infobtn").onclick = function () {
    userInfo(uid);
  };

  $("#info2a").html(uid);
  $("#info2b").html(string);
  document.getElementById("purgefrominfo").onclick = function () {
    purgemessages(uid);
  };
}

function ADD_MESSAGE(uid, content) {
  if (!content) {
    content = document.getElementById("newdmmsg").value;
  }

  if (
    content == "" ||
    content == " " ||
    content == "  " ||
    content == "    " ||
    content.replace(" ", "") == ""
  ) {
    return;
  }

  document.getElementById("newdmmsg").value = "";

  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
  now = new Date();

  if (content.includes("https")) {
    contentbc = content;
    var matches = contentbc.match(/\bhttps?:\/\/\S+/gi);
    for (let i = 0; i < matches.length; i++) {
      contentbc = contentbc.replace(matches[i], "");
    }
    if (contentbc == "") {
      // Only contains a link, so ommit sending message only containing link:
      checkLinks(content, uid, true);
      return;
    } else {
      // Otherwise do not return and send a subsequent message containing link preview
      checkLinks(content, uid, false);
    }
  }

  tempmsg = {
    app_preset: "none",
    content: content,
    sender: user.uid,
    timestamp: now,
  };

  el = $("#" + string + "chatcontainer").find(".clearfix:first");
  if (el.children().first().hasClass("msgcontainerother")) {
    // Avoided stupid bug trash
    prevuid = "THIS BUG WAS SO ANNYOING";
  }

  BUILD_MESSAGE(cacheuser.name, tempmsg, string, true);
  ScrollBottom();

  unreadkey = "unread_" + uid;
  db.collection("direct")
    .doc(string)
    .update({
      [unreadkey]: true,
      messages: firebase.firestore.FieldValue.arrayUnion({
        app_preset: "none",
        content: content,
        sender: user.uid,
        timestamp: now,
      }),
    })
    .then(function () {
      sessionStorage.setItem("itwasmesoskip", "true");
      ENACT_CHANGES(uid);
    });
  db.collection("directlisteners")
    .doc(uid)
    .update({
      most_recent_sender: user.uid,
    })
    .then(function () {
      db.collection("directlisteners").doc(uid).update({
        most_recent_sender: "none",
      });
    });
}

function BUILD_MESSAGE(name, msg, string, anim, reverse) {
  if (typeof prevuid == "undefined") {
    // Set it something random
    prevuid = "skiddypeepee";
  }

  p = document.createElement("div");
  p.classList.add("messagecontainer");
  p.classList.add("clearfix");

  if (msg.sender == user.uid) {
    // Client sent it
    textContainer = "msgcontainerclient shadow-sm";
  } else {
    // Not client
    textContainer = "msgcontainerother shadow-sm";
  }
  //TIMESTAMP IS msg.timestamp.toDate().toLocaleTimeString().slice(0, msg.timestamp.toDate().toLocaleTimeString().lastIndexOf(":")) + ' ' + msg.timestamp.toDate().toLocaleTimeString().slice(-2)
  msgcontent = efilter(msg.content);

  if (msg.app_preset == "echo-direct-file") {
    if (msg.sender == user.uid) {
      msgcontent = `<h3><i class="material-icons gradicon2">attach_file</i>File</h3>You sent a file: ${efilter(
        msg.content
      )}<br><br><button onclick="window.open('${
        msg.app_preset_data
      }')" class="eon-contained">view</button><br>`;
      if (
        efilter(msg.content).endsWith(".png") ||
        efilter(msg.content).endsWith(".jpg") ||
        efilter(msg.content).endsWith(".jpeg") ||
        efilter(msg.content).endsWith(".gif")
      ) {
        msgcontent =
          'You sent an image: <br><br><img src="' +
          msg.app_preset_data +
          '" class="inline-direct-img">';
      }
      if (efilter(msg.content).endsWith(".mp3")) {
        msgcontent = `You sent audio: <br><br><audio controls src="${msg.app_preset_data}"></audio>`;
      }
      if (efilter(msg.content).endsWith(".mp4")) {
        msgcontent = `You sent video: <br><br><video controls src="${msg.app_preset_data}"></video>`;
      }
    } else {
      msgcontent = `<h3><i class="material-icons gradicon2">attach_file</i>File</h3>${name} sent you a file: ${efilter(
        msg.content
      )}<br><br><button onclick="window.open('${
        msg.app_preset_data
      }')" class="eon-contained">view</button><br>`;
      if (
        efilter(msg.content).endsWith(".png") ||
        efilter(msg.content).endsWith(".jpg") ||
        efilter(msg.content).endsWith(".jpeg") ||
        efilter(msg.content).endsWith(".gif")
      ) {
        msgcontent =
          'You received an image: <br><br><img src="' +
          msg.app_preset_data +
          '" class="inline-direct-img">';
      }
      if (efilter(msg.content).endsWith(".mp4")) {
        msgcontent = `You recieved video: <br><br><video controls src="${msg.app_preset_data}"></video>`;
      }
    }
  }
  if (msg.app_preset == "echo-direct-purge_request") {
    if (msg.sender == user.uid) {
      msgcontent =
        '<h3><i class="material-icons gradicon">delete_sweep</i>Purge Request</h3>You requested to purge your chat history with ' +
        name +
        ".";
    } else {
      purgeFunc = "purge_agree('" + msg.sender + "', '" + name + "')";
      msgcontent =
        '<h3><i class="material-icons gradicon">delete_sweep</i>Purge Request</h3>' +
        name +
        ' requested to purge your chat history with them.<br><br><a onclick="' +
        purgeFunc +
        '" class="eon-contained">confirm</a>';
    }
  }
  if (msg.app_preset == "echo-direct-purge_approval") {
    msgcontent =
      '<h3><i class="material-icons gradicon">insights</i>Time to start fresh!</h3>This is the beggining of your new chat history.';
  }
  if (msg.app_preset == "echo-direct-invitation") {
    if (msg.sender == user.uid) {
      msgcontent =
        '<h3><i class="material-icons gradicon">question_answer</i>Invitation to ' +
        name +
        "</h3>You requested to message " +
        name +
        ".";
    } else {
      msgcontent =
        '<h3><i class="material-icons gradicon">question_answer</i>Invitation from ' +
        name +
        "</h3>" +
        name +
        " requested to message you.";
    }
  }
  if (msg.app_preset == "echo-direct-rejection") {
    if (msg.sender == user.uid) {
      msgcontent =
        '<h3><i class="material-icons gradicon">close</i>You declied ' +
        name +
        ".</h3>You rejected " +
        name +
        "'s request to message you.";
    } else {
      msgcontent =
        '<h3><i class="material-icons gradicon">close</i>' +
        name +
        " declied you.</h3>" +
        name +
        " rejected your request to message them.";
    }
  }
  if (msg.app_preset == "echo-direct-approval") {
    if (msg.sender == user.uid) {
      msgcontent =
        '<h3><i class="material-icons gradicon">check</i>You approved ' +
        name +
        ".</h3>You accepted " +
        name +
        "'s request to message you.";
    } else {
      msgcontent =
        '<h3><i class="material-icons gradicon">check</i>' +
        name +
        " approved you.</h3>" +
        name +
        " accepted your request to message them.";
    }
  }
  if (msg.app_preset == "echo-direct-call") {
    if (msg.sender == user.uid) {
      msgcontent =
        '<h3><i class="material-icons gradicon">phone</i>You started a call with ' +
        name +
        ".</h3>";
    } else {
      goFunc1 = "window.open('rtc.html?type=a&target=" + msg.sender + "')";
      msgcontent =
        '<h3><i class="material-icons gradicon">phone</i>' +
        name +
        ' started a call.</h3><center><button onclick="' +
        goFunc1 +
        '" class="eon-text">join</button></center>';
    }
  }
  if (msg.app_preset == "echo-direct-video") {
    if (msg.sender == user.uid) {
      msgcontent =
        '<h3><i class="material-icons gradicon">videocam</i>You started a video call with ' +
        name +
        ".</h3>";
    } else {
      goFunc1 = "window.open('rtc.html?type=av&target=" + msg.sender + "')";
      msgcontent =
        '<h3><i class="material-icons gradicon">phone</i>' +
        name +
        ' started a video call.</h3><center><button onclick="' +
        goFunc1 +
        '" class="eon-text">join</button></center>';
    }
  }

  if (msg.app_preset == "echo-direct-link") {
    p.classList.add("systemmessagecontainerlink");
    msgcontent = `
            <img src="${msg.app_preset_data.image}" onerror="this.style.display='none'" class="dm_link_img"></img>
            <p class="bold">${msg.app_preset_data.title}</p>
            <span><p class="light">${msg.app_preset_data.description}</p></span>
            <button onclick="youareleaving('${msg.app_preset_data.link}')" class="eon-text dm_link_btn">visit</button>
            <div><small>${msg.app_preset_data.link}</small></div>
        `;
    if (msg.sender == user.uid) {
      p.classList.add("systemmessagecontainerlinkright");
    } else {
      p.classList.add("systemmessagecontainerlinkleft");
    }

    // Check if YouTube
    if (msg.app_preset_data.link.includes("youtu.be")) {
      videoID = msg.app_preset_data.link.split("youtu.be/").pop();
      p.classList.add("ytembed");
      msgcontent = `
            <iframe src="www.youtube.com/embed/${videoID}" frameborder="0" allowfullscreen></iframe>
            `;
    } else if (msg.app_preset_data.link.includes("youtube.com/watch?v=")) {
      videoID = msg.app_preset_data.link
        .split("youtube.com/watch?v=")
        .pop()
        .split("&")
        .shift();
      p.classList.add("ytembed");
      msgcontent = `
            <iframe src="//www.youtube.com/embed/${videoID}" frameborder="0" allowfullscreen></iframe>
            `;
    }
  }

  if (msg.app_preset.startsWith("echo-direct")) {
    p.classList.remove("messagecontainer");
    p.classList.add("systemmessagecontainer");
    textContainer = "msgcontainerapp shadow-lg";
    prevuid = "disabled";
  }

  p.innerHTML = '<div class="' + textContainer + '">' + msgcontent + "</div>";
  if (prevuid === msg.sender && anim) {
    // Check if bottommost msg is a system msg
    el = $("#" + string + "chatcontainer").find(".clearfix:first");
    if (el.hasClass("systemmessagecontainer")) {
      // Make sure dont add msg to previous sent msg
      prevuid = "NANNANANANOOOOPE TRASH LOSER L";
    }
  }
  if (prevuid === msg.sender) {
    if (msg.sender == user.uid) {
      clientorme = "client";
    } else {
      clientorme = "other";
    }
    if (reverse) {
      if (
        $("#" + string + "chatcontainer").children(".messagecontainer")
          .length == 0
      ) {
        // error, element doesnt exist so create a container for this at the bottom (prepend cause reversed), then  continue with tryna find messagecontainers and add it to the bottom. or top.
        $("#" + string + "chatcontainer").prepend(p);
      }
      $("#" + string + "chatcontainer")
        .children(".messagecontainer")
        .last()
        .children(".msgcontainer" + clientorme)
        .first()
        .get(0).innerHTML =
        msgcontent +
        "<br>" +
        $("#" + string + "chatcontainer")
          .children(".messagecontainer")
          .last()
          .children(".msgcontainer" + clientorme)
          .first()
          .get(0).innerHTML;
    } else {
      if (
        $("#" + string + "chatcontainer").children(".messagecontainer")
          .length == 0
      ) {
        // error, element doesnt exist so create a container for this at the bottom (prepend cause reversed), then  continue with tryna find messagecontainers and add it to the bottom. or top.
        $("#" + string + "chatcontainer").prepend(p);
      }
      $("#" + string + "chatcontainer")
        .children(".messagecontainer")
        .first()
        .children(".msgcontainer" + clientorme)
        .last()
        .get(0).innerHTML += "<br>" + msgcontent;
    }
  } else {
    if (reverse == undefined) {
      reverse = false;
    }
    if (reverse) {
      $("#" + string + "chatcontainer").append(p);
    } else {
      $("#" + string + "chatcontainer").prepend(p);
    }
    addWaves();
  }

  // Something definitely appended, so invoke the animations now:
  // Latest Message: $('#' + string + 'chatcontainer').children()[1]
  // Only run if you're explicitly sending the message in this session
  if (anim && prevuid !== msg.sender) {
    // Display message rise animation:

    // Clone element and copy text from there.
    $($("#" + string + "chatcontainer").children()[0]).appendTo(
      "#dimensions_calculations_box"
    );
    $("#dimensions_calculations_box").imagesLoaded(() => {
      default_height = $(
        $("#dimensions_calculations_box").children()[0]
      ).height();
      $($("#dimensions_calculations_box").children()[0]).prependTo(
        "#" + string + "chatcontainer"
      );
      $($("#" + string + "chatcontainer").children()[0]).addClass(
        "unanimated_msg"
      );

      console.log("Message preview is loaded. Display animation");

      window.setTimeout(() => {
        $("#" + string + "chatcontainer").children()[0].style.height =
          default_height + "px";
        $("#" + string + "chatcontainer").children()[0].style.marginTop =
          "16px";
        window.setTimeout(() => {
          $("#" + string + "chatcontainer")
            .children()[0]
            .removeAttribute("style");
          $("#" + string + "chatcontainer")
            .children()[0]
            .classList.remove("unanimated_msg");
        }, 1200);
      }, 50);
    });
  }

  if (prevuid == msg.sender) {
    $("#" + string + "chatcontainer")
      .children()[0]
      .removeAttribute("style");
    $($("#" + string + "chatcontainer").children()[0]).removeClass(
      "unanimated_msg"
    );
  }

  prevuid = msg.sender;
  if (msg.app_preset.startsWith("echo-")) {
    prevuid = "disabled";
  }
}

function PREPARE_LISTEN_MESSAGES() {
  db.collection("directlisteners")
    .doc(user.uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        LISTEN_MESSAGES();
      } else {
        db.collection("directlisteners")
          .doc(user.uid)
          .set({
            most_recent_sender: "none",
          })
          .then(() => {
            LISTEN_MESSAGES();
          });
      }
    });
}

function LISTEN_MESSAGES() {
  db.collection("directlisteners")
    .doc(user.uid)
    .onSnapshot(function (doc) {
      changed_dm = doc.data().most_recent_sender;
      if (changed_dm.startsWith("echo_direct_purge_approval_")) {
        db.collection("directlisteners")
          .doc(user.uid)
          .update({
            most_recent_sender: "none",
          })
          .then(function () {
            userid = changed_dm.split("al_")[1];
            db.collection("users")
              .doc(userid)
              .get()
              .then(function (doc) {
                Snackbar.show({
                  showAction: false,
                  pos: "bottom-center",
                  text:
                    doc.data().name + " purged your chat history. Reloading...",
                });
                window.setTimeout(function () {
                  window.location.reload();
                }, 1200);
              });
          });
      }
      if (changed_dm.startsWith("echo_direct_approverq_")) {
        userid = changed_dm.split("rq_")[1];
        db.collection("users")
          .doc(userid)
          .get()
          .then(function (doc) {
            Snackbar.show({
              showAction: false,
              pos: "bottom-center",
              text: doc.data().name + " approved your request!",
            });
          });
        return true;
      }
      if (changed_dm == "none") {
      } else {
        ENACT_CHANGES(changed_dm);
      }
    });
}

async function ENACT_CHANGES(uid) {
  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
  db.collection("direct")
    .doc(string)
    .get()
    .then(async (doc) => {
      if (doc.data() == undefined || doc.data().messages == undefined) {
        return;
      }
      length = doc.data().messages.length - 1;
      msg = doc.data().messages[length];
      document.getElementById(uid + "recenttextel").innerHTML = efilter(
        msg.content
      ).substring(0, 12);
      if (efilter(msg.content).length > 12) {
        document.getElementById(uid + "recenttextel").innerHTML =
          efilter(msg.content).substring(0, 12) + "...";
      } else {
        document.getElementById(uid + "recenttextel").innerHTML = efilter(
          msg.content
        ).substring(0, 12);
      }

      if ($("#" + string + "chatcontainer").length) {
        db.collection("users")
          .doc(uid)
          .get()
          .then(async function (doc) {
            if (sessionStorage.getItem("itwasmesoskip") !== "true") {
              BUILD_MESSAGE(doc.data().name, msg, string, true);
            } else {
              sessionStorage.setItem("itwasmesoskip", "false");
            }

            ScrollBottom();
            if (
              $("#" + string + "chatcontainer").hasClass("hidden") ||
              sessionStorage.getItem("currentab") !== "inbox"
            ) {
              document.getElementById(string + "notifbadge").innerHTML = "!!";
              checkAllNotifs();
              if (sessionStorage.getItem("currentab") !== "inbox") {
                
                // Okay for now, it's worth it to quickly grab their profile picture although it is an extra read every in-app notifcation
                userDataDDoc = await db.collection("users").doc(uid).get();

                Snackbar.show({
                  pos: "bottom-center",
                  text: "<img class='inappnotifpfp' src='" + userDataDDoc.data().url + "'></img><span class='iniappnotifthing'>" + efilter(msg.content).substring(0, 24) + "..." + "</span>",
                  pos: "bottom-right",
                  actionText: 'View',
                  onActionClick: (element) => {
                    //Set opacity of element to 0 to close Snackbar
                    $(element).css("opacity", 0);
                    // Head to DM
                    tabe('inbox');
                    sessionStorage.setItem('currenDM', uid)
                    try {
                      document.getElementById(uid + "chatsidebarboxel").click();
                    } catch (error) {}
                    window.setTimeout(function () {
                      document.getElementById(uid + "chatsidebarboxel").click();
                    }, 1500);
                  },
                });
                addWaves()
              }
            } else {
              notifkey = "unread_" + user.uid;
              db.collection("direct")
                .doc(string)
                .update({
                  [notifkey]: false,
                });
            }
          });
      } else {
        // Add a ping because it means you reciveved a message but it is not built
        document.getElementById(string + "notifbadge").innerHTML = "!!";
        checkAllNotifs();

        // Okay for now, it's worth it to quickly grab their profile picture although it is an extra read every in-app notifcation
        userDataDDoc = await db.collection("users").doc(uid).get();

        if (sessionStorage.getItem("currentab") !== "inbox") {
          Snackbar.show({
            pos: "bottom-center",
            text: "<img class='inappnotifpfp' src='" + userDataDDoc.data().url + "'></img><span class='iniappnotifthing'>" + efilter(msg.content).substring(0, 24) + "..." + "</span>",
            pos: "bottom-right",
            actionText: 'View',
            onActionClick: (element) => {
              //Set opacity of element to 0 to close Snackbar
              $(element).css("opacity", 0);
              // Head to DM
              tabe('inbox');
              sessionStorage.setItem('currenDM', uid)
              try {
                document.getElementById(uid + "chatsidebarboxel").click();
              } catch (error) {}
              window.setTimeout(function () {
                document.getElementById(uid + "chatsidebarboxel").click();
              }, 1500);
            },
          });
          addWaves()
        }

        this["marker" + string] = doc.data().messages;
      }
    });
}

function ScrollBottom() {
  var objDiv = document.getElementById("messagecontent");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function ScrollTop() {
  var objDiv = document.getElementById("messagecontent");
  objDiv.scrollTop = 0;
}

function updateStatus() {
  db.collection("users").doc(user.uid).update({
    direct_activity: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

setInterval(function () {
  updateStatus;
}, 720000);

function refreshStatus(uid) {
  db.collection("users")
    .doc(uid)
    .get()
    .then(function (doc) {
      if (
        doc.data().direct_activity == undefined ||
        doc.data().direct_activity == null
      ) {
        status = "unknown status";
      } else {
        ts = doc.data().direct_activity.toDate();
        now = new Date();
        const diff = now.getTime() - ts.getTime();

        if (diff > 10 * 60 * 1000) {
          status = "Inactive";
        } else {
          status = "Online";
        }
      }
      $("#navbarstatus").html(status);
    });
}

function sendCallMsg(uid) {
  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
  now = new Date();

  unreadkey = "unread_" + uid;
  db.collection("direct")
    .doc(string)
    .update({
      [unreadkey]: true,
      messages: firebase.firestore.FieldValue.arrayUnion({
        app_preset: "echo-direct-call",
        content: "Call",
        sender: user.uid,
        timestamp: now,
      }),
    })
    .then(function () {
      ENACT_CHANGES(uid);
    });
  db.collection("directlisteners")
    .doc(uid)
    .update({
      most_recent_sender: user.uid,
    })
    .then(function () {
      db.collection("directlisteners").doc(uid).update({
        most_recent_sender: "none",
      });
    });
}

function sendVideoMsg(uid) {
  alphabeticalized = [];
  alphabeticalized.push(user.uid);
  alphabeticalized.push(uid);
  alphabeticalized.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
  now = new Date();

  unreadkey = "unread_" + uid;
  db.collection("direct")
    .doc(string)
    .update({
      [unreadkey]: true,
      messages: firebase.firestore.FieldValue.arrayUnion({
        app_preset: "echo-direct-video",
        content: "Video Call",
        sender: user.uid,
        timestamp: now,
      }),
    })
    .then(function () {
      ENACT_CHANGES(uid);
    });
  db.collection("directlisteners")
    .doc(uid)
    .update({
      most_recent_sender: user.uid,
    })
    .then(function () {
      db.collection("directlisteners").doc(uid).update({
        most_recent_sender: "none",
      });
    });
}

function checkAllNotifs() {
  notifexists = false;
  $(".notifbadge").each(function (i) {
    if ($(this).html().includes("!!")) {
      notifexists = true;
    }
  });
  if (notifexists) {
    $("#ultimatenotifbadge").html("!!");
  } else {
    $("#ultimatenotifbadge").html("");
  }
}

function addpendingcardcontentfr(element, verification) {
  db.collection("users")
    .doc(element)
    .get()
    .then(function (doc) {
      verified = "";
      for (let i = 0; i < verification.length; i++) {
        if (verification[i] == element) {
          verified =
            '<i id="' +
            name +
            'verifiedelement" data-toggle="tooltip" data-placement="top" title="Verified" class="material-icons verified">verified_user</i><br><br>';
        }
      }

      rejectFunc = "rejectfollow('" + element + "')";
      approveFunc = "approvefollow('" + element + "')";
      viewuserFunc = "usermodal('" + element + "')";

      document.getElementById(element + "pendingcardelfr").innerHTML =
        '<img class="dmreqpfp" src="' +
        doc.data().url +
        '" alt=""><h3>' +
        doc.data().name +
        "</h3>" +
        verified +
        '<p class="nolineheight">' +
        doc.data().rep +
        ' Rep</p><br><center><button onclick="' +
        viewuserFunc +
        '" class="eon-contained">view user</button><br><br></center><button onclick="' +
        rejectFunc +
        '" class="eon-text reject refreshbtn"><i class="material-icons">close</i></button><button onclick="' +
        approveFunc +
        '" class="eon-text approve refreshbtn"><i class="material-icons">check</i></button>';
      $(".verified").tooltip();
      addWaves();
    });
}

function rejectfollow(id) {
  db.collection("users")
    .doc(user.uid)
    .update({
      requested: firebase.firestore.FieldValue.arrayRemove(id),
    })
    .then(function () {
      Snackbar.show({
        showAction: false,
        pos: "bottom-center",
        text: "Declined follow request.",
      });
      document
        .getElementById(uid + "pendingcardelfr")
        .classList.add("animated");
      document
        .getElementById(uid + "pendingcardelfr")
        .classList.add("zoomOutUp");
      window.setTimeout(function () {
        $("#" + id + "pendingcardelfr").remove();
        newnum = parseInt(document.getElementById("frreqstatus").innerHTML) - 1;
        document.getElementById("frreqstatus").innerHTML = newnum;
        if (newnum == 0) {
          document.getElementById("frreqstatus").innerHTML = "";
          document.getElementById("skiddpypofr").classList.remove("hidden");
        }
      }, 1000);
    });
}

function approvefollow(id) {
  db.collection("users")
    .doc(user.uid)
    .update({
      requested: firebase.firestore.FieldValue.arrayRemove(id),
    });
  db.collection("users")
    .doc(user.uid)
    .update({
      followers: firebase.firestore.FieldValue.arrayUnion(id),
    });
  db.collection("users")
    .doc(id)
    .update({
      following: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
  Snackbar.show({
    showAction: false,
    pos: "bottom-center",
    text: "Approved follow request.",
  });
  document.getElementById(id + "pendingcardelfr").classList.add("animated");
  document.getElementById(id + "pendingcardelfr").classList.add("fadeOutUp");
  window.setTimeout(function () {
    $("#" + id + "pendingcardelfr").remove();
    newnum = parseInt(document.getElementById("frreqstatus").innerHTML) - 1;
    document.getElementById("frreqstatus").innerHTML = newnum;
    if (newnum == 0) {
      document.getElementById("frreqstatus").innerHTML = "";
      document.getElementById("skiddpypofr").classList.remove("hidden");
    }
  }, 1000);
}

function infScroll_enable() {
  if (infScrollEnabled == true) {
    return;
  }

  window.infiniteScrollCount = 24;
  infScrollEnabled = true;
  activedm = sessionStorage.getItem("active_dm");
  this["currentScrollCount" + activedm] = 0;
}

function buildInfScroll() {
  activedm = sessionStorage.getItem("active_dm");

  // If currentcount is NaN, disable scroll bug happened
  if (isNaN(this["currentScrollCount" + activedm])) {
    this["currentScrollCount" + activedm] = 0;
  }

  // array is copy of array
  // this['currentScrollCount' + activedm] is number of postsalready printed
  array = this["messagesarray" + activedm];

  // delete first posts from temporary array that already printed
  for (let i = 0; i < this["currentScrollCount" + activedm]; i++) {
    array.shift();
  }

  // remove all posts except for next "infintie scroll count" amount
  array = array.slice(0, infiniteScrollCount);

  // build whats left and add it to active dm
  for (let i = 0; i < array.length; i++) {
    BUILD_MESSAGE(
      array[i].name,
      array[i].stringvar,
      array[i].string,
      false,
      true
    );
  }

  prevuid = "na";

  // update current scroll count
  this["currentScrollCount" + activedm] =
    this["currentScrollCount" + activedm] + infiniteScrollCount;
}

//BUILD_MESSAGE(doc.data().name, stringvar[i], string)
//ScrollBottom()

function loadScrollingdirect(id) {
  if (document.getElementById(id + "chatcontainer").scrollTop < 12) {
    buildInfScroll();
  }
}

function userInfo(uid) {
  $("#conversationInfo").modal("toggle");
}

function showdmrq() {
  // Show DM requests
  sessionStorage.removeItem("active_dm");
  history.pushState(null, "", "app.html?tab=inbox");
  leavedm();

  $(".messagelistboxactive").removeClass("messagelistboxactive");
  $(".chatcontainer").addClass("hidden");
  $("#chatnav").removeClass("hidden");

  $("#unselectedconten").removeClass("fadeInDown");
  $("#unselectedconten").addClass("fadeOutUp");

  $("#echoDMRequests").removeClass("hidden");
  $("#echoFollowRequests").addClass("hidden");
  $("#echoNewsContent").addClass("hidden");

  window.setTimeout(function () {
    $("#chatnav").removeClass("fadeIn");
    window.setTimeout(function () {
      $("#changelogbamstyle").html(
        "#messagecontent {height: calc(100%) !important;  margin-top: -107px; overflow-y: scroll; transition: all 1s;}"
      );
    }, 500);
  }, 250);

  $("#chatnav").removeClass("fadeIn");
  $("#chatnav").addClass("fadeOutUp");
  $("#divider1").removeClass("zoomIn");
  $("#divider1").addClass("fadeOutUp");
  $("#directfooter").removeClass("fadeInUp");
  $("#directfooter").addClass("fadeOutDown");

  ScrollTop();
}

function showfrq() {
  // Show follow requests
  sessionStorage.removeItem("active_dm");
  history.pushState(null, "", "app.html?tab=inbox");
  leavedm();

  $(".messagelistboxactive").removeClass("messagelistboxactive");
  $(".chatcontainer").addClass("hidden");
  $("#chatnav").removeClass("hidden");

  $("#unselectedconten").removeClass("fadeInDown");
  $("#unselectedconten").addClass("fadeOutUp");

  $("#echoDMRequests").addClass("hidden");
  $("#echoNewsContent").addClass("hidden");
  $("#echoFollowRequests").removeClass("hidden");

  window.setTimeout(function () {
    $("#chatnav").removeClass("fadeIn");
    window.setTimeout(function () {
      $("#changelogbamstyle").html(
        "#messagecontent {height: calc(100%) !important;  margin-top: -107px; overflow-y: scroll; transition: all 1s;}"
      );
    }, 500);
  }, 250);

  $("#chatnav").removeClass("fadeIn");
  $("#chatnav").addClass("fadeOutUp");
  $("#divider1").removeClass("zoomIn");
  $("#divider1").addClass("fadeOutUp");
  $("#directfooter").removeClass("fadeInUp");
  $("#directfooter").addClass("fadeOutDown");

  ScrollTop();
}

function showEchoNews() {
  sessionStorage.setItem("active_dm", "echonews");

  $(".messagelistboxactive").removeClass("messagelistboxactive");
  $("#echoNewschatsidebarboxel").addClass("messagelistboxactive");
  $(".chatcontainer").addClass("hidden");
  $("#chatnav").removeClass("hidden");
  $("#unselectedconten").removeClass("fadeInDown");
  $("#unselectedconten").addClass("fadeOutUp");

  $("#echoDMRequests").addClass("hidden");
  $("#echoFollowRequests").addClass("hidden");
  $("#echoNewsContent").removeClass("hidden");

  window.setTimeout(function () {
    $("#chatnav").removeClass("fadeIn");
    window.setTimeout(function () {
      $("#changelogbamstyle").html(
        "#messagecontent {height: calc(100%) !important;  margin-top: -107px; overflow-y: scroll; transition: all 1s;}"
      );
    }, 500);
  }, 250);
  $("#chatnav").removeClass("fadeIn");
  $("#chatnav").addClass("fadeOutUp");
  $("#divider1").removeClass("zoomIn");
  $("#divider1").addClass("fadeOutUp");
  $("#directfooter").removeClass("fadeInUp");
  $("#directfooter").addClass("fadeOutDown");
  history.pushState(null, "", "app.html?tab=inbox&dm=echo-news");

  if ($("#echo-dm-version").html() !== "loading") {
    ScrollTop();
    return false;
  }
  // Have to build
  $.getJSON("https://api.github.com/repos/r0hin12/echo/commits", function (
    data
  ) {
    $("#echo-dm-version").html(data[0].commit.message.split("\n\n")[0]);
    for (let i = 0; i < data.length; i++) {
      newupdatehtml =
        '<div class="card updatecard"><div class="card-body"><p><b>' +
        data[i].commit.message.split("\n\n")[0] +
        "</b> commited by " +
        data[i].commit.committer.name +
        '</p><div class="commentmsg">' +
        data[i].commit.message
          .replace(data[i].commit.message.split("\n\n")[0], "")
          .replace("\n\n", "")
          .replace(/\n/gi, "<br>");
      +"</div><br><p>" +
        data[i].commit.committer.date +
        ' | <a href="' +
        data[i].commit.url +
        '" target="_blank">view commit</a></p></div></div>';
      document.getElementById("echo-dm-latest").innerHTML =
        document.getElementById("echo-dm-latest").innerHTML + newupdatehtml;
    }
  });
  ScrollTop();
}

$(window).on("resize", );

function purgemessages(uid) {
  user_confirmed = confirm(
    "Are you sure you would like to purge every message? \nThe other user must also confirm to purge each message.\n\nThis action is irreversible."
  );
  if (user_confirmed) {
    alphabeticalized = [];
    alphabeticalized.push(user.uid);
    alphabeticalized.push(uid);
    alphabeticalized.sort(function (a, b) {
      var textA = a.toUpperCase();
      var textB = b.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
    var now = new Date();

    db.collection("direct")
      .doc(string)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          app_preset: "echo-direct-purge_request",
          content: "Purge Request",
          sender: user.uid,
          timestamp: now,
        }),
      })
      .then(function () {
        ENACT_CHANGES(uid);
        db.collection("directlisteners")
          .doc(uid)
          .update({
            most_recent_sender: user.uid,
          })
          .then(function () {
            Snackbar.show({
              text: "Purge request sent.",
              showAction: false,
              pos: "bottom-center",
            });
          });
      });
  } else {
    Snackbar.show({
      text: "Confirmation cancelled; Nothing changed.",
      showAction: false,
      pos: "bottom-center",
    });
  }
}

function purge_agree(uid, name) {
  user_confirmed = confirm(
    "Are you sure you would like to purge every message with " +
      name +
      "? \n\nThis action is irreversible."
  );
  if (user_confirmed) {
    alphabeticalized = [];
    alphabeticalized.push(user.uid);
    alphabeticalized.push(uid);
    alphabeticalized.sort(function (a, b) {
      var textA = a.toUpperCase();
      var textB = b.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    string = alphabeticalized[0].toString() + alphabeticalized[1].toString();
    var now = new Date();

    db.collection("direct")
      .doc(string)
      .get()
      .then(function (doc) {
        messages = doc.data().messages;
        db.collection("app")
          .doc("archive")
          .collection("pending_deletion_transcripts")
          .doc(string)
          .get()
          .then(function (doc) {
            db.collection("app")
              .doc("archive")
              .collection("pending_deletion_transcripts")
              .doc(string)
              .set({
                [new Date().toString()]: messages,
              })
              .then(function () {
                purge_agree_complete(uid, name, string, messages, now);
              });
          });
      });
  } else {
    Snackbar.show({
      text: "Confirmation cancelled; Nothing changed.",
      showAction: false,
      pos: "bottom-center",
    });
  }
}

function purge_agree_complete(uid, name, string, messages, now) {
  db.collection("app")
    .doc("archive")
    .collection("pending_deletion_transcripts")
    .doc(string)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({ messages }),
    })
    .then(function () {
      db.collection("direct")
        .doc(string)
        .update({
          messages: [],
        })
        .then(function () {
          db.collection("direct")
            .doc(string)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion({
                app_preset: "echo-direct-purge_approval",
                content: "Purge Approved",
                sender: user.uid,
                timestamp: now,
              }),
            })
            .then(function () {
              Snackbar.show({ text: "Chat history cleared. Reloading..." });
              db.collection("directlisteners")
                .doc(uid)
                .update({
                  most_recent_sender: "echo_direct_purge_approval_" + user.uid,
                })
                .then(function () {
                  db.collection("directlisteners").doc(uid).update({
                    most_recent_sender: "none",
                  });

                  window.setTimeout(function () {
                    window.location.reload();
                  }, 1200);
                });
            });
        });
    });
}

function leavedm() {
  $(".messagelistboxactive").removeClass("messagelistboxactive");
  $(".chatcontainer").addClass("hidden");
  $("#chatnav").addClass("hidden");
  $("#divider1").addClass("hidden");
  $("#directfooter").addClass("hidden");
  $("#unselectedconten").removeClass("fadeOutUp");
  $("#unselectedconten").addClass("fadeInDown");
  $("#echoNewsContent").addClass("hidden");
  history.pushState(null, "", "app.html?tab=inbox");
}

function direct_UploadFile(uid) {
  document.getElementById("skiddyfileupload").value = "";
  sessionStorage.setItem("targetuid", uid);
  $("#skiddyfileupload").click();
}

function direct_confirmUpload() {
  uid = sessionStorage.getItem("targetuid");
  file = document.getElementById("skiddyfileupload").files[0];
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef
    .child("conversations/" + string + "/" + file.name)
    .put(file);
  $("#uploadprogress").removeClass("hidden");
  $("#uploadprogress").removeClass("fadeOut");
  $("#uploadprogress").addClass("fadeIn");
  $("#divider2").removeClass("zoomIn");
  $("#divider2").addClass("fadeOut");
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      $("#uploadprogressbar").css("width", progress + "%");
    },
    function (error) {
      alert(error);
      $("#divider2").removeClass("fadeOut");
      $("#divider2").addClass("zoomIn");
      $("#uploadprogress").removeClass("fadeIn");
      $("#uploadprogress").addClass("fadeOut");
      window.setTimeout(function () {
        $("#uploadprogress").addClass("hidden");
      }, 1200);
    },
    function () {
      $("#divider2").removeClass("fadeOut");
      $("#divider2").addClass("zoomIn");
      $("#uploadprogress").removeClass("fadeIn");
      $("#uploadprogress").addClass("fadeOut");
      window.setTimeout(function () {
        $("#uploadprogress").addClass("hidden");
      }, 1200);
      uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
        now = new Date();
        unreadkey = "unread_" + uid;

        db.collection("direct")
          .doc(string)
          .update({
            [unreadkey]: true,
            messages: firebase.firestore.FieldValue.arrayUnion({
              app_preset: "echo-direct-file",
              app_preset_data: url,
              content: file.name,
              sender: user.uid,
              timestamp: now,
            }),
          })
          .then(function () {
            ENACT_CHANGES(uid);
          });
        db.collection("directlisteners")
          .doc(uid)
          .update({
            most_recent_sender: user.uid,
          })
          .then(function () {
            db.collection("directlisteners").doc(uid).update({
              most_recent_sender: "none",
            });
          });
      });
    }
  );
}

function showquickreply() {
  $("#quickreply").removeClass("hidden");

  $("#quickreply").removeClass("fadeOutDown");
  $("#quickreply").addClass("fadeInUp");
}

function hidequickreply() {
  $("#quickreply").addClass("fadeOutDown");
  $("#quickreply").removeClass("fadeInUp");

  $("#quickreply").css("width", $("#directfooter").width);
}

function quickreply(msg) {
  hidequickreply();
  ADD_MESSAGE(sessionStorage.getItem("active_dm"), msg);
}

function checkLinks(content, uid, onlyLink) {
  var matches = content.match(/\bhttps?:\/\/\S+/gi);
  var previewLink = firebase.functions().httpsCallable("previewLink");

  if (matches.length > 0) {
    Snackbar.show({ text: "Generating link preview..." });
  }

  for (let i = 0; i < matches.length; i++) {
    // Add message with content from URL: matches[i]
    previewLink({ url: matches[i] })
      .then((result) => {
        now = new Date();
        unreadkey = "unread_" + uid;

        db.collection("direct")
          .doc(string)
          .update({
            [unreadkey]: true,
            messages: firebase.firestore.FieldValue.arrayUnion({
              app_preset: "echo-direct-link",
              app_preset_data: result.data.data,
              content: result.data.data.title,
              sender: user.uid,
              timestamp: now,
            }),
          })
          .then(function () {
            ENACT_CHANGES(uid);
          });
        db.collection("directlisteners")
          .doc(uid)
          .update({
            most_recent_sender: user.uid,
          })
          .then(function () {
            db.collection("directlisteners").doc(uid).update({
              most_recent_sender: "none",
            });
          });
      })
      .catch((err) => {
        // 'err' happened
        if (onlyLink) {
          ADD_MESSAGE(
            sessionStorage.getItem("active_dm"),
            `<a onclick="youareleaving('${content}')" style="color: white !important;" href="#">${content}</a>`
          );
        }
      });
  }
}
