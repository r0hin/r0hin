// Choose your own adventure game.
let scoreTotal = 0; // Number of failed questions

const scenarios = {
  "start": {
    "text": "You are on an expedition in the Arctic Circle looking for polar bears. After many hours of searching, you finally see a polar bear in the distance! What do you do?",
    "image": "",
    "question": "This question is about structures and properties. Speaking of polar bears, which one of the following VESPR shapes are typically polar?",
    "answers": [
      {
        "text": "Linear",
        "correct": false
      },
      {
        "text": "T-shaped",
        "correct": true
      },
      {
        "text": "Trigonal Planar",
        "correct": false
      }
    ],
    "options": [
      { "text": "You can try to scare the polar bear away by making loud noises.", "to": "scare" },
      { "text": "You can try to sneak away and hope the polar bear does not see you.", "to": "sneak" }
    ]
  },
  "scare": {
    "text": "You decide to try to scare the polar bear away by making loud noises. You start banging on your pots and pans and shouting. Unfortunately, your pots and pans still had some water on it thus dampening your sound. The polar bear starts to approach you. What do you do?",
    "question": "This question is about structures and properties. You left some water on the pans. Which of the following is not true (INCORRECT) about H2O?",
    "answers": [
      {
        "text": "H2O is a non-polar molecule",
        "correct": true
      },
      {
        "text": "H2O experiences hydrogen bonding",
        "correct": false
      },
      {
        "text": "H2O is covalently bonded",
        "correct": false
      }
    ],
    "options": [
      {
        "text": "You can keep making noise and hope the polar bear gets scared and goes away.",
        "to": "scare2"
      },
      {
        "text": "You can try to climb a nearby tree.",
        "to": "climb"
      }
    ]
  },
  "scare2": {
    "text": "You keep making noise to try and scare the polar bear away but it just comes closer and closer. You are about to be attacked now. What do you do?",
    "question": "This question is about structures and properties. As the polar bear approaches you, you notice that it is actually coloured white. Speaking of colors, how might colors be produced when photons interact with molecules?",
    "answers": [
      {
        "text": "Energy is released as electrons jump down to their ground state after being hit with a photon.",
        "correct": true
      },
      {
        "text": "Energy is released as light hits electrons and it gets reflected in a certain manner",
        "correct": false
      },
      {
        "text": "Energy is released as light hits the molecule because the molecule was feeling a little special that day.",
        "correct": false
      }
    ],
    "options": [
      {
        "text": "You can try to climb a nearby tree.",
        "to": "climb"
      },
      {
        "text": "You can try to fight back.",
        "to": "fight"
      }
    ]
  },
  "fight": {
    "text": "You try to fight the polar bear. However, since polar bears weigh up to 1600 pounds and are significantly stronger than humans, it knocks you out in a single hit. Also, you are garbage at fighting, so you die.",
    "question": "This question is about organic chemistry. Speaking of death... NOT, humans are carbon based life forms with a lot of organic chemistry! Which of the following images is a line drawing of: 2,3-Dimethylpentane?",
    "answers": [
      {
        "text": "<img src='https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=5459908&t=l' /> <br>(It's probably not this one)",
        "correct": false
      },
      {
        "text": "<img src='https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=5365848&t=l' />",
        "correct": false
      },
      {
        "text": "<img src='https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=26375&t=l' />",
        "correct": false
      },
      {
        "text": "<img src='https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=11260&t=l' />",
        "correct": true
      }
    ],
    "options": [
      {
        "text": "Die",
        "to": "death"
      }
    ]
  },
  "sneak": {
    "text": "You decide to try to sneak away and hope the polar bear doesn’t see you. Unfortunately, while you’re sneaking away you trip and make a loud sound which causes the polar bear to look directly at you. What do you do?",
    "question": "This question is about organic chemistry. What is an alkyne?",
    "answers": [
      {
        "text": "Hydrocarbon with one or more double bonds.",
        "correct": false
      },
      {
        "text": "Hydrocarbon with one or more triple bonds.",
        "correct": true
      },
      {
        "text": "Hydrocarbon with one or more single bonds.",
        "correct": false
      }
    ],
    "options": [
      {
        "text": "You can start making noise and hope the polar bear gets scared and goes away.",
        "to": "scare"
      },
      {
        "text": "You can try to climb a nearby tree.",
        "to": "climb"
      }
    ]
  },
  "climb": {
    "question": "This question is about organic chemistry. What carboxylic acid and what alcohol produce pentyl hexanoate?",
    "answers": [
      {
        "text": "Pentanoic acid and hexanol",
        "correct": false
      },
      {
        "text": "Not possible",
        "correct": false
      },
      {
        "text": "Pentanol and hexanoic acid.",
        "correct": true
      }
    ],
    "text": "You notice a tree closeby. So, you run towards it and try your best to climb it. The polar bear follows you to it and starts shaking the tree. You fall off and die.",
    "options": [
      {
        "text": "Die",
        "to": "death"
      }
    ]
  },
  "death": {
    "text": "To your surprise, after trying to survive the polar bear attack, you wake up in the emergency room. Somehow, you did not die and are barely alive. However, the doctors are struggling to keep you alive because they totally forgot their organic chemistry knowledge.",
    "question": "This question is about organic chemistry. The doctors seem to have forgotten their organic chemistry knowledge. Which of the following is an example of a hydrogenation reaction?",
    "answers": [
      {
        "text": "<img src='https://i.imgur.com/v1mG8Xc.png' />",
        "correct": true
      },
      {
        "text": "<img src='https://i.imgur.com/s4LBRjW.png' />",
        "correct": false
      },
      {
        "text": "<img src='https://i.imgur.com/4hKqsLz.png' />",
        "correct": false
      }
    ],
    "options": [
      {
        "text": "You can try to stay calm",
        "to": "relax"
      },
      {
        "text": "You can try to stay positive",
        "to": "relax"
      },
      {
        "text": "You can try to stay calm and positive",
        "to": "relax"
      },
      {
        "text": "Exit the hospital",
        "to": "exit"
      }
    ]
  },
  "relax": {
    "text": "You decide to stay relaxed. Luckily, the doctors are able to save you because you helped them solve the organic chemistry question.",
    "options": [
      {
        "text": "Go home",
        "to": "home"
      }
    ],
    "question": "This question is about thermochemistry. As you are walking home, you feel hot due to the hot weather. What is the definition of heat (q)?",
    "answers": [
      {
        "text": "A feeling of warmth that humans feel",
        "correct": false
      },
      {
        "text": "The absense of coldness",
        "correct": false
      },
      {
        "text": "Transfer of thermal energy from one substance to another",  
        "correct": true
      },
      {
        "text": "All of the above",
        "correct": false
      },
      {
        "text": "None of the above",
        "correct": false
      },
      {
        "text": "Who cares?",
        "correct": false
      }
    ]
  },
  "exit": {
    "text": "You are feeling fine somehow. Probably because you helped them solve the organic chemistry question. You are now free to go wherever you want.",
    "options": [
      {
        "text": "Go home",
        "to": "home"
      }
    ],
    "question": "This question is about thermochemistry. As you are walking home, you feel hot due to the hot temperature. What is temperature?",
    "answers": [
      {
        "text": "How hot or cold the molecules in question are",
        "correct": false
      },
      {
        "text": "The heat content of a substance (how much energy is stored)",
        "correct": false
      },
      {
        "text": "How much energy is released when a chemical reaction occurs",
        "correct": false
      },
      {
        "text": "A measure of the average kinetic energy of particles in a sample of matter",
        "correct": true
      }
    ]
  },
  "home": {
    "text": "You decide to walk home. As you arrive, you notice that your house appears to be missing. It has simply dissapeared. You think there must be some dark magic involved or you are still spooked from the polar bear encounter. What do you do?",
    "question": "This question is about thermochemistry. What is the change in enthalpy of Ca3(PO4)2 + 3H2SO4 = 3CaSO4 + 2H3PO4?",
    "answers": [
      {
        "text": "0kJ",
        "correct": false
      },
      {
        "text": "281.9kJ",
        "correct": false
      },
      {
        "text": "-281.9kJ",
        "correct": false
      },
      {
        "text": "283.9kJ",
        "correct": false
      },
      {
        "text": "282.9kJ",
        "correct": false
      },
      {
        "text": "-282.9kJ",
        "correct": true
      },
      {
        "text": "-283.9kJ",
        "correct": false
      }
    ],
    "options": [
      {
        "text": "Cry",
        "to": "cry"
      },
      {
        "text": "Cry",
        "to": "cry"
      },
      {
        "text": "Cry",
        "to": "cry"
      }
    ]
  },
  "cry": {
    "text": "You cry because that is the only option. Luckily, a genie sees you crying and pops out of a random pebble in the ground. You decide that you're definitely still under some medicinal influences. The genie asks what wish you would like.",
    "options": [
      {
        "text": "You ask for your house to reappear",
        "to": "houseback"
      },
      {
        "text": "You ask for unlimited wishes",
        "to": "wishes"
      },
      {
        "text": "You ask for superpowers",
        "to": "superpowers"
      }
    ],
    "question": "This question is about equilibrium. If more C2H5OH were added to the combustion reaction of ethanol, C2H5OH + 3O2 = 2CO2 + 3H2O, which way would the equilibrium position move?",
    "answers": [
      {
        "text": "Left",
        "correct": false
      },
      {
        "text": "Right",
        "correct": true
      },
      {
        "text": "Neither",
        "correct": false
      }
    ]
  },
  "houseback": {
    "text": "You wish for your house to be reappeared magically. It does. You become very happy!",
    "options": [
      {
        "text": "Go to Starbucks (30 second walk away) to relax",
        "to": "starbucks"
      },
      {
        "text": "Go to the nearest mattress store to shop for a new mattress",
        "to": "mattress"
      }
    ],
    "question": "This question is about equilibrium. What happens to solubility when the Ksp is increased?",
    "answers": [
      {
        "text": "Solubility increases",
        "correct": true
      },
      {
        "text": "Solubility decreases",
        "correct": false
      }
    ]
  },
  "wishes": {
    "text": "You wish for unlimited wishes. You learn that this wish is actually not allowed. You must choose another wish",
    "options": [
      {
        "text": "You ask for your house to reappear",
        "to": "houseback"
      },
      {
        "text": "You ask for superpowers",
        "to": "superpowers"
      }
    ],
    "question": "This question is about equilibrium. H2 + F2 = 2HF, where [H2]i = 2.00M, [F2]i = 2.00M, [HF]i = 0M, and [F2]e = 0.48M. What is the equilibrium concentration of HF?",
    "answers": [
      {
        "text": "0.48M",
        "correct": false
      },
      {
        "text": "3.04M",
        "correct": true
      },
      {
        "text": "2.04M",
        "correct": false
      },
      {
        "text": "4.04M",
        "correct": false
      }
    ]
  },
  "superpowers": {
    "text": "You wish for superpowers. The genie gives you the ability to have your house reappear at will whenever you want but it can only be used one time. You exercise this wish now and your house reappears. You become very happy!",
    "options": [
      {
        "text": "Go to Starbucks (30 second walk away) to relax",
        "to": "starbucks"
      },
      {
        "text": "Go to the nearest mattress store to buy a new mattress",
        "to": "mattress"
      }
    ],
    "question": "This question is about equilibrium. With 0.2M HNO3 (a strong acid), what is the pH (2 s.f.)?",
    "answers": [
      {
        "text": "7.0",
        "correct": false
      },
      {
        "text": "0.7",
        "correct": true
      },
      {
        "text": "1.7",
        "correct": false
      },
      {
        "text": "9.1",
        "correct": false
      }
    ]
  },
  "starbucks": {
    "text": "You walk to Starbucks. You order a cup of coffee and start daydreaming as you drink it.",
    "options": [
      {
        "text": "Learn what you are daydreaminging about",
        "to": "start2"
      }
    ],
    "question": "This question is about electrochemistry.",
    "answers": [
      {
        "text": "This is correct answer",
        "correct": true
      }
    ]
  },
  "mattress": {
    "text": "You walk to the nearest mattress store. You test out a mattress but accidentally fall asleep.",
    "options": [
      {
        "text": "Learn what you are dreaming about",
        "to": "dream"
      }
    ],
    "question": "This question is about electrochemistry.",
    "answers": [
      {
        "text": "This is correct answer",
        "correct": true
      }
    ]
  },
  "dream": {
    "text": "You suddenly wake up in the hospital. The doctors inform you that you have been unconcious for six months after getting hit by a polar bear. You realize that your entire previous encounter was a dream while you were unconcious! The doctors perform more tests and advice you to relax for the next little while and let you go. You exit the hospital. What do you do?",
    "options": [
      {
        "text": "Go watch a movie to relax",
        "to": "movie"
      },
      {
        "text": "Go get some food",
        "to": "food"
      },
      {
        "text": "Go inform your homies that you are alive",
        "to": "homies"
      },
      {
        "text": "Look at more polar bears",
        "to": "polar"
      }
    ],
    "question": "What type of compound is: 3-methyl-3-pentanol?",
    "answers": [
      {
        "text": "Alkane",
        "correct": false
      },
      {
        "text": "Alkene",
        "correct": false
      },
      {
        "text": "Secondary alcohol",
        "correct": false
      },
      {
        "text": "Tertiary alcohol",
        "correct": true
      }
    ]
  },
  "movie": {
    "text": "You go watch a movie called Minions 2. It is the most incredible movie you have ever watched. You are feeling sufficiently relaxed to go do other things.",
    "options": [
      {
        "text": "Look at more polar bears",
        "to": "polar"
      }
    ],
    "question": "This question is about equilibrium. If heat were added to the exothermic reaction A + B = AB + heat, where would the equilibrium position shift?",
    "answers": [
      {
        "text": "Leftward",
        "correct": true
      },
      {
        "text": "Rightward",
        "correct": false
      },
      {
        "text": "Neither",
        "correct": false
      }
    ]
  },
  "food": {
    "text": "You go get some food. You are feeling sufficiently relaxed to go do other things.",
    "options": [
      {
        "text": "Look at more polar bears",
        "to": "polar"
      }
    ],
    "question": "This question is about thermochemistry. Which of the following are NOT factors that affect reaction rates?",
    "answers": [
      {
        "text": "Chemical nature of the reactants",
        "correct": false
      },
      {
        "text": "Concentration of the reactants",
        "correct": false
      },
      {
        "text": "Surface area",
        "correct": false
      },
      {
        "text": "Presence of a catalyst",
        "correct": false
      },
      {
        "text": "Enthalpy change",
        "correct": true
      }
    ]
  },
  "homies": {
    "text": "You go inform your homies that you are alive. They are very happy! You are feeling sufficiently relaxed to go do other things.",
    "options": [
      {
        "text": "Look at more polar bears",
        "to": "polar"
      }
    ],
    "question": "This question is about thermochemistry. If a chemical reaction is exothermic, which of the following is true about its change in enthalpy?",
    "answers": [
      {
        "text": "△H > 0 (It is positive)",
        "correct": false
      },
      {
        "text": "△H < 0 (It is negative)",
        "correct": true
      }
    ]
  },
  "polar": {
    "text": "You decide to see more polar bears again. So, you purchase a plane ticket to the arctic circle again and board it. The plane takes off. Unfortunately, while you are flying, the plane starts to shake. What do you do?",
    "options": [
      {
        "text": "Panic and jump out of the plane with a parachute",
        "to": "panic"
      },
      {
        "text": "Remain calm and hope the plane lands",
        "to": "calm"
      }
    ],
    "question": "This question is about organic chemistry. A common component in jet fuel (the fuel used in the plane you are on) is gasoline which is a substance that commonly contains 2,2,3-trimethylbutane. Which of the following is a 3D structure of this?",
    "answers": [
      {
        "text": "<img src='https://i.imgur.com/9qVbStR.png' />",
        "correct": true
      },
      {
        "text": "<img src='https://i.imgur.com/BPWzrpG.png' />",
        "correct": false
      },
      {
        "text": "<img src='https://i.imgur.com/EmuHOOW.png' />",
        "correct": false
      },
      {
        "text": "<img src='https://i.imgur.com/upxyxYm.png' />",
        "correct": false
      }
    ]
  },
  "panic": {
    "text": "You panic and jump out of the plane with a parachute. You are now happen to be in the arctic circle are are feeling very cold now. You are very lost and don't know where to go.",
    "options": [
      {
        "text": "Find polar bears",
        "to": "start2"
      },
      {
        "text": "Search for other people",
        "to": "start2"
      },
      {
        "text": "Search for shelter",
        "to": "start2"
      }
    ],
    "question": "This question is about thermochemistry. What is the purpose of a catalyst?",
    "answers": [
      {
        "text": "To prevent the reaction from occurring",
        "correct": false
      },
      {
        "text": "To make the reaction possible to occur",
        "correct": false
      },
      {
        "text": "To lower the activation energy required to progress the reaction",
        "correct": true
      },
      {
        "text": "To increase the activation energy required to progress the reaction",
        "correct": false
      }
    ]
  },
  "calm": {
    "text": "You remain calm and hope the plane lands. Fortunately, it was just turbulence. Glad you didn't jump out the plane! Anyway, you land and decide to search for polar bears. You start wandering around the arctic circle.",
    "options": [
      {
        "text": "Find polar bears",
        "to": "start2"
      }
    ],
    "question": "This question is about equilibrium. Polar bears are very strong. Speaking of strong things... do strong acids have greater or lesser Ka values than weak acids?",
    "answers": [
      {
        "text": "Greater",
        "correct": true
      },
      {
        "text": "Lesser",
        "correct": false
      }
    ]
  }
}

