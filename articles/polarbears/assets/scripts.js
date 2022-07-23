// Choose your own adventure game.
let scoreTotal = 0; // Number of failed questions

const scenarios = {
  "start": {
    "text": "You are on an expedition in the Arctic Circle when you see a polar bear in the distance.",
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
    "text": "You decide to try to scare the polar bear away by making loud noises. You start banging on your pots and pans and shouting. Unfortunately, your pots and pans still had some water on it thus dampening your sound. The polar bear starts to approach you.",
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
    "text": "You keep making noise and the polar bear comes closer and closer. You are about to be attacked now.",
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
    "text": "You try to fight the polar bear. You are not very good at fighting, so you die.",
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
    "text": "You decide to try to sneak away and hope the polar bear doesn’t see you. Unfortunately, while you’re sneaking away you trip and make a loud sound which causes the polar bear to look directly at you.",
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
    "text": "You try to climb a nearby tree but fall off and die.",
    "options": [
      {
        "text": "Die",
        "to": "death"
      }
    ]
  },
  "death": {
    "text": "To your surprise, after trying to survive the polar bear attack, you wake up in the emergency room. The doctors are struggling to keep you alive.",
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
        "text": "None of the above",
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
    "text": "You arrive at home. Unfortunately, you see that your house is completely missing! What do you do?",
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
    "text": "You cry. Luckily, a genie sees you crying and pops out of a random pebble in the ground. The pebble is made out of rocks. The genie asks what wish you would like.",
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
        "correct": false
      },
      {
        "text": "Solubility decreases",
        "correct": true
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
    "question": "This question is about equilibrium. With 0.2M HNO3 (a strong acid), what is the pH?",
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
    "text": "You walk to Starbucks. You order a cup of coffee and start daydreaming as you drink it. You daydream about the following:",
    "options": [
      {
        "text": "Learn what you are daydreaminging about",
        "to": "start"
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
    "text": "You walk to the nearest mattress store. You test out a mattress but accidentally fall asleep. You dream about the following:",
    "options": [
      {
        "text": "Learn what you are dreaming about",
        "to": "start"
      }
    ],
    "question": "This question is about electrochemistry.",
    "answers": [
      {
        "text": "This is correct answer",
        "correct": true
      }
    ]
  }
}

function initializeGame(autoStart) {
  if (autoStart) {
    $(`#start`).addClass('hidden');
    $(`#scene`).removeClass('hidden');
    loadScene('start');
    scoreTotal = 0;
  }
  else {
    $(`#start`).removeClass('hidden');
    $(`#scene`).addClass('hidden');
  }  
}

function loadScene(id) {
  $(`#sceneText`).html("");
  $(`#sceneOptions`).empty();
  const sceneDetails = scenarios[id];

  // Type-writer effect 
  const text = sceneDetails.text;
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
  }, 25);
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
  }, 25);

}