const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript"
    },
    {
        question: "What is 8 + 5?",
        options: ["10", "11", "12", "13"],
        answer: "13"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "Who wrote '1984'?",
        options: ["J.K. Rowling", "George Orwell", "Shakespeare", "Mark Twain"],
        answer: "George Orwell"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let shuffledQuestions = shuffleArray([...questions]);

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time-left").innerText = timeLeft;

    if (currentQuestionIndex >= shuffledQuestions.length) {
        showResults();
        return;
    }

    let questionObj = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;

    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    shuffleArray(questionObj.options).forEach(option => {
        let button = document.createElement("button");
        button.classList.add("btn", "btn-light", "btn-option", "mt-2");
        button.innerText = option;
        button.onclick = () => checkAnswer(button, questionObj.answer);
        optionsContainer.appendChild(button);
    });

    document.getElementById("next-btn").style.display = "none";
    document.getElementById("next-btn").disabled = true;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time-left").innerText = timeLeft;
        } else {
            autoFail();
        }
    }, 1000);

    updateProgressBar();
}

function checkAnswer(button, correctAnswer) {
    clearInterval(timer);
    document.getElementById("correct-sound").play();

    let buttons = document.querySelectorAll(".btn-option");
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correctAnswer) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("wrong");
        }
    });

    if (button.innerText === correctAnswer) {
        score++;
    } else {
        document.getElementById("wrong-sound").play();
    }

    document.getElementById("next-btn").style.display = "block";
    document.getElementById("next-btn").disabled = false;
}

function autoFail() {
    document.getElementById("wrong-sound").play();
    document.querySelectorAll(".btn-option").forEach(btn => {
        btn.disabled = true;
        btn.classList.add("wrong");
    });

    document.getElementById("next-btn").style.display = "block";
    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    document.getElementById("quiz-container").classList.add("d-none");
    document.getElementById("result-container").classList.remove("d-none");
    document.getElementById("score").innerText = score;
    if (score >= 4) {
        startConfetti();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffledQuestions = shuffleArray([...questions]);
    document.getElementById("quiz-container").classList.remove("d-none");
    document.getElementById("result-container").classList.add("d-none");
    loadQuestion();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function updateProgressBar() {
    let progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}

document.getElementById("theme-toggle").onclick = () => {
    document.body.classList.toggle("dark-mode");
};

document.addEventListener("DOMContentLoaded", loadQuestion);
