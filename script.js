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

const achievementGrid =
  document.getElementById("achievementGrid");

const achievements = [

  {
    id: "brain-starter",
    icon: "🌱",
    name: "Brain Starter",
    description: "Complete your first lesson.",
    check: () =>
      getCompletedLessonCount() >= 1
  },

  {
    id: "sharp-thinker",
    icon: "🧠",
    name: "Sharp Thinker",
    description: "Answer 5 learning questions correctly.",
    check: () =>
      Number(app.totalCorrectAnswers || 0) >= 5
  },

  {
    id: "daily-goal",
    icon: "🎯",
    name: "Goal Getter",
    description: "Complete a 30-minute daily goal.",
    check: () =>
      Boolean(app.dailyGoalCompleted)
  },

  {
    id: "seven-day",
    icon: "🔥",
    name: "7-Day Hero",
    description: "Build a 7-day learning streak.",
    check: () =>
      Number(app.bestStreak || 0) >= 7
  },

  {
    id: "math-builder",
    icon: "🧮",
    name: "Math Builder",
    description: "Complete 5 Mathematics lessons.",
    check: () =>
      getCompletedSubjectCount(
        "Mathematics"
      ) >= 5
  }

];


function getCompletedLessonCount() {

  return Array.isArray(
    app.completedLessons
  )
    ? app.completedLessons.length
    : 0;

}


function getCompletedSubjectCount(
  subjectName
) {

  if (
    !Array.isArray(
      app.completedLessons
    )
  ) {
    return 0;
  }

  return app.completedLessons
    .filter(
      item =>
        item.startsWith(
          `${subjectName}|`
        )
    )
    .length;

}


function checkAchievements() {

  if (
    !Array.isArray(
      app.unlockedAchievements
    )
  ) {

    app.unlockedAchievements = [];

  }

  achievements.forEach(
    achievement => {

      if (
        app.unlockedAchievements.includes(
          achievement.id
        )
      ) {
        return;
      }

      if (
        achievement.check()
      ) {

        app.unlockedAchievements.push(
          achievement.id
        );

        showToast(
          `Achievement unlocked: ${achievement.name}`,
          "🏆"
        );

      }

    }
  );

  renderAchievements();

  achievementCount.textContent =
    app.unlockedAchievements.length;

  saveData();

}


function renderAchievements() {

  achievementGrid.innerHTML = "";

  achievements.forEach(
    achievement => {

      const unlocked =
        app.unlockedAchievements.includes(
          achievement.id
        );

      const card =
        document.createElement("div");

      card.className =
        unlocked
          ? "achievement-card unlocked"
          : "achievement-card";

      card.innerHTML = `
        <div
          class="achievement-icon ${
            unlocked ? "" : "locked"
          }"
        >
          ${achievement.icon}
        </div>

        <strong>
          ${achievement.name}
        </strong>

        <span>
          ${achievement.description}
        </span>
      `;

      achievementGrid.appendChild(card);

    }
  );

}


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

     goalValue.textContent =
    Number(
      app.todayStudyMinutes || 0
    );

  achievementCount.textContent =
    Array.isArray(
      app.unlockedAchievements
    )
      ? app.unlockedAchievements.length
      : 0;

  studentGradeBadge.textContent =
    `Grade ${app.grade}`;

  updateEnergy();

  createSubjects();
     
  prepareDailyState();

  renderAchievements();

  updateLearningProgress();

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
      openSubject(subject[1]);
    });

    subjectsGrid.appendChild(card);

  });

}


/* =========================================
   LEARNING ENGINE
========================================= */

const learningScreen =
  document.getElementById("learningScreen");

const chapterListSection =
  document.getElementById("chapterListSection");

const chapterList =
  document.getElementById("chapterList");

const lessonSection =
  document.getElementById("lessonSection");

const learningSubjectTitle =
  document.getElementById("learningSubjectTitle");

const learningProfileSummary =
  document.getElementById("learningProfileSummary");

const learningProfileLabel =
  document.getElementById("learningProfileLabel");

const lessonSubjectLabel =
  document.getElementById("lessonSubjectLabel");

const lessonTitle =
  document.getElementById("lessonTitle");

const lessonTopic =
  document.getElementById("lessonTopic");

const lessonProgressText =
  document.getElementById("lessonProgressText");

const lessonProgressBar =
  document.getElementById("lessonProgressBar");

