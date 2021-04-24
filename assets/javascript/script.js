let quizzlist
let selectedQuizz
const isQuestionInBlank = []
let comparator = () => Math.random() - 0.5
let getLastElement = (list) => list[list.length - 1]
getQuizzList()


function getQuizzList(){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
    promise.then(loadQuizzes)
    promise.catch(quizzesError)
}

function loadQuizzes(reply){
    quizzlist = reply.data
    
}

function quizzesError(){
    alert("Não foi possível obter os quizzes !")
    location.reload()
}


function showQuizz(quizzId){
    const quizz = document.querySelector(".selected-quizz")
    quizz.classList.remove("hidden")
    const questions = quizz.querySelector(".questions")
    for(let i = 0; i < quizzlist.length; i++){
        if(parseInt(quizzId) === quizzlist[i].id){
            selectedQuizz = quizzlist[i]
        }
    }
    setAllQuestionsInBlank(selectedQuizz)
    questions.innerHTML = ""
    quizz.querySelector(".quizz-image").innerText = selectedQuizz.title
    quizz.querySelector(".quizz-image").style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${selectedQuizz.image})`
    for(let i = 0; i < selectedQuizz.questions.length; i++){
        selectedQuizz.questions[i].answers.sort(comparator)
        let question = selectedQuizz.questions[i]
        questions.innerHTML += writeQuestion(i,question)
    }
    quizz.querySelector(".question").classList.remove("hidden")
}

function writeQuestion(id,question){

    let divQuestion = `<div class="question hidden" id="${id}">
                            <div class="title" style="background-color:${question.color}">${question.title}</div>`
    for(i = 0; i < question.answers.length; i++){
        let answer = question.answers[i]
        divQuestion += writeAnswer(answer)
    }
    divQuestion += `</div>`
    return divQuestion
}

function writeAnswer(answer){
    return `<div class="option" onclick="selectOption(this)">
                <img src=${answer.image} />
                <div class="answer">${answer.text}</div>
            </div>`
}


function setAllQuestionsInBlank(quizz){
    for(let i = 0; i < quizz.questions.length; i++){
        isQuestionInBlank.push(true)
    }
}


function selectOption(option){
    const question = option.parentNode
    const id = parseInt(question.id)
    if(isQuestionInBlank[id]){
        const options = question.querySelectorAll(".option")
        for(let i = 0; i < options.length; i++){
            options[i].classList.add("blurry")
            if(selectedQuizz.questions[id].answers[i].isCorrectAnswer){
                options[i].classList.add("correct-answer")    
            } else{
                options[i].classList.add("wrong-answer")
            }
        }
        option.classList.remove("blurry")

    }
    isQuestionInBlank[id] = false
    setTimeout(scrollToNextQuestion, 2000, question)
}

function scrollToNextQuestion(question){
    const nextQuestion = question.nextElementSibling
    nextQuestion.classList.remove("hidden")
    nextQuestion.scrollIntoView()
}
