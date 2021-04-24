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

function criarQuizz() {
    let tela1 = document.querySelector(".tela1");
    let tela3 = document.querySelector(".tela3");

    tela1.classList.add("oculto");
    tela3.classList.remove("oculto");
}

function criarPerguntas() {
    let comeco = document.querySelector(".comeco-quiz");
    let perguntas = document.querySelector(".perguntas");

    comeco.classList.add("oculto");
    perguntas.classList.remove("oculto");
}

function criarNiveis() {
    let niveis = document.querySelector(".niveis");
    let perguntas = document.querySelector(".perguntas");

    perguntas.classList.add("oculto");
    niveis.classList.remove("oculto");
}

function finalizarQuiz() {
    let niveis = document.querySelector(".niveis");
    let final = document.querySelector(".finalizar");

    niveis.classList.add("oculto");
    final.classList.remove("oculto");
}

aoEntrarNaPagina();