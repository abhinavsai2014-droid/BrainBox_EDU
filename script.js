/* =========================================
   BRAINBOX EDU
   MAIN APPLICATION
========================================= */


/* =========================================
   APP DATA
========================================= */

const app = {

  name: "",

  grade: null,

  board: "",

  stream: "",

  energy: 100,

  maxEnergy: 500,

  streak: 1,

  studyMinutes: 0,

  level: 1,

  selectedGrade: null,

  selectedBoard: null,

  selectedStream: null,

  currentStep: 1,

  timerSeconds: 15 * 60,

  timerRunning: false,

  timerInterval: null,

  quizIndex: -1,

  quizScore: 0

};


/* =========================================
   ELEMENTS
========================================= */

const welcomeScreen =
  document.getElementById("welcomeScreen");

const onboardingScreen =
  document.getElementById("onboardingScreen");

const dashboardScreen =
  document.getElementById("dashboardScreen");

const startButton =
  document.getElementById("startButton");

const nameInput =
  document.getElementById("nameInput");

const nameError =
  document.getElementById("nameError");

const nameNextButton =
  document.getElementById("nameNextButton");

const gradeGrid =
  document.getElementById("gradeGrid");

const boardGrid =
  document.getElementById("boardGrid");

const streamGrid =
  document.getElementById("streamGrid");

const gradeNextButton =
  document.getElementById("gradeNextButton");

const boardNextButton =
  document.getElementById("boardNextButton");

const finishOnboardingButton =
  document.getElementById("finishOnboardingButton");

const stepNumber =
  document.getElementById("stepNumber");

const onboardingProgress =
  document.getElementById("onboardingProgress");

const greetingText =
  document.getElementById("greetingText");

const profileInitial =
  document.getElementById("profileInitial");

const energyValue =
  document.getElementById("energyValue");

const energyBar =
  document.getElementById("energyBar");

const energyPercent =
  document.getElementById("energyPercent");

const levelValue =
  document.getElementById("levelValue");

const streakValue =
  document.getElementById("streakValue");

const goalValue =
  document.getElementById("goalValue");

const studentGradeBadge =
  document.getElementById("studentGradeBadge");

const subjectsGrid =
  document.getElementById("subjectsGrid");

const themeButton =
  document.getElementById("themeButton");

const olympiadButton =
  document.getElementById("olympiadButton");

const olympiadModal =
  document.getElementById("olympiadModal");

const closeOlympiad =
  document.getElementById("closeOlympiad");

let lastFocusedElement = null;

let modalKeydownHandler = null;

const quizArea =
  document.getElementById("quizArea");

const quizScore =
  document.getElementById("quizScore");

const nextQuestionButton =
  document.getElementById("nextQuestionButton");

const timerDisplay =
  document.getElementById("timerDisplay");

const timerButton =
  document.getElementById("timerButton");

const toast =
  document.getElementById("toast");

const toastMessage =
  document.getElementById("toastMessage");

const toastIcon =
  document.getElementById("toastIcon");

const achievementCount =
  document.getElementById("achievementCount");


/* =========================================
   SUBJECT DATA
========================================= */

const subjects = {

  junior: [
    ["📖", "English"],
    ["🔢", "Mathematics"],
    ["🌿", "EVS"],
    ["🌎", "General Knowledge"],
    ["💻", "Computer Basics"]
  ],

  middle: [
    ["📖", "English"],
    ["🔢", "Mathematics"],
    ["🔬", "Science"],
    ["🌎", "Social Studies"],
    ["💻", "Computer Science"]
  ],

  secondary: [
    ["📖", "English"],
    ["🔢", "Mathematics"],
    ["⚛️", "Physics"],
    ["🧪", "Chemistry"],
    ["🧬", "Biology"],
    ["🌎", "Social Science"],
    ["💻", "Computer Science"]
  ]

};


/* =========================================
   OLYMPIAD QUESTIONS
========================================= */