const lessonConceptTitle =
  document.getElementById("lessonConceptTitle");

const lessonExplanation =
  document.getElementById("lessonExplanation");

const lessonExample =
  document.getElementById("lessonExample");

const practiceQuestion =
  document.getElementById("practiceQuestion");

const practiceOptions =
  document.getElementById("practiceOptions");

const practiceFeedback =
  document.getElementById("practiceFeedback");

const completeLessonButton =
  document.getElementById("completeLessonButton");

const backToDashboardButton =
  document.getElementById("backToDashboardButton");

const backToChaptersButton =
  document.getElementById("backToChaptersButton");


/*
  This is the starter curriculum layer.

  IMPORTANT:
  These are ORIGINAL starter lessons.
  They are not copied from Scribd or any textbook.
*/

const starterCurriculum = {

  Mathematics: {

    junior: [
      {
        chapter: "Numbers Around Us",
        lessons: [
          {
            title: "Understanding Numbers",
            topic: "Place value and number sense",
            explanation:
              "Numbers tell us how many or how much. Place value tells us what each digit means because its value depends on its position.",
            example:
              "In 245, the 2 means 200, the 4 means 40, and the 5 means 5.",
            question:
              "What is the value of the digit 4 in 245?",
            options: [
              "4",
              "40",
              "400",
              "4000"
            ],
            answer: 1,
            explanationAfter:
              "The 4 is in the tens place, so its value is 40."
          }
        ]
      }
    ],

    middle: [
      {
        chapter: "Integers",
        lessons: [
          {
            title: "Adding Integers",
            topic: "Positive and negative numbers",
            explanation:
              "Integers include positive numbers, negative numbers and zero. When adding integers with the same sign, add their absolute values and keep the sign.",
            example:
              "(-4) + (-3) = -7 because both numbers are negative.",
            question:
              "What is (-8) + 5?",
            options: [
              "-13",
              "-3",
              "3",
              "13"
            ],
            answer: 1,
            explanationAfter:
              "Start at -8 and move 5 places toward zero. You reach -3."
          }
        ]
      },

      {
        chapter: "Algebra",
        lessons: [
          {
            title: "Simple Algebraic Expressions",
            topic: "Variables and expressions",
            explanation:
              "A variable represents an unknown value. An algebraic expression combines numbers, variables and operations.",
            example:
              "If x = 4, then 3x + 2 = 3(4) + 2 = 14.",
            question:
              "If x = 5, what is 2x + 3?",
            options: [
              "8",
              "10",
              "13",
              "15"
            ],
            answer: 2,
            explanationAfter:
              "Substitute 5 for x: 2 × 5 + 3 = 13."
          }
        ]
      }
    ],

    secondary: [
      {
        chapter: "Real Numbers",
        lessons: [
          {
            title: "Rational and Irrational Numbers",
            topic: "Number classification",
            explanation:
              "A rational number can be written as p/q where p and q are integers and q is not zero. Irrational numbers cannot be written in that form.",
            example:
              "1/2 and 3 are rational. √2 is irrational.",
            question:
              "Which of the following is irrational?",
            options: [
              "0.5",
              "3/4",
              "√2",
              "2"
            ],
            answer: 2,
            explanationAfter:
              "√2 cannot be expressed as a ratio of two integers, so it is irrational."
          }
        ]
      }
    ]

  },

  Science: {

    middle: [
      {
        chapter: "Life Processes",
        lessons: [
          {
            title: "Photosynthesis",
            topic: "How plants make food",
            explanation:
              "Photosynthesis is the process by which green plants use light energy to make food from carbon dioxide and water.",
            example:
              "Leaves contain chlorophyll, which absorbs light energy needed for photosynthesis.",
            question:
              "Which pigment absorbs most of the light energy used in photosynthesis?",
            options: [
              "Haemoglobin",
              "Chlorophyll",
              "Melanin",
              "Keratin"
            ],
            answer: 1,
            explanationAfter:
              "Chlorophyll is the green pigment that absorbs light energy for photosynthesis."
          }
        ]
      }
    ],

    secondary: [
      {
        chapter: "Motion",
        lessons: [
          {
            title: "Speed and Velocity",
            topic: "Describing motion",
            explanation:
              "Speed tells us how quickly an object covers distance. Velocity also includes the direction of motion.",
            example:
              "A car travelling 60 km in 2 hours has an average speed of 30 km/h.",
            question:
              "What is the average speed of an object that travels 100 m in 20 s?",
            options: [
              "2 m/s",
              "5 m/s",
              "20 m/s",
              "2000 m/s"
            ],
            answer: 1,
            explanationAfter:
              "Average speed = distance ÷ time = 100 ÷ 20 = 5 m/s."
          }
        ]
      }
    ]

  },

  English: {

    junior: [
      {
        chapter: "Reading Skills",
        lessons: [
          {
            title: "Finding the Main Idea",
            topic: "Reading comprehension",
            explanation:
              "The main idea is the most important point the writer wants the reader to understand.",
            example:
              "If a paragraph explains why trees are important for clean air, its main idea may be the importance of trees.",
            question:
              "What does the main idea tell us?",
            options: [
              "The least important detail",
              "The central point",
              "Only the first word",
              "The punctuation"
            ],
            answer: 1,
            explanationAfter:
              "The main idea is the central point of a passage."
          }
        ]
      }
    ]

  }

};


