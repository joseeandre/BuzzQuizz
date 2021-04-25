let quizzes = [];
let tela1 = document.querySelector(".tela1");
let tela3 = document.querySelector(".tela3");
let quizzesHTML = document.querySelector(".todos-quizzes").querySelector(".quizzes");
let meusquizzesHTML = document.querySelector(".meus-quizzes").querySelector(".quizzes");
let perguntasQuizz = document.querySelector(".perguntas");
let caixasQuizz = perguntasQuizz.querySelector(".informacoes")
let niveisQuizz = document.querySelector(".niveis");
let caixasniveisQuizz = niveisQuizz.querySelector(".informacoes")
let qtdPerguntas;
let qtdNiveis;
let tituloQuiz;
let urlQuiz;
let objetoQuizz;
let questaoQuizz;
let levelQuizz;
let respostasQuizz = [];
let resposta;

let quizzlist;
let selectedQuizz;
let isQuestionInBlank = [];
let numberOfCorrectQuestions = 0;

let comparator = () => Math.random() - 0.5
let getLastElement = (list) => list[list.length - 1]


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
    promessa.catch(quizzesError)
}

function quizzesError() {
    alert("Não foi possível obter os quizzes !")
    location.reload()
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
        novoQuizz = '<div class="quiz" id="' + id + '" onclick="showQuizz(this)"><img src=' + foto + ' alt=""><div class="legenda-quiz">' + titulo + '</div><div class="gradiente"></div></div>'

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
            novoQuizz = '<div class="quiz" id="' + id + '" onclick="showQuizz(this)"><img src=' + foto + ' alt=""><div class="legenda-quiz">' + titulo + '</div><div class="gradiente"></div></div>'

            meusquizzesHTML.innerHTML += novoQuizz;
        }
    }
}

function criarQuizz() {
    let tela1 = document.querySelector(".tela1");
    let tela3 = document.querySelector(".tela3");

    resposta = {};
    objetoQuizz = {};
    respostasQuizz = [];
    questaoQuizz = {};
    levelQuizz = {};

    tela1.classList.add("oculto");
    tela3.classList.remove("oculto");
}

