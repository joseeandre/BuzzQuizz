let quizzes = [];
let quizzesHTML = document.querySelector(".todos-quizzes").querySelector(".quizzes");
let meusquizzesHTML = document.querySelector(".meus-quizzes").querySelector(".quizzes");

function aoEntrarNaPagina() {
    meusQuizzes();
    carregarQuizzes();
}

function meusQuizzes() {
    let criarQuiz = document.querySelector(".criar-quiz");
    let meuQuiz = document.querySelector(".meus-quizzes");
    if (localStorage != null) {
        criarQuiz.style.display = "none";
        meuQuiz.classList.remove("oculto");
    }
}

function carregarQuizzes() {
    let promessa;
    promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");
    promessa.then(processarQuizzes);
}

function processarQuizzes(resposta) {
    let foto;
    let titulo;
    let novoQuizz;

    quizzes = resposta.data;

    for (let i = 0; i < quizzes.length; i++) {
        foto = quizzes[i].image;
        titulo = quizzes[i].title;
        id = quizzes[i].id;
        novoQuizz = '<div class="quiz"><img src=' + foto + ' alt=""><div class="legenda-quiz">' + titulo + '</div><div class="gradiente"></div></div>'

        if (localStorage.getItem(id.toString()) != null) {
            meusquizzesHTML.innerHTML += novoQuizz;
        } else {
            quizzesHTML.innerHTML += novoQuizz;
        }
    }
}


aoEntrarNaPagina();