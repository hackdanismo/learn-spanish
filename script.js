/* 
 * Add new lesson objects here to extend the application.
 * Use "___" exactly once in each sentence to mark the missing word.
 */
const lessons = [
    {
        sentence: "Yo ___ cafe por la manana.",
        answer: "bebo",
        choices: ["bebo", "comes", "vive", "somos"],
        translation: "I drink coffee in the morning."
    },
];

const sentenceElement = document.querySelector("#sentence");
const optionsElement = document.querySelector("#wordOptions");
const feedbackElement = document.querySelector("#feedback");
const translationPanel = document.querySelector("#translationPanel");
const translationText = document.querySelector("#translationText");

let currentLessonIndex = 0;
let score = 0;
let isAnswered = false;

function renderLesson() {
    const lesson = lessons[currentLessonIndex];
    const [beforeBlank, afterBlank] = lesson.sentence.split("___");

    isAnswered = false;

    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    translationPanel.hidden = true;
    translationText.textContent = "";

    sentenceElement.innerHTML = "";
    sentenceElement.append(document.createTextNode(beforeBlank));

    const blank = document.createElement("span");
    blank.className = "blank";
    blank.textContent = "___";
    sentenceElement.append(blank);
    sentenceElement.append(document.createTextNode(afterBlank));

    optionsElement.innerHTML = "";
    lesson.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.type="button";
        button.className="word-card";
        button.textContent = choice;
        button.addEventListener("click", () => checkAnswer(choice, button));
        optionsElement.append(button);
    });
}
