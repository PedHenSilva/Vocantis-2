const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answers-buttons");
const nextButton = document.querySelector("#next-btn");
const questionNumber = document.querySelector("#question-number");
const progressElement = document.querySelector("#progresso");
const currentProgress = document.querySelector("#progresso-atual");
const backButton = document.querySelector("#back-btn");
const readyMessage = document.querySelector(".pronto-mensagem");

const questions = [
    {
        question: "O que mais te motiva em uma atividade profissional?",
        answers: [
            { id: 1, text: "Liderar equipes e projetos", profile: "analitico"},
            { id: 2, text: "Ajudar e orientar outras pessoas", profile: "social"},
            { id: 3, text: "Trabalhar com dados e números", profile: "criativoEmpreendedor"},
            { id: 4, text: "Criar algo novo e inovador", profile: "analitico"},
            { id: 5, text: "Resolver problemas complexos e desafiadores", profile: "empreendedorSocial"}
        ],
    },
    {
        question: "Em qual ambiente você se sente mais produtivo?",
        answers: [
            { id: 1, text: "Laboratório ou ambiente técnico", profile: "analitico"},
            { id: 2, text: "Escritório colaborativo", profile: "empreendedorSocial"},
            { id: 3, text: "Estúdio criativo ou ateliê", profile: "criativo"},
            { id: 4, text: "Sala de aula ou espaço educativo", profile: "social"},
            { id: 5, text: "Ao ar livre ou em campo", profile: "pratico"}
        ],
    },
    {
        question: "Qual dessas ações você faria voluntariamente no tempo livre?",
        answers: [
            { id: 1, text: "Programar um aplicativo ou site", profile: "analiticoCriativo"},
            { id: 2, text: "Organizar eventos comunitários", profile: "socialEmpreendedor"},
            { id: 3, text: "Desenhar, pintar ou fazer música", profile: "criativo"},
            { id: 4, text: "Dar aulas ou explicar conceitos", profile: "social"},
            { id: 5, text: "Analisar investimentos ou mercado", profile: "empreendedorAnalitico"}
        ],
    },
    {
        question: "Como você prefere aprender coisas novas?",
        answers: [
            { id: 1, text: "Experimentando e testando na prática", profile: "pratico"},
            { id: 2, text: "Estudando teoria e conceitos", profile: "analitico"},
            { id: 3, text: "Observando e imitando outros", profile: "socialPratico"},
            { id: 4, text: "Criando meus próprios métodos", profile: "criativoEmpreendedor"},
            { id: 5, "text": "Discutindo em grupo", profile: "social"}
        ],
    },
    {
        question: "Qual dessas conquistas te deixaria mais orgulhoso?",
        answers: [
            { id: 1, text: "Desenvolver uma tecnologia inovadora", profile: "analiticoCriativo"},
            { id: 2, text: "Impactar positivamente a vida de muitas pessoas", profile: "social"},
            { id: 3, text: "Criar uma obra de arte reconhecida", profile: "criativo"},
            { id: 4, text: "Construir um negócio de sucesso", profile: "empreendedor"},
            { id: 5, text: "Descobrir algo importante para a ciência", profile: "analitico"}
        ],
    },
    {
        question: "Em um projeto em grupo, qual papel você naturalmente assume?",
        answers: [
            { id: 1, text: "O planejador que organiza tudo", profile: "analiticoEmpreendedor"},
            { id: 2, text: "O mediador que mantém a harmonia", profile: "social"},
            { id: 3, text: "O criativo que gera ideias", profile: "criativo"},
            { id: 4, text: "O executor que coloca a mão na massa", profile: "pratico"},
            { id: 5, text: "O líder que toma as decisões", profile: "empreendedorSocial"}
        ],
    },
    {
        question: "Qual dessas matérias sempre despertou seu interesse?",
        answers: [
            { id: 1, text: "Matemática e Física", profile: "analitico"},
            { id: 2, text: "História e Sociologia", profile: "social"},
            { id: 3, text: "Artes e Literatura", profile: "criativo"},
            { id: 4, text: "Biologia e Química", profile: "analiticoPratico"},
            { id: 5, text: "Geografia e Economia", profile: "empreendedorAnalitico"}
        ],
    },
    {
        question: "Como você imagina seu dia de trabalho ideal?",
        answers: [
            { id: 1, text: "Resolvendo problemas técnicos complexos", profile: "analitico"},
            { id: 2, text: "Interagindo com pessoas diferentes", profile: "social"},
            { id: 3, text: "Criando e desenvolvendo projetos únicos", profile: "criativoEmpreendedor"},
            { id: 4, text: "Criar algo novo e inovador", profile: "analitico"},
            { id: 5, text: "Resolver problemas complexos e desafiadores", profile: "social"}
        ],
    },
];

