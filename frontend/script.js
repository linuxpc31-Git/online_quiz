const questions = [
    {
        question: "1) What is the correct file extension for Python files?",
        image: "https://via.placeholder.com/200",
        options: ["A. .pyth", "B. .pt", "C. .py", "D. .pyt"],
        answer: 2
    },
    {
        question: "2) Which keyword is used to define a function in Python?",
        image: "https://via.placeholder.com/200",
        options: ["A. func", "B. def", "C. function", "D. define"],
        answer: 1
    },
    {
        question: "3) What will be the output of print(2 + 3 * 4)?",
        image: "https://via.placeholder.com/200",
        options: ["A. 20", "B. 14", "C. 24", "D. 18"],
        answer: 1
    },
    {
        question: "4) Which of the following is a correct way to create a list in Python?",
        image: "https://via.placeholder.com/200",
        options: ["A. {1,2,3}", "B. <1,2,3>", "C. (1,2,3)", "D. [1, 2, 3]"],
        answer: 3
    },
    {
        question: "5) How do you insert comments in Python code?",
        image: "https://via.placeholder.com/200",
        options: ["A. // comment", "B. # comment", "C. /* comment */", "D. <!-- comment -->"],
        answer: 1
    },
    {
        question: "6) Which of these is used to take input from the user in Python?",
        image: "https://via.placeholder.com/200",
        options: ["A. input()", "B. scan()", "C. get()", "D. ask()"],
        answer: 0
    },
    {
        question: "7) What is the correct way to create a variable with the numeric value 5?",
        image: "https://via.placeholder.com/200",
        options: ["A. x = 5", "B. x == 5", "C. int x = 5", "D. num = int"],
        answer: 0
    },
    {
        question: "8) What is the output of print(len(\"Hello\"))?",
        image: "https://via.placeholder.com/200",
        options: ["A. 4", "B. 5", "C. 6", "D. Error"],
        answer: 1
    },
    {
        question: "9) Which of the following is NOT a Python keyword?",
        image: "https://via.placeholder.com/200",
        options: ["A. True", "B. False", "C. Then", "D. None"],
        answer: 2
    },
    {
        question: "10) What symbol is used to multiply numbers in Python?",
        image: "https://via.placeholder.com/200",
        options: ["A. &", "B. x", "C. *", "D. %"],
        answer: 2
    },
];

    // Add up to 10 questions like above


let currentQuestion = 0;
let score = 0;

if (document.getElementById("question")) {
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;
    document.getElementById("questionImage").src = q.image;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(index) {
    if (index === questions[currentQuestion].answer) {
        score++;
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < 10) {
        loadQuestion();
    } else {
        localStorage.setItem("score", score);
        sendResultToBackend();
        window.location.href = "result.html";
    }
}

function sendResultToBackend() {
    fetch("http://localhost:5000/save_user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            score: score
        })
    });
}

if (document.getElementById("resultChart")) {
    const scoreValue = localStorage.getItem("score");
    const ctx = document.getElementById("resultChart");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Correct", "Wrong"],
            datasets: [{
                data: [scoreValue, 10 - scoreValue],
                backgroundColor: ["#1cc88a", "#e74a3b"]
            }]
        }
    });
}
