let quizzes = [];
let quizzesHTML = document.querySelector(".todos-quizzes").querySelector(".quizzes");
let meusquizzesHTML = document.querySelector(".meus-quizzes").querySelector(".quizzes");
let perguntasQuizz = document.querySelector(".perguntas");
let caixasQuizz = perguntasQuizz.querySelector(".informacoes")
let qtdPerguntas;
let qtdNiveis;
let tituloQuiz;
let urlQuiz;
let objetoQuizz;

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

        if (localStorage.getItem(id.toString()) === null) {
            quizzesHTML.innerHTML += novoQuizz;
        }
    }

    if (localStorage != null) {
        for (let i = 0; i < localStorage.length; i++) {
            let meuQuizz = localStorage.getItem(localStorage.key(i));
            meuQuizz = JSON.parse(meuQuizz);
            foto = meuQuizz.image;
            titulo = meuQuizz.title;
            novoQuizz = '<div class="quiz"><img src=' + foto + ' alt=""><div class="legenda-quiz">' + titulo + '</div><div class="gradiente"></div></div>'

            meusquizzesHTML.innerHTML += novoQuizz;
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
    qtdPerguntas = document.getElementById("qtd-perguntas").value;
    qtdNiveis = document.getElementById("qtd-niveis").value;
    tituloQuiz = document.getElementById("titulo-quiz").value;
    urlQuiz = document.getElementById("url-quiz").value;
    qtdPerguntas = parseInt(qtdPerguntas);

    // checar perguntas
    if (qtdPerguntas < 3 || isNaN(qtdPerguntas)) {
        alert("Digite mais de 2 perguntas");
    } else {
        if (tituloQuiz.length < 20 || tituloQuiz.length > 65 || tituloQuiz === null) {
            alert("Digite um titulo entre 20 e 65 caracteres");
        } else {
            if (!validarURL(urlQuiz)) {
                alert("Digite uma url válida");
            } else {
                if (qtdNiveis < 2 || isNaN(qtdNiveis)) {
                    alert("Digite mais de 1 nivel");
                } else {
                    comeco.classList.add("oculto");
                    perguntas.classList.remove("oculto");
                    processarPerguntas();
                }
            }
        }
    }
}

function processarPerguntas() {

    for (let i = 0; i < qtdPerguntas; i++) {
        let novaPergunta;
        let numero = i + 1;
        novaPergunta = '<div class="oculto pergunta" id="p' + i + '"><div class="titulo">Pergunta ' + numero + '</div><input type="text" placeholder="Texto da pergunta"><input type="text" placeholder="Cor de fundo da pergunta"><div class="titulo">Resposta Correta</div><input type="text" placeholder="Resposta correta"><input type="text" placeholder="URL da imagem"><div class="titulo">Respostas Incorretas</div><input type="text" placeholder="Resposta incorreta 1"><input type="text" placeholder="URL da imagem 1"><input type="text" placeholder="Resposta incorreta 2"><input type="text" placeholder="URL da imagem 2"><input type="text" placeholder="Resposta incorreta 3"><input type="text" placeholder="URL da imagem 3"></div><div class="caixa-item" id="p' + i + '"><strong>Pergunta ' + numero + '</strong><ion-icon onclick="abrirPergunta(this)" name="create-outline"></ion-icon></div>';
        caixasQuizz.innerHTML += novaPergunta;
    }
}

function abrirPergunta(pergunta) {
    let caixaPergunta = pergunta.parentNode;
    let perguntaQuiz = document.getElementById(caixaPergunta.id);

    caixaPergunta.style.display = "none";
    perguntaQuiz.classList.remove("oculto");
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

function validarURL(str) {
    var endereco = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!endereco.test(str);
}


// indo para tela 3

aoEntrarNaPagina();