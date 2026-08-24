const formulario = document.querySelector('#formulario');
const indicador = document.querySelector('#loading');
const alertaErro = document.querySelector('#error-msg');
const botao = document.querySelector('#btn-submit');
const listaPosts = document.querySelector('#posts-container');

const ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

function exibirLoading(ativo) {
    indicador.style.display = ativo ? 'block' : 'none';
    alertaErro.style.display = 'none';
}

function exibirErro(texto) {
    alertaErro.innerText = `❌ ${texto}`;
    alertaErro.style.display = 'block';
}

async function carregarLista() {
    exibirLoading(true);

    try {
        const requisicao = await axios.get(`${ENDPOINT}?_limit=5`);

        listaPosts.innerHTML = '';

        requisicao.data.forEach(item => {
            const card = document.createElement('div');

            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.body}</p>
                <hr>
            `;

            listaPosts.appendChild(card);
        });

    } catch (erro) {
        exibirErro('Não foi possível carregar os posts.');
        console.error(erro);
    } finally {
        exibirLoading(false);
    }
}

async function cadastrarPost(dados) {
    exibirLoading(true);

    try {
        const resultado = await axios.post(ENDPOINT, dados);

        console.log('Resposta da API:', resultado.data);

        alert('Post enviado com sucesso!');

        formulario.reset();

    } catch (erro) {
        exibirErro('Erro ao enviar o post.');
        console.error(erro);
    } finally {
        exibirLoading(false);
    }
}

formulario.addEventListener('submit', async function (e) {
    e.preventDefault();

    botao.disabled = true;

    const tituloDigitado = document.querySelector('#titulo').value.trim();
    const conteudoDigitado = document.querySelector('#corpo').value.trim();

    if (tituloDigitado === '' || conteudoDigitado === '') {
        exibirErro('Preencha todos os campos.');
        botao.disabled = false;
        return;
    }

    const dadosPost = {
        title: tituloDigitado,
        body: conteudoDigitado,
        userId: 1
    };

    await cadastrarPost(dadosPost);

    botao.disabled = false;
});

window.onload = () => {
    carregarLista();
};

