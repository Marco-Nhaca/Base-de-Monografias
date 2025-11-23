let cardcontainer = document.querySelector(".card-container");
let buscaInput = document.querySelector("#busca-input");
let dados = [];

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    const termoBusca = buscaInput.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardcontainer.innerHTML = ""; // Limpa os cards antigos antes de renderizar os novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card")
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.curso}</p>
        <a href="${dado.links}" target="_blank">Acessar material</a>
        `
        cardcontainer.appendChild(article);
    }
}

// --- INÍCIO DA FUNCIONALIDADE "VOLTAR AO TOPO" ---

// Pega o botão e o elemento principal que tem a barra de rolagem
const backToTopButton = document.getElementById("back-to-top-btn");
const mainElement = document.querySelector('main');

// Quando o usuário rolar o conteúdo dentro do <main>
if (mainElement) {
    mainElement.onscroll = function() {
        scrollFunction();
    };
}

function scrollFunction() {
    // Se o usuário rolar mais de 100px para baixo, mostra o botão
    if (mainElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Quando o usuário clicar no botão, rola suavemente para o topo do <main>
backToTopButton.addEventListener('click', () => {
    mainElement.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- FIM DA FUNCIONALIDADE "VOLTAR AO TOPO" ---