/*
  Returns the correct curriculum level for the
  student's grade.
*/

function getCurriculumLevel() {

  if (Number(app.grade) <= 5) {
    return "junior";
  }

  if (Number(app.grade) <= 8) {
    return "middle";
  }

  return "secondary";

}


/*
  Returns lessons for the selected student profile.
*/

function getSubjectCurriculum(subjectName) {

  const subjectData =
    starterCurriculum[subjectName];

  if (!subjectData) {
    return [];
  }

  const level =
    getCurriculumLevel();

  return subjectData[level] || [];

}


/*
  Open a subject WITHOUT giving XP.
*/

function openSubject(subjectName) {

  app.currentSubject =
    subjectName;

  saveData();

  learningSubjectTitle.textContent =
    subjectName;

  learningProfileSummary.textContent =
    `Grade ${app.grade} • ${app.board}${
      app.stream ? ` • ${app.stream}` : ""
    }`;

  learningProfileLabel.textContent =
    `${subjectName} • Grade ${app.grade}`;

  chapterListSection.hidden = false;

  lessonSection.hidden = true;

  renderChapterList(subjectName);

  showScreen(learningScreen);

}


/*
  Render chapters.
*/

function renderChapterList(subjectName) {

  chapterList.innerHTML = "";

  const chapters =
    getSubjectCurriculum(subjectName);

  if (!chapters.length) {

    chapterList.innerHTML = `
      <div class="lesson-card">
        <h3>Learning content is being prepared</h3>
        <p>
          BrainBox does not award XP for opening a subject.
          New lessons will appear here when curriculum
          content is available for this grade and subject.
        </p>
      </div>
    `;

    return;

  }

  chapters.forEach((chapter, chapterIndex) => {

    const completedCount =
      chapter.lessons.filter(
        lesson =>
          isLessonCompleted(
            subjectName,
            chapterIndex,
            lesson.title
          )
      ).length;

    const card =
      document.createElement("button");

    card.type = "button";

    card.className =
      "chapter-card";

    card.innerHTML = `
      <div>
        <div class="lesson-badge">
          CHAPTER ${chapterIndex + 1}
        </div>

        <h3>${chapter.chapter}</h3>

        <p>
          ${completedCount}/${chapter.lessons.length}
          lessons completed
        </p>
      </div>

      <span>→</span>
    `;

    card.addEventListener("click", () => {

      openChapter(
        subjectName,
        chapterIndex
      );

    });

    chapterList.appendChild(card);

  });

}


/*
  Open a chapter.
*/

function openChapter(
  subjectName,
  chapterIndex
) {

  const chapters =
    getSubjectCurriculum(subjectName);

  const chapter =
    chapters[chapterIndex];

  if (!chapter) return;

  chapterListSection.hidden = true;

  lessonSection.hidden = false;

  const savedLesson =
    getSavedLessonIndex(
      subjectName,
      chapterIndex
    );

  openLesson(
    subjectName,
    chapterIndex,
    savedLesson
  );

}


/*
  Open a lesson.
*/