function criarPerguntas() {
    let comeco = document.querySelector(".comeco-quiz");
    let perguntas = document.querySelector(".perguntas");
    qtdPerguntas = document.getElementById("qtd-perguntas").value;
    qtdNiveis = document.getElementById("qtd-niveis").value;
    qtdNiveis = parseInt(qtdNiveis);
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
        novaPergunta = '<div class="oculto pergunta" id="p' + i + '"><div class="titulo">Pergunta ' + numero + '</div><input type="text" placeholder="Texto da pergunta" name="textoPergunta"><input type="text" placeholder="Cor de fundo da pergunta" name="corPergunta"><div class="titulo">Resposta Correta</div><input type="text" placeholder="Resposta correta" name="textoResposta"><input type="text" placeholder="URL da imagem" name="urlAlternativa"><div class="titulo">Respostas Incorretas</div><input type="text" placeholder="Resposta incorreta 1" name="textoResposta"><input type="text" placeholder="URL da imagem 1" name="urlAlternativa"><input type="text" placeholder="Resposta incorreta 2" name="textoResposta"><input type="text" placeholder="URL da imagem 2" name="urlAlternativa"><input type="text" placeholder="Resposta incorreta 3" name="textoResposta"><input type="text" placeholder="URL da imagem 3" name="urlAlternativa"></div><div class="caixa-item" id="p' + i + '"><strong>Pergunta ' + numero + '</strong><ion-icon onclick="abrirPergunta(this)" name="create-outline"></ion-icon></div>';
        caixasQuizz.innerHTML += novaPergunta;
    }

    objetoQuizz = { "title": tituloQuiz, "image": urlQuiz, "questions": [], "levels": [] };
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
    let verificador = false;
    let mensagem;
    let textoPergunta = document.getElementsByName("textoPergunta");
    let textoResposta = document.getElementsByName("textoResposta");
    let corPergunta = document.getElementsByName("corPergunta");
    let urlAlternativa = document.getElementsByName("urlAlternativa");


    for (let i = 0; i < qtdPerguntas; i++) {
        questaoQuizz = { "title": textoPergunta[i].value, "color": corPergunta[i].value, "answers": [] };
        let n = i + 1;
        if (textoPergunta[i].value.length < 20 || textoPergunta[i].value.length > 65 || textoPergunta[i].value === null) {
            mensagem = "Digite um titulo entre 20 e 65 caracteres na pergunta " + n.toString();
            alert(mensagem);
            verificador = false;
            break;
        } else {
            if (!validarCor(corPergunta[i].value)) {
                mensagem = "Cor inválida na pergunta " + n.toString();
                alert(mensagem);
                verificador = false;
                break;
            } else {
                if (!(textoResposta[4 * i].value && textoResposta[4 * i + 1].value)) {
                    mensagem = "Resposta invalida na pergunta " + n.toString();
                    alert(mensagem);
                    verificador = false;
                    break;
                } else {
                    if (!(validarURL(urlAlternativa[4 * i].value) && validarURL(urlAlternativa[4 * i + 1].value))) {
                        mensagem = "URL invalida na pergunta " + n.toString();
                        alert(mensagem);
                        verificador = false;
                        break;
                    } else {
                        resposta = { "text": textoResposta[4 * i].value, "image": urlAlternativa[4 * i].value, "isCorrectAnswer": true };
                        questaoQuizz.answers.push(resposta);
                        for (let j = 1; j <= 3; j++) {
                            if (textoResposta[j] != null) {
                                resposta = { "text": textoResposta[4 * i + j].value, "image": urlAlternativa[4 * i + j].value, "isCorrectAnswer": false };
                                questaoQuizz.answers.push(resposta);
                            }
                        }
                        verificador = true;
                        objetoQuizz.questions.push(questaoQuizz);
                    }
                }
            }
        }
    }

    if (verificador) {
        perguntas.classList.add("oculto");
        niveis.classList.remove("oculto");
        processarNiveis();
    } else {
        questaoQuizz.answers = []
        objetoQuizz.questions = []
    }
}