const olympiadQuestions = [

  {
    question:
      "A number is doubled and then 6 is added. The result is 20. What is the number?",

    options: [
      "5",
      "6",
      "7",
      "8"
    ],

    answer: 2
  },

  {
    question:
      "Which number should come next? 2, 4, 8, 16, ___",

    options: [
      "20",
      "24",
      "32",
      "36"
    ],

    answer: 2
  },

  {
    question:
      "If all squares are rectangles, which statement must be true?",

    options: [
      "Every rectangle is a square",
      "Every square is a rectangle",
      "No square is a rectangle",
      "Squares have no sides"
    ],

    answer: 1
  },

  {
    question:
      "A clock shows 3:00. What is the angle between the hour and minute hands?",

    options: [
      "45°",
      "60°",
      "90°",
      "180°"
    ],

    answer: 2
  },

  {
    question:
      "Which word does NOT belong with the others?",

    options: [
      "Triangle",
      "Square",
      "Circle",
      "Rectangle"
    ],

    answer: 2
  }

];


/* =========================================
   BOARD OPTIONS
========================================= */

const boards = [
  "CBSE",
  "ICSE",
  "State Board",
  "IB",
  "IGCSE",
  "Other"
];


/* =========================================
   STREAM OPTIONS
========================================= */

const streams = [

  {
    name: "Science",
    icon: "🔬",
    description:
      "Physics • Chemistry • Biology • Mathematics • CS"
  },

  {
    name: "Commerce",
    icon: "📈",
    description:
      "Accounts • Business • Economics • Mathematics"
  },

  {
    name: "Humanities",
    icon: "🌍",
    description:
      "History • Political Science • Geography • More"
  }

];


/* =========================================
   SCREEN FUNCTIONS
========================================= */

function showScreen(screen) {

  const screens =
    document.querySelectorAll(".screen");

  screens.forEach(item => {

    const isActive =
      item === screen;

    item.classList.toggle(
      "active-screen",
      isActive
    );

    item.setAttribute(
      "aria-hidden",
      isActive ? "false" : "true"
    );

  });

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });

  const heading =
    screen.querySelector("h1, h2");

  if (heading) {

    heading.setAttribute(
      "tabindex",
      "-1"
    );

    setTimeout(() => {
      heading.focus({
        preventScroll: true
      });
    }, 300);

  }

  if (screen === welcomeScreen) {

    document.title =
      "BrainBox EDU";

  } else if (
    screen === onboardingScreen
  ) {

    document.title =
      "BrainBox EDU — Getting Started";

  } else if (
    screen === dashboardScreen
  ) {

    document.title =
      "BrainBox EDU — Dashboard";

  }

}

/* =========================================
   START BUTTON
========================================= */

startButton.addEventListener("click", () => {

  app.currentStep = 1;

  updateOnboarding();

  showScreen(onboardingScreen);

  setTimeout(() => {
    nameInput.focus();
  }, 300);

});


/* =========================================
   NAME STEP
========================================= */

nameNextButton.addEventListener(
  "click",
  () => {

    const name =
      nameInput.value.trim();

    if (!name) {

      nameInput.setAttribute(
        "aria-invalid",
        "true"
      );

      nameError.textContent =
        "Please enter your name before continuing.";

      nameInput.focus();

      return;
    }

    nameInput.removeAttribute(
      "aria-invalid"
    );

    nameError.textContent = "";

    app.name = name;

    app.currentStep = 2;

    updateOnboarding();

  }
);


nameInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {

    nameNextButton.click();

  }

});


/* =========================================
   CREATE GRADE BUTTONS
========================================= */

function createGradeButtons() {

  gradeGrid.innerHTML = "";

  for (let i = 1; i <= 12; i++) {

    const button =
      document.createElement("button");

     button.type = "button";

    button.className =
      "choice-button";

    button.textContent =
      `Grade ${i}`;

    button.addEventListener("click", () => {

      app.selectedGrade = i;

      document
        .querySelectorAll("#gradeGrid .choice-button")
        .forEach(item => {
          item.classList.remove("selected");
        });

      button.classList.add("selected");

      playBoop();

    });

    gradeGrid.appendChild(button);

  }

}


/* =========================================
   CREATE BOARD BUTTONS
========================================= */

