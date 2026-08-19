const form = document.getElementById('formulario');




const renderList = (pessoas) => {
    const pessoasContainer = document.getElementById('pessoas');
    pessoasContainer.innerHTML = '';
    console.log('Pessoas recebidas:', pessoas);
    pessoas.forEach((pessoa) => {
        const pessoaElement = document.createElement('div');
        pessoaElement.textContent = `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}`;
        pessoasContainer.appendChild(pessoaElement);
    });
};

const buscaPessoas = async () => {
    try {
        const response = await fetch('http://localhost:3001/pessoa');
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        const data = await response.json();

        renderList(data);
    } 
    catch (error) {
        console.error('Erro ao buscar pessoas:', error);
    
    }
    };

    
        buscaPessoas();

    async function enviarPessoa(pessoa) {
        try {
            const response = await fetch('http://localhost:3001/pessoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pessoa),
            });
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            const data = await response.json();
            console.log('Pessoa enviada com sucesso:', data);
            buscaPessoas(); // Atualiza a lista após enviar a pessoa
        } catch (error) {
            console.error('Erro ao enviar pessoa:', error);
        }
    }


    form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit.disable = true;
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;
    if (!nome || !idade || !email) {
        alert('Por favor, preencha todos os campos.');
        btnSubmit.disable = false;
        return;
    }
    const pessoa = { nome, idade, email };
    await enviarPessoa(pessoa);
    form.reset();

});