function initializeGame(autoStart) {
  if (autoStart) {
    $(`#start`).addClass('hidden');
    $(`#scene`).removeClass('hidden');
    $(`#answers`).addClass('hidden');
    loadScene('start');
    scoreTotal = 0;

    $(`#content`).addClass("gameOn");
  }
  else {
    $(`#start`).removeClass('hidden');
    $(`#answers`).addClass('hidden');
    $(`#scene`).addClass('hidden');
    $(`#content`).removeClass("gameOn");
  }  
}

function loadScene(id, startingAgain) {

  if (id == 'start2') {
    alert(`Your score is ${scoreTotal}. This is because you selected the wrong answer ${scoreTotal} times.`);
    loadScene('start', true);
    return;
  }

  $(`#sceneText`).html("");
  $(`#sceneOptions`).empty();
  $(`#sceneImage`).addClass('hidden');
  const sceneDetails = scenarios[id];
  
  if (sceneDetails.image) {
    $(`#sceneImage`).removeClass('hidden');
    $(`#sceneImage`).get(0).setAttribute(`src`, `${sceneDetails.image}`)
  }
  // Type-writer effect 
  let text = sceneDetails.text;
  if (startingAgain) {
    text = "As you search the arctic, you decide to search for some polar bears. Wow, looks like this story just went full circle! " + text;
  }
  let i = 0;
  const typeWriter = setInterval(() => {
    $(`#sceneText`).append(text[i]);
    i++;
    if (i >= text.length) {
      clearInterval(typeWriter);

      // Show options
      window.setTimeout(() => {
        $(`#sceneOptions`).empty();
        let delay = 0;
        sceneDetails.options.forEach(option => {
          window.setTimeout(() => {
            $(`#sceneOptions`).append(`<button onclick="loadQuestions('${id}', '${option.to}')" class="button disabled animate__animated animate__fadeIn">${option.text}</button><br><br>`);
          }, delay);
          delay += 499;
        });

        window.setTimeout(() => {
          $(`#sceneOptions`).append(`<button onclick="initializeGame()" class="button danger animate__animated animate__fadeIn">Reset</button>`);
          $('.disabled').removeClass('disabled');
        }, delay);
      }, 0)
    }
  }, 15);
}