function createBoardButtons() {

  boardGrid.innerHTML = "";

  boards.forEach(board => {

    const button =
      document.createElement("button");

     button.type = "button";

    button.className =
      "choice-button";

    button.textContent =
      board;

    button.addEventListener("click", () => {

      app.selectedBoard = board;

      document
        .querySelectorAll("#boardGrid .choice-button")
        .forEach(item => {
          item.classList.remove("selected");
        });

      button.classList.add("selected");

      playBoop();

    });

    boardGrid.appendChild(button);

  });

}


/* =========================================
   GRADE NEXT
========================================= */

gradeNextButton.addEventListener("click", () => {

  if (!app.selectedGrade) {

    showToast(
      "Choose your grade first!",
      "🎓"
    );

    return;
  }

  app.grade =
    app.selectedGrade;

  app.currentStep = 3;

  updateOnboarding();

});


/* =========================================
   BOARD NEXT
========================================= */

boardNextButton.addEventListener("click", () => {

  if (!app.selectedBoard) {

    showToast(
      "Choose your board first!",
      "📚"
    );

    return;
  }

  app.board =
    app.selectedBoard;

  if (app.grade >= 11) {

    app.currentStep = 4;

  } else {

    finishApp();

    return;
  }

  updateOnboarding();

});


/* =========================================
   CREATE STREAM BUTTONS
========================================= */

function createStreamButtons() {

  streamGrid.innerHTML = "";

  streams.forEach(stream => {

    const button =
      document.createElement("button");

     button.type = "button";

    button.className =
      "choice-button stream-button";

    button.innerHTML = `
      <strong>
        ${stream.icon} ${stream.name}
      </strong>

      <small>
        ${stream.description}
      </small>
    `;

    button.addEventListener("click", () => {

      app.selectedStream =
        stream.name;

      document
        .querySelectorAll("#streamGrid .choice-button")
        .forEach(item => {
          item.classList.remove("selected");
        });

      button.classList.add("selected");

      playBoop();

    });

    streamGrid.appendChild(button);

  });

}


/* =========================================
   FINISH ONBOARDING
========================================= */

finishOnboardingButton.addEventListener(
  "click",
  () => {

    if (!app.selectedStream) {

      showToast(
        "Choose your stream first!",
        "🚀"
      );

      return;
    }

    app.stream =
      app.selectedStream;

    finishApp();

  }
);


/* =========================================
   ONBOARDING UPDATE
========================================= */

function updateOnboarding() {

  const steps =
    document.querySelectorAll(
      ".onboarding-step"
    );

  steps.forEach(step => {

    const isCurrent =
      step.id ===
      getStepId(app.currentStep);

    step.classList.toggle(
      "active-step",
      isCurrent
    );

    step.setAttribute(
      "aria-hidden",
      isCurrent ? "false" : "true"
    );

  });

  const current =
    document.getElementById(
      getStepId(app.currentStep)
    );

  stepNumber.textContent =
    app.currentStep;

  const progress =
    app.currentStep * 25;

  onboardingProgress.style.width =
    `${progress}%`;

  onboardingProgress.setAttribute(
    "aria-valuenow",
    progress
  );

  if (current) {

    const focusTarget =
      current.querySelector(
        "input, button, h2"
      );

    if (focusTarget) {

      setTimeout(() => {
        focusTarget.focus({
          preventScroll: true
        });
      }, 150);

    }

  }

}


function getStepId(step) {

  const ids = {
    1: "nameStep",
    2: "gradeStep",
    3: "boardStep",
    4: "streamStep"
  };

  return ids[step];

}


/* =========================================
   FINISH APP
========================================= */

function finishApp() {

  saveData();

  prepareDashboard();

  showScreen(dashboardScreen);

  showToast(
    `Welcome to BrainBox EDU, ${app.name}!`,
    "🧠"
  );

}


/* =========================================
   DASHBOARD
========================================= */

