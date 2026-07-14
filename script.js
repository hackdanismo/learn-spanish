// Add new lesson objects here to extend the app.
// Use "___" exactly once in each sentence to mark the missing word.
const lessons = [
    {
      sentence: "Yo ___ café por la mañana.",
      answer: "bebo",
      choices: ["bebo", "comes", "vive", "somos"],
      translation: "I drink coffee in the morning."
    },
    {
      sentence: "Ella ___ en Madrid.",
      answer: "vive",
      choices: ["viven", "vive", "hablo", "bebes"],
      translation: "She lives in Madrid."
    },
    {
      sentence: "Nosotros ___ estudiantes.",
      answer: "somos",
      choices: ["están", "eres", "somos", "soy"],
      translation: "We are students."
    },
    {
      sentence: "¿Tú ___ español?",
      answer: "hablas",
      choices: ["hablas", "habla", "hablamos", "hablan"],
      translation: "Do you speak Spanish?"
    },
    {
      sentence: "Mis amigos ___ en el parque.",
      answer: "corren",
      choices: ["corre", "corres", "corremos", "corren"],
      translation: "My friends run in the park."
    },
    {
      sentence: "La comida ___ deliciosa.",
      answer: "está",
      choices: ["está", "estoy", "están", "eres"],
      translation: "The food is delicious."
    }
  ];
  
  const sentenceElement = document.querySelector("#sentence");
  const optionsElement = document.querySelector("#wordOptions");
  const feedbackElement = document.querySelector("#feedback");
  const translationPanel = document.querySelector("#translationPanel");
  const translationText = document.querySelector("#translationText");
  const nextButton = document.querySelector("#nextButton");
  const resetButton = document.querySelector("#resetButton");
  const questionNumber = document.querySelector("#questionNumber");
  const progressText = document.querySelector("#progressText");
  const progressBar = document.querySelector("#progressBar");
  const scoreValue = document.querySelector("#scoreValue");
  
  let currentLessonIndex = 0;
  let score = 0;
  let isAnswered = false;
  
  function renderLesson() {
    const lesson = lessons[currentLessonIndex];
    const [beforeBlank, afterBlank] = lesson.sentence.split("___");
  
    isAnswered = false;
    nextButton.disabled = true;
    nextButton.textContent = currentLessonIndex === lessons.length - 1 ? "Finish" : "Next sentence";
  
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    translationPanel.hidden = true;
    translationText.textContent = "";
  
    sentenceElement.innerHTML = "";
    sentenceElement.append(document.createTextNode(beforeBlank));
  
    const blank = document.createElement("span");
    blank.className = "blank";
    blank.textContent = "_____";
    sentenceElement.append(blank);
    sentenceElement.append(document.createTextNode(afterBlank));
  
    optionsElement.innerHTML = "";
    lesson.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "word-card";
      button.textContent = choice;
      button.addEventListener("click", () => checkAnswer(choice, button));
      optionsElement.append(button);
    });
  
    questionNumber.textContent = currentLessonIndex + 1;
    progressText.textContent = `${currentLessonIndex + 1} / ${lessons.length}`;
    progressBar.style.width = `${((currentLessonIndex + 1) / lessons.length) * 100}%`;
    scoreValue.textContent = score;
  }
  
  function checkAnswer(selectedWord, selectedButton) {
    if (isAnswered) return;
  
    const lesson = lessons[currentLessonIndex];
    const buttons = [...optionsElement.querySelectorAll("button")];
  
    if (selectedWord === lesson.answer) {
      isAnswered = true;
      score += 1;
      selectedButton.classList.add("correct");
      feedbackElement.textContent = "Correct! Great work.";
      feedbackElement.classList.add("success");
  
      const blank = sentenceElement.querySelector(".blank");
      blank.textContent = lesson.answer;
  
      buttons.forEach((button) => {
        button.disabled = true;
      });
  
      translationText.textContent = lesson.translation;
      translationPanel.hidden = false;
      nextButton.disabled = false;
      scoreValue.textContent = score;
    } else {
      selectedButton.classList.add("incorrect");
      selectedButton.disabled = true;
      feedbackElement.textContent = "Not quite — try another word.";
      feedbackElement.className = "feedback error";
    }
  }
  
  function goToNextLesson() {
    if (!isAnswered) return;
  
    if (currentLessonIndex < lessons.length - 1) {
      currentLessonIndex += 1;
      renderLesson();
      return;
    }
  
    showCompletionScreen();
  }
  
  function showCompletionScreen() {
    sentenceElement.textContent = `You completed all ${lessons.length} sentences!`;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = `Final score: ${score} / ${lessons.length}`;
    feedbackElement.className = "feedback success";
    translationPanel.hidden = true;
    nextButton.disabled = true;
    nextButton.textContent = "Completed";
    progressText.textContent = `${lessons.length} / ${lessons.length}`;
    progressBar.style.width = "100%";
  }
  
  function resetApp() {
    currentLessonIndex = 0;
    score = 0;
    renderLesson();
  }
  
  nextButton.addEventListener("click", goToNextLesson);
  resetButton.addEventListener("click", resetApp);
  
  renderLesson();
  