let quizzlist
const isQuestionInBlank = [true,true]
getQuizzList()
function getQuizzList(){
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
    promise.then(loadQuizzes)
    promise.catch(quizzesError)
}

function loadQuizzes(reply){
    quizzlist = reply.data
    
}

function writeQuizz(quizzId){
    let selectedQuizz
    const quizz = document.querySelector(".quizz")
    quizz.classList.remove("hidden")
    const questions = quizz.querySelector(".questions")
    questions.innerHTML = ""
    for(let i = 0; i < quizzlist.length; i++){
        if(parseInt(quizzId) === quizzlist[i].id){
            selectedQuizz = quizzlist[i]
        }
    }
    quizz.querySelector(".quizz-image").style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${selectedQuizz.image})`
    for(let i = 0; i < selectedQuizz.questions.length; i++){
        questions.innerHTML += `<div class="question" id="${i}">
                                    <div class="title" style="background-color:${selectedQuizz.questions[i].color}">${selectedQuizz.questions[i].title}</div>
                                    <div class="option" onclick="selectOption(this)">
                                        <img src=${selectedQuizz.questions[i].answers[0].image} />
                                        <div class="answer">${selectedQuizz.questions[i].answers[0].text}</div>
                                    </div>
                                    <div class="option" onclick="selectOption(this)">
                                        <img src=${selectedQuizz.questions[i].answers[1].image} />
                                        <div class="answer">${selectedQuizz.questions[i].answers[1].text}</div>
                                    </div>
                                    <div class="option" onclick="selectOption(this)">
                                        <img src=${selectedQuizz.questions[i].answers[2].image} />
                                        <div class="answer">${selectedQuizz.questions[i].answers[2].text}</div>
                                    </div>
                                    <div class="option" onclick="selectOption(this)">
                                        <img src=${selectedQuizz.questions[i].answers[3].image} />
                                        <div class="answer">${selectedQuizz.questions[i].answers[3].text}</div>
                                    </div>
                                </div>`
    
    }
}

function generateQuestion(){

}

function quizzesError(){
    alert("Não foi possível obter os quizzes !")
    location.reload()
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
        }
        option.classList.remove("blurry")
    }
    isQuestionInBlank[id] = false
}