function prepareDashboard() {

  greetingText.textContent =
    `Hey ${app.name}!`;

  profileInitial.textContent =
    app.name.charAt(0).toUpperCase();

  levelValue.textContent =
    app.level;

  streakValue.textContent =
    app.streak;

  studentGradeBadge.textContent =
    `Grade ${app.grade}`;

  updateEnergy();

  createSubjects();

}


/* =========================================
   CREATE SUBJECTS
========================================= */

function createSubjects() {

  let list = [];

  if (app.grade <= 5) {

    list =
      subjects.junior;

  } else if (app.grade <= 8) {

    list =
      subjects.middle;

  } else {

    list =
      subjects.secondary;

  }

  if (
    app.grade >= 11 &&
    app.stream === "Science"
  ) {

    list = [
      ["⚛️", "Physics"],
      ["🧪", "Chemistry"],
      ["🧬", "Biology"],
      ["🔢", "Mathematics"],
      ["💻", "Computer Science"]
    ];

  }

  if (
    app.grade >= 11 &&
    app.stream === "Commerce"
  ) {

    list = [
      ["🧮", "Accounts"],
      ["📊", "Business Studies"],
      ["💰", "Economics"],
      ["🔢", "Mathematics"]
    ];

  }

  if (
    app.grade >= 11 &&
    app.stream === "Humanities"
  ) {

    list = [
      ["🏛️", "History"],
      ["⚖️", "Political Science"],
      ["🌍", "Geography"],
      ["📖", "English"],
      ["🧠", "Psychology"]
    ];

  }

  subjectsGrid.innerHTML = "";

  list.forEach(subject => {

    const card =
  document.createElement("button");

card.type = "button";
    card.className =
      "subject-card";

    card.innerHTML = `
      <div class="subject-icon">
        ${subject[0]}
      </div>

      <div>
        <strong>${subject[1]}</strong>

       <small>
         Select to start learning
       </small>
      </div>
    `;

    card.addEventListener("click", () => {

      addEnergy(5);

      showToast(
        `${subject[1]} selected! +5 ⚡`,
        "📚"
      );

    });

    subjectsGrid.appendChild(card);

  });

}


/* =========================================
   ENERGY SYSTEM
========================================= */

function addEnergy(amount) {

  app.energy += amount;

  if (app.energy > app.maxEnergy) {
    app.energy =
      app.maxEnergy;
  }

  updateEnergy();

  saveData();

}


function updateEnergy() {

  energyValue.textContent =
    app.energy;

  levelValue.textContent =
    app.level;

  const percentage =
    (app.energy / app.maxEnergy) * 100;

  energyBar.style.width =
    `${percentage}%`;

   energyBar.setAttribute(
  "aria-valuenow",
  Math.round(app.energy)
);
  energyPercent.textContent =
    `${Math.round(percentage)}%`;

  if (app.energy >= 500) {

    app.level =
      Math.max(
        app.level,
        2
      );

    levelValue.textContent =
      app.level;

  }

}


/* =========================================
   THEME
========================================= */

themeButton.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );

    const dark =
      document.body.classList.contains(
        "dark"
      );

    themeButton.textContent =
      dark ? "☀️" : "🌙";

    localStorage.setItem(
      "brainboxDark",
      dark
    );

  }
);


/* =========================================
   LOAD THEME
========================================= */

if (
  localStorage.getItem(
    "brainboxDark"
  ) === "true"
) {

  document.body.classList.add("dark");

  themeButton.textContent =
    "☀️";

}


/* =========================================
   OLYMPIAD MODAL
========================================= */

function getModalFocusableElements() {

  return olympiadModal.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

}

