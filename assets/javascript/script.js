let quizzes = [];
let quizzesHTML = document.querySelector(".quizzes");

function aoEntrarNaPagina() {
    carregarQuizzes();
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
        novoQuizz = '<div class="quiz"><img src=' + foto + ' alt=""><div class="legenda-quiz">' + titulo + '</div></div>'

        quizzesHTML.innerHTML += novoQuizz;
    }
}

aoEntrarNaPagina();