let currentQuestionIndex = 0;
let userAnswers = []; // Vai guardar o perfil escolhido em cada índice
let analitico = 0, social = 0, criativo = 0, pratico = 0, empreendedor = 0;

function startTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    readyMessage.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState();

    if (currentQuestionIndex === 0) {
        backButton.disabled = true;
    } else {
        backButton.disabled = false;
    }

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    let progressPercent = (currentQuestionIndex / questions.length) * 100;
    
    progressElement.innerHTML = `${Math.round(progressPercent)}% Concluído`;
    currentProgress.style.width = `${progressPercent}%`;

    questionNumber.innerHTML = `Pergunta ${questionNo} de ${questions.length}`;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.dataset.profile = answer.profile; 
        button.classList.add("btn-opcao");
        
        // Verifica se o usuário já havia respondido essa pergunta antes (se ele clicou em "voltar")
        if (userAnswers[currentQuestionIndex] === answer.profile) {
            button.classList.add("btn-opcao-active");
            nextButton.style.display = "flex";
            readyMessage.style.display = "flex";
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    
    // Remove a classe 'active' de todos os botões
    Array.from(answerButtons.children).forEach((button) => {
        button.classList.remove("btn-opcao-active");
    });

    // Adiciona a classe 'active' no botão clicado
    selectedBtn.classList.add("btn-opcao-active"); 
    
    // Salva a resposta no array
    userAnswers[currentQuestionIndex] = selectedBtn.dataset.profile;

    // Mostra o botão de avançar e a mensagem
    nextButton.style.display = "flex";
    readyMessage.style.display = "flex";
}

function calculateFinalScore() {
    // Zera as pontuações antes de calcular
    analitico = social = criativo = pratico = empreendedor = 0;

    // Percorre todas as respostas salvas e soma os pontos
    userAnswers.forEach((profile) => {
        switch (profile) {
            case 'analitico':
                analitico += 13;
                break;
            case 'social':
                social += 13;
                break;
            case 'criativo':
                criativo += 13;
                break;
            case 'pratico':
                pratico += 13;
                break;
            case 'empreendedor':
                empreendedor += 13;
                break;
            case 'criativoEmpreendedor':
                criativo += 10;
                empreendedor += 3;
                break;
            case 'empreendedorSocial':
                empreendedor += 10;
                social += 3;
                break;
            case 'analiticoCriativo':
                analitico += 10;
                criativo += 3;
                break;
            case 'socialEmpreendedor':
                social += 10;
                empreendedor += 3;
                break;
            case 'empreendedorAnalitico':
                empreendedor += 10;
                analitico += 3;
                break;
            case 'socialPratico':
                social += 10;
                pratico += 3;
                break;
            case 'analiticoEmpreendedor':
                analitico += 10;
                empreendedor += 3;
                break;
            case 'analiticoPratico':
                analitico += 10;
                pratico += 3;
                break;
        }
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        redirecionar();
    }
}

function handleBackButton() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function redirecionar() {
    // Calcula a pontuação final só na hora de redirecionar
    calculateFinalScore();

    localStorage.setItem("notaAnalitico", analitico);
    localStorage.setItem("notaSocial", social);
    localStorage.setItem("notaCriativo", criativo);
    localStorage.setItem("notaPratico", pratico);
    localStorage.setItem("notaEmpreendedor", empreendedor);

    window.location.href = "resultado.html";
}

if (backButton) {
    backButton.addEventListener("click", () => {
        handleBackButton();
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            redirecionar();
        }
    });
}

startTest();