function openOlympiadModal() {

  lastFocusedElement =
    document.activeElement;

  olympiadModal.classList.remove(
    "hidden"
  );

  olympiadModal.setAttribute(
    "aria-hidden",
    "false"
  );

  resetQuiz();

  const focusable =
    getModalFocusableElements();

  if (focusable.length > 0) {

    setTimeout(() => {
      focusable[0].focus();
    }, 50);

  }

  modalKeydownHandler =
    event => {

      if (event.key === "Escape") {

        closeOlympiadModal();

      }

      if (event.key !== "Tab") {
        return;
      }

      const items =
        Array.from(
          getModalFocusableElements()
        );

      if (!items.length) {
        return;
      }

      const first =
        items[0];

      const last =
        items[items.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {

        event.preventDefault();

        last.focus();

      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {

        event.preventDefault();

        first.focus();

      }

    };

  document.addEventListener(
    "keydown",
    modalKeydownHandler
  );

}

function closeOlympiadModal() {

  olympiadModal.classList.add(
    "hidden"
  );

  olympiadModal.setAttribute(
    "aria-hidden",
    "true"
  );

  if (modalKeydownHandler) {

    document.removeEventListener(
      "keydown",
      modalKeydownHandler
    );

    modalKeydownHandler = null;

  }

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus ===
      "function"
  ) {

    setTimeout(() => {
      lastFocusedElement.focus();
    }, 50);

  }

}

olympiadButton.addEventListener(
  "click",
  openOlympiadModal
);

closeOlympiad.addEventListener(
  "click",
  closeOlympiadModal
);

olympiadModal.addEventListener(
  "click",
  event => {

    if (
      event.target === olympiadModal
    ) {

      closeOlympiadModal();

    }

  }
);


/* =========================================
   QUIZ
========================================= */

function resetQuiz() {

  app.quizIndex = -1;

  app.quizScore = 0;

  quizScore.textContent =
    "0";

  quizArea.innerHTML = `
    <div class="quiz-question">
      <h3>
        This is a 5-point Olympiad-style
        BrainBox challenge.
      </h3>

      <p>
        Each correct answer gives you
        <strong>+5 Energy ⚡</strong>.
      </p>
    </div>
  `;

  nextQuestionButton.textContent =
    "Start Challenge →";

}


nextQuestionButton.addEventListener(
  "click",
  () => {

    if (
      app.quizIndex ===
      olympiadQuestions.length - 1
    ) {

      finishQuiz();

      return;
    }

    app.quizIndex++;

    showQuestion();

  }
);


function showQuestion() {

  const question =
    olympiadQuestions[
      app.quizIndex
    ];

  quizArea.innerHTML = `
    <div class="quiz-question">

      <h3>
        ${app.quizIndex + 1}.
        ${question.question}
      </h3>

      <div id="quizOptions">
      </div>

    </div>
  `;

  const options =
    document.getElementById(
      "quizOptions"
    );

  question.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");

       button.type = "button";

      button.className =
        "quiz-option";

      button.textContent =
        option;

      button.addEventListener(
        "click",
        () => {

          answerQuestion(
            button,
            index,
            question.answer
          );

        }
      );

      options.appendChild(button);

    }
  );

  nextQuestionButton.textContent =
    app.quizIndex ===
    olympiadQuestions.length - 1
      ? "Finish Challenge 🏆"
      : "Next Question →";

}


function answerQuestion(
  button,
  selected,
  correct
) {

  const buttons =
    document.querySelectorAll(
      ".quiz-option"
    );

  buttons.forEach(
    item => {
      item.disabled = true;
    }
  );

  if (selected === correct) {

    button.classList.add(
      "correct"
    );

    app.quizScore++;

    quizScore.textContent =
      app.quizScore;

    addEnergy(5);

    showToast(
      "Boom! That's brain power! +5 ⚡",
      "⚡"
    );

  } else {

    button.classList.add(
      "wrong"
    );

    buttons[
      correct
    ].classList.add(
      "correct"
    );

    showToast(
      "Almost there! Review the concept.",
      "🧠"
    );

  }

}


function finishQuiz() {

  quizArea.innerHTML = `
    <div class="quiz-question">

      <h3>
        🏆 Challenge Complete!
      </h3>

      <p>
        You scored
        <strong>
          ${app.quizScore}/5
        </strong>.
      </p>

      <p style="margin-top:10px;">
        Keep practicing and your
        reasoning power will grow!
      </p>

    </div>
  `;

  nextQuestionButton.textContent =
    "Close Challenge";

  nextQuestionButton.onclick =
    () => {

     closeOlympiadModal();
      nextQuestionButton.onclick =
        null;

      resetQuiz();

    };

}