function openLesson(
  subjectName,
  chapterIndex,
  lessonIndex
) {

  const chapters =
    getSubjectCurriculum(subjectName);

  const chapter =
    chapters[chapterIndex];

  if (!chapter) return;

  const lesson =
    chapter.lessons[lessonIndex];

  if (!lesson) return;

  app.currentSubject =
    subjectName;

  app.currentChapter =
    chapterIndex;

  app.currentLesson =
    lessonIndex;

  app.lessonPracticePassed =
    false;

  lessonSubjectLabel.textContent =
    subjectName.toUpperCase();

  lessonTitle.textContent =
    lesson.title;

  lessonTopic.textContent =
    lesson.topic;

  lessonProgressText.textContent =
    `Lesson ${lessonIndex + 1} of ${chapter.lessons.length}`;

  lessonProgressBar.style.width =
    `${((lessonIndex + 1) / chapter.lessons.length) * 100}%`;

  lessonConceptTitle.textContent =
    lesson.topic;

  lessonExplanation.innerHTML =
    `<p>${lesson.explanation}</p>`;

  lessonExample.innerHTML =
    `<p>${lesson.example}</p>`;

  practiceQuestion.textContent =
    lesson.question;

  practiceFeedback.textContent =
    "";

  completeLessonButton.disabled =
    true;

  renderPracticeOptions(
    lesson
  );

  saveData();

}


/*
  Practice question.

  Answering incorrectly gives no reward.
*/

function renderPracticeOptions(lesson) {

  practiceOptions.innerHTML = "";

  lesson.options.forEach(
    (option, optionIndex) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "practice-option";

      button.textContent =
        option;

      button.addEventListener(
        "click",
        () => {

          const allOptions =
            practiceOptions.querySelectorAll(
              ".practice-option"
            );

          allOptions.forEach(
            item => {
              item.disabled = true;
            }
          );

          if (
            optionIndex ===
            lesson.answer
         )  {

            app.totalCorrectAnswers =
              Number(
                app.totalCorrectAnswers || 0
              ) + 1;

            checkAchievements();

            saveData();

            app.lessonPracticePassed =
              true;

            app.lessonPracticePassed =
              true;

            practiceFeedback.innerHTML = `
              <strong>Correct! ✓</strong>
              <p>
                ${lesson.explanationAfter}
              </p>
            `;

            completeLessonButton.disabled =
              false;

            showToast(
              "Correct answer. Finish the lesson to earn XP.",
              "🧠"
            );

          } else {

            practiceFeedback.innerHTML = `
              <strong>Not quite.</strong>
              <p>
                Review the explanation above,
                then try the question again.
              </p>
            `;

            allOptions.forEach(
              item => {
                item.disabled = false;
              }
            );

          }

        }
      );

      practiceOptions.appendChild(button);

    }
  );

}


/*
  Complete a lesson.

  THIS is where XP is earned.
*/

completeLessonButton.addEventListener(
  "click",
  () => {

    if (!app.lessonPracticePassed) {
      return;
    }

    const subjectName =
      app.currentSubject;

    const chapterIndex =
      app.currentChapter;

    const lessonIndex =
      app.currentLesson;

    markLessonCompleted(
      subjectName,
      chapterIndex,
      lessonIndex
    );

    app.studyMinutes += 5;

    addXP(
      25,
      "Lesson completed"
    );

    updateLearningProgress();

    checkAchievements();

    saveData();

    showToast(
      "Lesson completed! +25 XP",
      "🎓"
    );

    const chapters =
      getSubjectCurriculum(
        subjectName
      );

    const chapter =
      chapters[chapterIndex];

    const nextLessonIndex =
      lessonIndex + 1;

    if (
      chapter &&
      nextLessonIndex <
      chapter.lessons.length
    ) {

      openLesson(
        subjectName,
        chapterIndex,
        nextLessonIndex
      );

    } else {

      renderChapterList(
        subjectName
      );

      chapterListSection.hidden =
        false;

      lessonSection.hidden =
        true;

    }

  }
);


/*
  Save completed lessons.
*/

function markLessonCompleted(
  subjectName,
  chapterIndex,
  lessonIndex
) {

  if (!Array.isArray(app.completedLessons)) {
    app.completedLessons = [];
  }

  const key =
    `${subjectName}|${chapterIndex}|${lessonIndex}`;

  if (
    !app.completedLessons.includes(key)
  ) {

    app.completedLessons.push(key);

  }

}


/*
  Check lesson completion.
*/

