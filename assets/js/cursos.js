const selectFilter = document.querySelector('#options');
const searchInput = document.querySelector('#inCurso');
const qtdCursos = document.querySelector('#qtd-cursos');
const btnClear = document.querySelector('#clearFilter');
const cardContainer = document.querySelector('.cursos-grid-pagina') || document.querySelector('#container-cursos');

let cursosDoBanco = [];

async function carregarCursosDoBanco() {
    try {
        const resposta = await fetch('/api/cursos');
        const todosOsCursos = await resposta.json();

        // Mantenha essa linha
        cursosDoBanco = todosOsCursos;

        // Mostra na tela
        displayData(cursosDoBanco);
    } catch (erro) {
        console.error('Erro ao carregar cursos do banco:', erro);
        //if (cardContainer) cardContainer.innerHTML = `<p style="font-family: Nunito R; color: #9CA3AF">Erro ao carregar cursos.</p>`;
    }
}

// Função para descobrir se é ETEC ou FATEC
function definirInstituicao(curso) {
    
    const Instituição = curso['Instituição'] || '';
    if (Instituição.toUpperCase().includes('FATEC')) return 'FATEC';
    if (Instituição.toUpperCase().includes('ETEC')) return 'ETEC';
    
    // Caso não encontre nenhum dos dois
    return 'Geral';
}

const displayData = (data) => {
    if (qtdCursos) qtdCursos.innerHTML = `Cursos: ${data.length}`;

    cardContainer.innerHTML = data.map(curso => {
        const nome = curso['Curso'] || 'Curso sem nome';
        const descricao = curso['Descrição'] || '';
        const modalidade = curso['Tipo'] || 'Presencial';
        const duracao = curso['Duração/Semestre'] || '-';
        const eixo = curso['Eixo Tecnológico'] || 'Geral';
        const instituicao = definirInstituicao(curso);

        return `
            <div class="card-curso-item">
                <div class="card-curso-header">
                    <div>
                        <span class="tag-curso tag-${instituicao.toLowerCase()}">${instituicao}</span>
                    </div>
                </div>
                <h3 class="title">${nome}</h3>
                <p>${descricao.length > 120 ? descricao.substring(0, 120) + '...' : descricao}</p>
                <ul class="curso-detalhes-lista">
                    <li><img src="img/pin.svg" alt="Modalidade"> ${modalidade}</li>
                    <li><img src="img/clock.svg" alt="Duração"> ${duracao}</li>
                </ul>
                <div class="curso-tags-bottom">
                    <span class="tag-categoria">${eixo}</span>
                </div>
            </div>
        `;
    }).join('');
};

function aplicarFiltros() {
    const termoBusca = searchInput.value.toLowerCase();
    const tipoSelecionado = selectFilter.value;

    const cursosFiltrados = cursosDoBanco.filter(curso => {
        const instituicao = definirInstituicao(curso);
        const nome = curso['Curso'] || '';
        
        const matchesTipo = tipoSelecionado === 'allTypes' || instituicao === tipoSelecionado;
        const matchesBusca = nome.toLowerCase().includes(termoBusca);

        return matchesTipo && matchesBusca;
    });

    displayData(cursosFiltrados);
}

selectFilter.addEventListener('change', aplicarFiltros);
searchInput.addEventListener('input', aplicarFiltros);

btnClear.addEventListener('click', () => {
    searchInput.value = '';
    selectFilter.value = 'allTypes';
    displayData(cursosDoBanco);
});

window.addEventListener('load', carregarCursosDoBanco);