/* =========================================
   FOCUS TIMER
========================================= */

timerButton.addEventListener(
  "click",
  () => {

    if (app.timerRunning) {

      stopTimer();

    } else {

      startTimer();

    }

  }
);


function startTimer() {

  app.timerRunning =
    true;

  timerButton.textContent =
    "Pause";

  app.timerInterval =
    setInterval(
      () => {

        if (
          app.timerSeconds <= 0
        ) {

          completeFocusSession();

          return;
        }

        app.timerSeconds--;

        updateTimer();

      },
      1000
    );

}


function stopTimer() {

  app.timerRunning =
    false;

  clearInterval(
    app.timerInterval
  );

  timerButton.textContent =
    "Start";

}


function completeFocusSession() {

  stopTimer();

  app.studyMinutes += 15;

  addEnergy(10);

  goalValue.textContent =
    app.studyMinutes;

  app.timerSeconds =
    15 * 60;

  updateTimer();

  showToast(
    "Focus session complete! +10 ⚡",
    "⏱️"
  );

  saveData();

}


function updateTimer() {

  const minutes =
    Math.floor(
      app.timerSeconds / 60
    );

  const seconds =
    app.timerSeconds % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


/* =========================================
   SOUND
========================================= */

function playBoop() {

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) return;

    const audio =
      new AudioContext();

    const oscillator =
      audio.createOscillator();

    const gain =
      audio.createGain();

    oscillator.frequency.value =
      520;

    oscillator.type =
      "sine";

    gain.gain.setValueAtTime(
      0.08,
      audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audio.currentTime + 0.12
    );

    oscillator.connect(gain);

    gain.connect(
      audio.destination
    );

    oscillator.start();

    oscillator.stop(
      audio.currentTime + 0.12
    );

  } catch (error) {

    console.log(
      "Sound unavailable."
    );

  }

}


/* =========================================
   TOAST
========================================= */

function showToast(
  message,
  icon = "⚡"
) {

  toastMessage.textContent =
    message;

  toastIcon.textContent =
    icon;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    window.toastTimer
  );

  window.toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );

}


/* =========================================
   SAVE DATA
========================================= */

function saveData() {

  localStorage.setItem(
    "brainboxData",
    JSON.stringify({
      name: app.name,
      grade: app.grade,
      board: app.board,
      stream: app.stream,
      energy: app.energy,
      streak: app.streak,
      studyMinutes: app.studyMinutes,
      level: app.level
    })
  );

}


/* =========================================
   LOAD DATA
========================================= */

function loadData() {

  const saved =
    localStorage.getItem(
      "brainboxData"
    );

  if (!saved) {

    createGradeButtons();
    createBoardButtons();
    createStreamButtons();

    return;

  }

  try {

    const data =
      JSON.parse(saved);

    Object.assign(
      app,
      data
    );

    if (
      app.name &&
      app.grade
    ) {

      prepareDashboard();

      showScreen(
        dashboardScreen
      );

    }

  } catch (error) {

    console.log(
      "Could not load saved BrainBox data."
    );

  }

  createGradeButtons();
  createBoardButtons();
  createStreamButtons();

}


/* =========================================
   CONTINUE LEARNING
========================================= */

document
  .getElementById("continueButton")
  .addEventListener(
    "click",
    () => {

      addEnergy(5);

      showToast(
        "Learning mode is ready! +5 ⚡",
        "📚"
      );

    }
  );


/* =========================================
   NAVIGATION
========================================= */

document
  .getElementById("gamesNav")
  .addEventListener(
    "click",
    () => {

      showToast(
        "Mini-games are coming to your Energy Lab!",
        "🎮"
      );

    }
  );


document
  .getElementById("learnNav")
  .addEventListener(
    "click",
    () => {

      document
        .querySelector(".section-block")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


document
  .getElementById("profileNav")
  .addEventListener(
    "click",
    () => {

      showToast(
        `${app.name}'s BrainBox profile`,
        "👤"
      );

    }
  );


/* =========================================
   INITIALIZE
========================================= */

loadData();

updateTimer();