function isLessonCompleted(
  subjectName,
  chapterIndex,
  lessonTitle
) {

  const chapters =
    getSubjectCurriculum(
      subjectName
    );

  const chapter =
    chapters[chapterIndex];

  if (!chapter) return false;

  const lessonIndex =
    chapter.lessons.findIndex(
      lesson =>
        lesson.title === lessonTitle
    );

  if (lessonIndex === -1) {
    return false;
  }

  const key =
    `${subjectName}|${chapterIndex}|${lessonIndex}`;

  return Array.isArray(
    app.completedLessons
  ) &&
  app.completedLessons.includes(key);

}


/*
  Resume the last lesson.
*/

function resumeLearning() {

  if (
    app.currentSubject &&
    Number.isInteger(
      app.currentChapter
    ) &&
    Number.isInteger(
      app.currentLesson
    )
  ) {

    openSubject(
      app.currentSubject
    );

    setTimeout(() => {

      openChapter(
        app.currentSubject,
        app.currentChapter
      );

    }, 0);

    return;

  }

  const firstSubject =
    getRecommendedSubject();

  if (firstSubject) {

    openSubject(firstSubject);

  } else {

    showToast(
      "Choose a subject to start learning.",
      "📚"
    );

  }

}


function getRecommendedSubject() {

  const firstCard =
    subjectsGrid.querySelector(
      ".subject-card"
    );

  if (!firstCard) return "";

  const name =
    firstCard.querySelector(
      "strong"
    );

  return name
    ? name.textContent
    : "";

}


backToDashboardButton.addEventListener(
  "click",
  () => {

    showScreen(
      dashboardScreen
    );

  }
);


backToChaptersButton.addEventListener(
  "click",
  () => {

    chapterListSection.hidden =
      false;

    lessonSection.hidden =
      true;

    renderChapterList(
      app.currentSubject
    );

  }
);

function updateLearningProgress() {

  const completed =
    getCompletedLessonCount();

  const total =
    getTotalAvailableLessons();

  if (
    goalValue
  ) {

    goalValue.textContent =
      Number(
        app.todayStudyMinutes || 0
      );

  }

  if (
    streakValue
  ) {

    streakValue.textContent =
      Number(
        app.streak || 0
      );

  }

  if (
    achievementCount
  ) {

    achievementCount.textContent =
      Array.isArray(
        app.unlockedAchievements
      )
        ? app.unlockedAchievements.length
        : 0;

  }

  const nextXP =
    getXPForNextLevel();

  const xpNextLabel =
    document.getElementById(
      "xpNextLabel"
    );

  if (xpNextLabel) {

    xpNextLabel.textContent =
      `${nextXP} XP to reach Level ${app.level + 1}`;

  }

}


function getTotalAvailableLessons() {

  let total = 0;

  const visibleSubjects =
    Array.from(
      subjectsGrid.querySelectorAll(
        ".subject-card"
      )
    );

  visibleSubjects.forEach(card => {

    const name =
      card.querySelector(
        "strong"
      )?.textContent;

    if (!name) return;

    getSubjectCurriculum(name)
      .forEach(chapter => {

        total +=
          chapter.lessons.length;

      });

  });

  return total;

}


/* =========================================
   ENERGY SYSTEM
========================================= */

function addXP(amount, reason = "Learning activity completed") {

  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  app.energy =
    Math.max(
      0,
      Number(app.energy || 0) + amount
    );

  updateLevel();

  updateEnergy();

  saveData();

}


function updateLevel() {

  const xp =
    Number(app.energy || 0);

  /*
    Every 100 XP = one level.
  */

  app.level =
    Math.floor(xp / 100) + 1;

}


