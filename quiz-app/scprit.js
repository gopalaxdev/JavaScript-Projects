
const quizData = [
    {
        question: "Who is the president of India?",
        a: 'Rohan',
        b: 'Virat Kohli',
        c: 'Modi ji',
        d: 'Kovind',
        answer: 'd'
    }, {
        question: "Who plays best cricket?",
        a: 'MS Dhoni',
        b: 'Virat Kohli',
        c: 'Modi ji',
        d: 'Arvind Kejriwal',
        answer: 'b'
    }, {
        question: "HTML stands for?",
        a: 'Hypertext Markup Language',
        b: 'Hydo Truks Motor Limited',
        c: 'Hello Tam Must Lie',
        d: 'Hey Tam Mister Lamp',
        answer: 'a'
    }
]

// Get elements by id
var radios = document.getElementsByName("answer");
const question = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

//intialize variable before the call
var currentQuiz = 0;

var score = 0;
// call loadQuiz
loadQuiz();



function loadQuiz() {

    deselectRadio();
    // console.log(quizData[currentQuiz].a);
    question.innerHTML = quizData[currentQuiz].question;
    a_text.innerHTML = quizData[currentQuiz].a;
    b_text.innerHTML = quizData[currentQuiz].b;
    c_text.innerHTML = quizData[currentQuiz].c;
    d_text.innerHTML = quizData[currentQuiz].d;

}


function deselectRadio() {
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }


}


function submitQuiz() {


    for (let i = 0; i < radios.length; i++) {

        if (radios[i].checked) {

            if (radios[i].id === quizData[currentQuiz].answer) {
                score++;
            } currentQuiz++;
            if (currentQuiz < quizData.length) {


                loadQuiz();
            }
            else {
                alert(score);
            }
        }
    }



}

// Adding EventListener to the button
const btn = document.querySelector(".btn");
btn.addEventListener("click", submitQuiz);