function finalizarQuiz() {
    let niveis = document.querySelector(".niveis");
    let final = document.querySelector(".finalizar");
    let verificador = false;
    let verificadorPorcentagem = false;
    let primeiroNivel = false;
    let mensagem;
    let textoNivel = document.getElementsByName("textoNivel");
    let urlNivel = document.getElementsByName("urlNivel");
    let porcentagemAcerto = document.getElementsByName("porcentagemAcerto");
    let descricaoNivel = document.getElementsByName("descricaoNivel");
    let nivelQuizz = [];


    for (let i = 0; i < qtdNiveis; i++) {
        levelQuizz = { "title": textoNivel[i].value, "image": urlNivel[i].value, "minValue": parseInt(porcentagemAcerto[i].value), "text": descricaoNivel[i].value };
        let n = i + 1;
        if (parseInt(porcentagemAcerto[i].value) === 0) {
            verificadorPorcentagem = true;
        }
        if (textoNivel[i].value.length < 10 || textoNivel[i].value === null) {
            mensagem = "Digite um titulo com mais de 10 caracteres no nivel " + n.toString();
            alert(mensagem);
            verificador = false;
            break;
        } else {
            if (parseInt(porcentagemAcerto[i].value) < 0 || parseInt(porcentagemAcerto[i].value) > 100) {
                mensagem = "Porcentagem inválida no nivel " + n.toString();
                alert(mensagem);
                verificador = false;
                break;
            } else {
                if (descricaoNivel[i].value.length < 30 || descricaoNivel[i].value === null) {
                    mensagem = "Digite uma descrição com mais de 30 caracteres no nivel " + n.toString();
                    alert(mensagem);
                    verificador = false;
                    break;
                } else {
                    if (!(validarURL(urlNivel[i].value))) {
                        mensagem = "URL invalida na pergunta " + n.toString();
                        alert(mensagem);
                        verificador = false;
                        break;
                    } else {
                        verificador = true;
                        nivelQuizz.push(levelQuizz);
                    }
                }
            }
        }
    }

    if (verificador && verificadorPorcentagem && nivelQuizz.length === qtdNiveis) {
        for (let i = 0; i < qtdNiveis; i++) {
            objetoQuizz.levels.push(nivelQuizz[i]);
        }
        niveis.classList.add("oculto");
        final.classList.remove("oculto");
        enviarQuizz();
    } else {
        nivelQuizz = [];
    }

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

function validarCor(hex) {
    return hex[0] === "#" && hex.length === 7 && typeof hex === 'string' && !isNaN(Number('0x' + hex.substring(1, 6)));
}

function processarNiveis() {
    for (let i = 0; i < qtdNiveis; i++) {
        let novaPergunta;
        let numero = i + 1;
        novaPergunta = '<div class="oculto nivel" id="n' + i + '"><div class="titulo">Nível ' + numero + '</div><input type="text" placeholder="Titulo do nivel" name="textoNivel"><input type="text" placeholder="% de acerto mínima" name="porcentagemAcerto"><input type="text" placeholder="URL da imagem do nivel" name="urlNivel"><input type="text" placeholder="Descrição do nivel" name="descricaoNivel"></div><div class="caixa-item" id="n' + i + '"><strong>Nivel ' + numero + '</strong><ion-icon onclick="abrirPergunta(this)" name="create-outline"></ion-icon></div>';
        caixasniveisQuizz.innerHTML += novaPergunta;
    }
}

function enviarQuizz() {
    let promessa;
    promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes", objetoQuizz);
    promessa.then(novoQuizz);
}

function novoQuizz(promessa) {
    let foto;
    let titulo;
    let novoQuizz;
    let quizz = promessa.data;
    let quizAmostra = document.querySelector(".finalizar").querySelector(".quizAmostra");

    localStorage.setItem(quizz.id.toString(), JSON.stringify(quizz));
    foto = quizz.image;
    titulo = quizz.title;
    id = quizz.id;
    novoQuizz = '<div class="quiz" id="' + id + '" onclick="showQuizz(this)"><img src=' + foto + ' alt=""><div class="legenda-quiz">' + titulo + '</div><div class="gradiente"></div></div>'

    quizAmostra.innerHTML += novoQuizz;

}

function voltarHome() {
    location.reload();
}

// gabigol

getQuizzList()


function getQuizzList() {
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
    promise.then(loadQuizzes)
    promise.catch(quizzesError)
}

function loadQuizzes(reply) {
    quizzlist = reply.data

}

function quizzesError() {
    alert("Não foi possível obter os quizzes !")
    location.reload()
}


function showQuizz(quizzId) {
    tela1.classList.add("oculto");
    tela3.classList.add("oculto");
    const quizz = document.querySelector(".selected-quizz")
    quizz.scrollIntoView({ behavior: "smooth" })
    quizz.classList.remove("hidden")
    const questions = quizz.querySelector(".questions")
    for (let i = 0; i < quizzlist.length; i++) {
        if (parseInt(quizzId.id) === quizzlist[i].id) {
            selectedQuizz = quizzlist[i]
        }
    }
    setAllQuestionsInBlank(selectedQuizz)
    questions.innerHTML = ""
    quizz.querySelector(".quizz-image").innerText = selectedQuizz.title
    quizz.querySelector(".quizz-image").style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${selectedQuizz.image})`
    for (let i = 0; i < selectedQuizz.questions.length; i++) {
        selectedQuizz.questions[i].answers.sort(comparator)
        let question = selectedQuizz.questions[i]
        questions.innerHTML += writeQuestion(i, question)
    }
    questions.innerHTML += `<div class="level hidden"></div>`
    quizz.querySelector(".question").classList.remove("hidden")
    setTimeout(scrollToFirstQuestion, 2000, quizz)
}

function scrollToFirstQuestion(quizz) {
    quizz.querySelector(".question").scrollIntoView({ behavior: "smooth" })
}

function writeQuestion(id, question) {

    let divQuestion = `<div class="question hidden" id="${id}">
                            <div class="title" style="background-color:${question.color}">${question.title}</div>`
    for (i = 0; i < question.answers.length; i++) {
        let answer = question.answers[i]
        divQuestion += writeAnswer(answer)
    }
    divQuestion += `</div>`
    return divQuestion
}

function writeAnswer(answer) {
    return `<div class="option" onclick="selectOption(this)">
                <img src=${answer.image} />
                <div class="answer">${answer.text}</div>
            </div>`
}


function setAllQuestionsInBlank(quizz) {
    for (let i = 0; i < quizz.questions.length; i++) {
        isQuestionInBlank.push(true)
    }
}


function selectOption(option) {
    const question = option.parentNode
    const id = parseInt(question.id)
    if (isQuestionInBlank[id]) {
        const options = question.querySelectorAll(".option")
        for (let i = 0; i < options.length; i++) {
            options[i].classList.add("blurry")
            if (selectedQuizz.questions[id].answers[i].isCorrectAnswer) {
                options[i].classList.add("correct-answer")
            } else {
                options[i].classList.add("wrong-answer")
            }
        }
        option.classList.remove("blurry")
        if (option.classList.contains("correct-answer")) {
            numberOfCorrectQuestions++
        }
        checkIfLastQuestion(question)
        isQuestionInBlank[id] = false
        setTimeout(scrollToNextQuestion, 2000, question)
    }
}


function checkIfLastQuestion(question) {
    if (question === getLastElement(document.querySelector(".selected-quizz").querySelectorAll(".question"))) {
        getLevel()
    }
}

function getLevel() {
    const rate = Math.round(100 * numberOfCorrectQuestions / (selectedQuizz.questions.length))
    const levels = selectedQuizz.levels
    let level
    const minValue = binarySearch(levels, rate)
    for (let i = 0; i < levels.length; i++) {
        if (levels[i].minValue === minValue) {
            level = levels[i]
        }
    }
    writeLevel(rate, level.title, level.image, level.text)
}

function writeLevel(rate, title, image, text) {
    document.querySelector(".selected-quizz .level").innerHTML += ` <div class="title">${rate}% de acerto: ${title}</div>
                                                    <div class="description">
                                                        <img src="${image}" />
                                                        <span><strong>${text}</strong></span>
                                                    </div>`
    showButtons()
}

function showButtons() {
    const quizz = document.querySelector(".selected-quizz")
    quizz.querySelectorAll("button")[0].classList.remove("hidden")
    quizz.querySelectorAll("button")[1].classList.remove("hidden")
}

function hideButtons() {
    const quizz = document.querySelector(".selected-quizz")
    quizz.querySelectorAll("button")[0].classList.add("hidden")
    quizz.querySelectorAll("button")[1].classList.add("hidden")
}

function scrollToNextQuestion(question) {
    const nextQuestion = question.nextElementSibling
    nextQuestion.classList.remove("hidden")
    nextQuestion.scrollIntoView({ behavior: "smooth" })
}

function binarySearch(list, key) {
    if (list.length === 1) {
        return list[0].minValue
    } else {
        let middle = Math.floor(list.length / 2)
        const halfList = []
        if (key < list[middle].minValue) {
            for (let i = 0; i < middle; i++) {
                halfList.push(list[i])
            }
        } else {
            for (let i = middle; i < list.length; i++) {
                halfList.push(list[i])
            }
        }
        return binarySearch(halfList, key)
    }
}

function remakeQuizz() {
    numberOfCorrectQuestions = 0
    isQuestionInBlank = []
    setAllQuestionsInBlank(selectedQuizz)
    hideButtons()
    showQuizz(selectedQuizz.id)
}

aoEntrarNaPagina();