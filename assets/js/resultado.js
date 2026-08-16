const analitico = parseInt(localStorage.getItem("notaAnalitico")) || 0;
const social = parseInt(localStorage.getItem("notaSocial")) || 0;
const criativo = parseInt(localStorage.getItem("notaCriativo")) || 0;
const pratico = parseInt(localStorage.getItem("notaPratico")) || 0;
const empreendedor = parseInt(localStorage.getItem("notaEmpreendedor")) || 0;

let empreendedorScore = document.querySelector('#empreendedorScore');
let analiticoScore = document.querySelector('#analiticoScore');
let criativoScore = document.querySelector('#criativoScore');
let socialScore = document.querySelector('#socialScore');
let praticoScore = document.querySelector('#praticoScore');

let nameElement = document.querySelector('#profileName');
let nickElement = document.querySelector('#nickname');
let descElement = document.querySelector('#description');
let compElement = document.querySelector('#compability');
let chr1Element = document.querySelector('#chr1');
let chr2Element = document.querySelector('#chr2');
let chr3Element = document.querySelector('#chr3');
let chr4Element = document.querySelector('#chr4');
let chr5Element = document.querySelector('#chr5');

let mainProfileScore = 0

const profiles = [
    {
        profileName: 'Analítico',
        nickname: 'O Solucionador de Problemas',
        description: 'Você tem uma mente analítica excepcional, capaz de decompor problemas complexos em partes menores e encontrar soluções lógicas. Sua capacidade de raciocínio crítico e atenção aos detalhes são seus pontos fortes.',
        chr1: 'Pensamento lógico e estruturado',
        chr2: 'Capacidade de resolver problemas complexos',
        chr3: 'Atenção aos detalhes e precisão',
        chr4: 'Habilidade com números e dados',
        chr5: 'Gosta de pesquisa e investigação',

        crs1: {
            nome: 'Análise e Desenvolvimento de Sistemas',
            inst: 'FATEC'
        },
        crs2: {
            nome: 'Ciência de Dados',
            inst: 'ETEC'
        },
        crs3: {
            nome: 'Inteligência Artificial',
            inst: 'FATEC'
        },
        crs4: {
            nome: 'Biotecnologia',
            inst: 'ETEC'
        },
        crs5: {
            nome: 'Big Data para Negócios',
            inst: 'FATEC'
        },
        crs6: {
            nome: 'Desenvolvimento de Sistemas',
            inst: 'ETEC'
        },
        compability: analitico
    },

    {
        profileName: 'Social',
        nickname: 'O Conectador de Pessoas',
        description: 'Você tem um talento especial para entender e se conectar com pessoas. Sua empatia, habilidades de comunicação e desejo de ajudar outros fazem de você um profissional social excepcional.',
        chr1: 'Excelentes habilidades de comunicação',
        chr2: 'Empatia e compreensão interpessoal',
        chr3: 'Capacidade de trabalhar em equipe',
        chr4: 'Interesse em ajudar outras pessoas',
        chr5: 'Facilidade para resolver conflitos',

        crs1: {
            nome: 'Enfermagem',
            inst: 'ETEC'
        },
        crs2: {
            nome: 'Desenvolvimento Comunitário',
            inst: 'ETEC'
        },
        crs3: {
            nome: 'Recursos Humanos',
            inst: 'ETEC'
        },
        crs4: {
            nome: 'Gestão de Recursos Humanos',
            inst: 'FATEC'
        },
        crs5: {
            nome: 'Gestão Hospitalar',
            inst: 'FATEC'
        },
        crs6: {
            nome: 'Gestão de Turismo',
            inst: 'FATEC'
        },
        compability: social
    },

    {
        profileName: 'Criativo',
        nickname: 'O Visionário Artístico',
        description: 'Sua criatividade e imaginação são suas maiores forças. Você vê o mundo de forma única e tem a habilidade de transformar ideias abstratas em realidade tangível através da arte e design.',
        chr1: 'Imaginação e criatividade abundantes',
        chr2: 'Senso estético apurado',
        chr3: 'Capacidade de inovar e criar',
        chr4: 'Habilidade para expressão artística',
        chr5: 'Pensamento não-linear',

        crs1: {
            nome: 'Design Gráfico',
            inst: 'ETEC'
        },
        crs2: {
            nome: 'Design de Interiores',
            inst: 'ETEC'
        },
        crs3: {
            nome: 'Produção de Áudio e Vídeo',
            inst: 'ETEC'
        },
        crs4: {
            nome: 'Design de Mídias Digitais',
            inst: 'FATEC'
        },
        crs5: {
            nome: 'Jogos Digitais',
            inst: 'FATEC'
        },
        crs6: {
            nome: 'Produção Cultural',
            inst: 'FATEC'
        },
        compability: criativo
    },

    {
        profileName: 'Empreendedor',
        nickname: 'O Líder Visionário',
        description: 'Você tem o espírito empreendedor natural, com visão de negócios, capacidade de liderança e coragem para assumir riscos calculados. Sua ambição e determinação são seus diferenciais.',
        chr1: 'Visão de negócios e oportunidades',
        chr2: 'Capacidade de liderança natural',
        chr3: 'Coragem para assumir riscos',
        chr4: 'Habilidade para tomar decisões',
        chr5: 'Ambição e determinação',

        crs1: {
            nome: 'Administração',
            inst: 'ETEC'
        },
        crs2: {
            nome: 'Marketing',
            inst: 'ETEC'
        },
        crs3: {
            nome: 'Comércio Exterior',
            inst: 'ETEC'
        },
        crs4: {
            nome: 'Gestão de Negócios e Inovação',
            inst: 'FATEC'
        },
        crs5: {
            nome: 'Gestão Empresarial',
            inst: 'FATEC'
        },
        crs6: {
            nome: 'Processos Gerenciais',
            inst: 'FATEC'
        },
        compability: empreendedor
    },

    {
        profileName: 'Prático',
        nickname: 'O Executor Habilidoso',
        description: 'Você tem habilidade natural para colocar a mão na massa e transformar teoria em prática. Sua capacidade de executar tarefas concretas, resolver problemas do mundo real e trabalhar com ferramentas e técnicas aplicadas fazem de você um profissional essencial em qualquer equipe.',
        chr1: 'Habilidade manual e técnica apurada',
        chr2: 'Foco em resultados tangíveis',
        chr3: 'Aprendizado por experiência',
        chr4: 'Capacidade de execução eficiente',
        chr5: 'Resolução prática de problemas',

        crs1: {
            nome: 'Mecânica',
            inst: 'ETEC'
        },
        crs2: {
            nome: 'Edificações',
            inst: 'ETEC'
        },
        crs3: {
            nome: 'Eletrotécnica',
            inst: 'ETEC'
        },
        crs4: {
            nome: 'Automação Industrial',
            inst: 'FATEC'
        },
        crs5: {
            nome: 'Construção de Edifícios',
            inst: 'FATEC'
        },
        crs6: {
            nome: 'Logística',
            inst: 'FATEC'
        },
        compability: pratico
    }
];