function getXPForNextLevel() {

  return (
    (app.level * 100) -
    Number(app.energy || 0)
  );

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

    addXP(5);

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


/* =========================================
   DAILY LEARNING TRACKING
========================================= */

function getTodayKey() {

  const now =
    new Date();

  return now.toISOString()
    .slice(0, 10);

}


function getYesterdayKey() {

  const date =
    new Date();

  date.setDate(
    date.getDate() - 1
  );

  return date.toISOString()
    .slice(0, 10);

}


function prepareDailyState() {

  const today =
    getTodayKey();

  if (
    app.lastDailyReset !== today
  ) {

    app.todayStudyMinutes = 0;

    app.todayCorrectAnswers = 0;

    app.dailyGoalCompleted = false;

    app.lastDailyReset =
      today;

    saveData();

  }

}


function recordStudyActivity(
  minutes,
  dateKey = getTodayKey()
) {

  prepareDailyState();

  app.studyMinutes =
    Number(app.studyMinutes || 0) +
    minutes;

  if (
    dateKey === getTodayKey()
  ) {

    app.todayStudyMinutes =
      Number(
        app.todayStudyMinutes || 0
      ) + minutes;

  }

  updateStreak(dateKey);

  updateLearningProgress();

}


function updateStreak(dateKey) {

  if (
    app.lastStudyDate === dateKey
  ) {
    return;
  }

  if (
    app.lastStudyDate ===
    getYesterdayKey()
  ) {

    app.streak =
      Number(app.streak || 0) + 1;

  } else {

    app.streak = 1;

  }

  app.bestStreak =
    Math.max(
      Number(app.bestStreak || 0),
      app.streak
    );

  app.lastStudyDate =
    dateKey;

}


function checkDailyGoal() {

  prepareDailyState();

  if (
    Number(app.todayStudyMinutes || 0) >=
    Number(app.dailyGoal || 30)
  ) {

    if (!app.dailyGoalCompleted) {

      app.dailyGoalCompleted =
        true;

      addXP(
        20,
        "Daily learning goal completed"
      );

      showToast(
        "Daily goal reached! +20 XP",
        "🎯"
      );

    }

  }

}

function completeFocusSession() {

  stopTimer();

  const today =
    getTodayKey();

  recordStudyActivity(
    15,
    today
  );

  addXP(
    10,
    "15-minute focus session"
  );

  checkDailyGoal();

  checkAchievements();

  app.timerSeconds =
    15 * 60;

  updateTimer();

  updateLearningProgress();

  saveData();

  showToast(
    "15-minute focus session complete! +10 XP",
    "⏱️"
  );

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

      /* PROFILE */

      name: app.name,
      grade: app.grade,
      board: app.board,
      stream: app.stream,

      /* XP / LEVEL */

      energy: app.energy,
      level: app.level,

      /* LEARNING */

      currentSubject:
        app.currentSubject || "",

      currentChapter:
        Number.isInteger(app.currentChapter)
          ? app.currentChapter
          : null,

      currentLesson:
        Number.isInteger(app.currentLesson)
          ? app.currentLesson
          : null,

      completedLessons:
        Array.isArray(app.completedLessons)
          ? app.completedLessons
          : [],

      /* STUDY */

      studyMinutes:
        Number(app.studyMinutes || 0),

      todayStudyMinutes:
        Number(app.todayStudyMinutes || 0),

      dailyGoal:
        Number(app.dailyGoal || 30),

      dailyGoalCompleted:
        Boolean(app.dailyGoalCompleted),

      /* STREAK */

      streak:
        Number(app.streak || 0),

      bestStreak:
        Number(app.bestStreak || 0),

      lastStudyDate:
        app.lastStudyDate || "",

      lastDailyReset:
        app.lastDailyReset || "",

      /* ACHIEVEMENTS */

      unlockedAchievements:
        Array.isArray(
          app.unlockedAchievements
        )
          ? app.unlockedAchievements
          : [],

      /* QUIZZES */

      quizBestScores:
        app.quizBestScores || {}

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

    app.dailyGoal = 30;

    return;

  }

  try {

    const data =
      JSON.parse(saved);

    Object.assign(
      app,
      data
    );

    /*
      Defaults for users coming from the
      older version of BrainBox.
    */

    app.energy =
      Number(app.energy || 0);

    app.level =
      Number(app.level || 1);

    app.streak =
      Number(app.streak || 0);

    app.bestStreak =
      Number(app.bestStreak || 0);

    app.studyMinutes =
      Number(app.studyMinutes || 0);

    app.todayStudyMinutes =
      Number(app.todayStudyMinutes || 0);

    app.dailyGoal =
      Number(app.dailyGoal || 30);

    if (
      !Array.isArray(
        app.completedLessons
      )
    ) {

      app.completedLessons = [];

    }

    if (
      !Array.isArray(
        app.unlockedAchievements
      )
    ) {

      app.unlockedAchievements = [];

    }

    if (
      !app.quizBestScores
    ) {

      app.quizBestScores = {};

    }

    prepareDailyState();

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

    console.error(
      "Could not load saved BrainBox data.",
      error
    );

    localStorage.removeItem(
      "brainboxData"
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

      resumeLearning();

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