function loadQuestions(id, selection) {
  $(`#sceneOptions`).empty();
  $(`#sceneText`).append(`<br><br>`);
  const sceneDetails = scenarios[id];

  const text = `To continue, you must first answer this question: ${sceneDetails.question}`;
  let i = 0;
  const typeWriter = setInterval(() => {
    $(`#sceneText`).append(text[i]);
    i++;
    if (i >= text.length) {
      clearInterval(typeWriter);

      // Show options
      window.setTimeout(() => {
        let delay = 0;
        sceneDetails.answers.forEach(option => {
          window.setTimeout(() => {

            if (option.correct) {
              $(`#sceneOptions`).append(`<button onclick="loadScene('${selection}')" class="button disabled animate__animated animate__fadeIn">${option.text}</button><br><br>`);
            }
            else {
              $(`#sceneOptions`).append(`<button onclick="alert('Sorry, this answer is incorrect. One point has been deducted from your score.'); scoreTotal = scoreTotal + 1" class="button disabled animate__animated animate__fadeIn">${option.text}</button><br><br>`);
            }

          }, delay);
          delay += 499;
        });

        window.setTimeout(() => {
          $(`#sceneOptions`).append(`<button onclick="initializeGame()" class="button danger animate__animated animate__fadeIn">Reset</button>`);
          $('.disabled').removeClass('disabled');
        }, delay);
      }, 99)
    }
  }, 15);

}

const scenes = Object.keys(scenarios);
scenes.forEach((sceneKey, index) => {
  scene = scenarios[sceneKey];
  $(`#answersContent`).append(`<b>Question ${index+1}:</b> ${scene.question}<br></br>`);

  scene.answers.forEach(answer => {
    if (answer.correct) {
      $(`#answersContent`).append(`<button class="button animate__animated animate__fadeIn">${answer.text}</button><br><br>`);
    }
    else {
      $(`#answersContent`).append(`<button class="button danger animate__animated animate__fadeIn">${answer.text}</button><br><br>`);
    }
  });

  $(`#answersContent`).append(`<br><hr><br<br><br>`);
});

// GET URL Parameters
const urlParams = new URLSearchParams(window.location.search);
const a = urlParams.get('a');
if (a == "answers") {
  loadAnswers();
}

function loadAnswers() {
  $(`#answers`).removeClass('hidden');
  $(`#start`).addClass('hidden');
}