for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].compability > mainProfileScore) {
        mainProfileScore = profiles[i].compability
        compElement.innerHTML = `${mainProfileScore}%`
    }
};

const cursosGrid = document.querySelector('.cursos-grid');
const listaChr = document.querySelector('.lista-customizada');

// Procurar perfil predominante e aplica seus elementos/propriedades
const perfilVencedor = profiles.find(p => p.compability === mainProfileScore);

if (perfilVencedor) {
    nameElement.innerHTML = `Perfil ${perfilVencedor.profileName}`;
    nickElement.innerHTML = perfilVencedor.nickname;
    descElement.innerHTML = perfilVencedor.description;

    const caracteristicas = [
        perfilVencedor.chr1, perfilVencedor.chr2, perfilVencedor.chr3, 
        perfilVencedor.chr4, perfilVencedor.chr5
    ];

    listaChr.innerHTML = caracteristicas
        .map(chr => `<li>${chr}</li>`)
        .join('');

    const cursosRecomendados = [
        perfilVencedor.crs1, perfilVencedor.crs2, perfilVencedor.crs3, 
        perfilVencedor.crs4, perfilVencedor.crs5, perfilVencedor.crs6
    ];

    cursosGrid.innerHTML = cursosRecomendados
        .map(curso => `
            <div class="curso-item">
                <span class="tag-curso tag-${curso.inst.toLowerCase()}">${curso.inst}</span>
                <h5>${curso.nome}</h5>
            </div>
        `).join('');
}

empreendedorScore.style.width = `${empreendedor}%`;
analiticoScore.style.width = `${analitico}%`;
criativoScore.style.width = `${criativo}%`;
socialScore.style.width = `${social}%`;
praticoScore.style.width = `${pratico}%`;