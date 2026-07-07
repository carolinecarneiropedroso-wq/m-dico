// Banco de dados simulado na memória do navegador
const medicosCadastrados = [];
const consultasAgendadas = [];

// Elementos do HTML capturados pelo JavaScript
const formMedico = document.getElementById('form-medico');
const formConsulta = document.getElementById('form-consulta');
const selectMedico = document.getElementById('selecionar-medico');
const corpoTabela = document.getElementById('corpo-tabela');

// 1. EVENTO: Cadastrar Médico
formMedico.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    const nome = document.getElementById('nome-medico').value;
    const crm = document.getElementById('crm').value;
    const especialidade = document.getElementById('especialidade').value;

    // Cria o objeto do médico
    const novoMedico = { nome, crm, especialidade };
    medicosCadastrados.push(novoMedico);

    // Atualiza o menu de seleção do formulário de consultas
    atualizarSelectMedicos();

    // Limpa o formulário e avisa o usuário
    formMedico.reset();
    alert(`Médico(a) Dr(a). ${nome} cadastrado com sucesso!`);
});

// 2. FUNÇÃO: Atualizar a lista de médicos no formulário de agendamento
function atualizarSelectMedicos() {
    // Limpa as opções atuais, deixando apenas a padrão
    selectMedico.innerHTML = '<option value="">-- Escolha um médico --</option>';

    medicosCadastrados.forEach((medico, index) => {
        const option = document.createElement('option');
        option.value = index; // Guarda o índice do médico como identificador
        option.textContent = `Dr(a). ${medico.nome} (${medico.especialidade})`;
        selectMedico.appendChild(option);
    });
}

// 3. EVENTO: Agendar Consulta
formConsulta.addEventListener('submit', function(event) {
    event.preventDefault();

    const medicoIndex = selectMedico.value;
    const paciente = document.getElementById('nome-paciente').value;
    const dataHoraRaw = document.getElementById('data-hora').value;
    const ehPedagogico = document.getElementById('Checklist-pedagogico').checked;

    // Formata a data para ficar visualmente amigável
    const dataFormatada = new Date(dataHoraRaw).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });

    const medicoSelecionado = medicosCadastrados[medicoIndex];

    // Cria o objeto da consulta
    const novaConsulta = {
        medicoNome: medicoSelecionado.nome,
        paciente: paciente,
        dataHora: dataFormatada,
        abordagem: ehPedagogico ? "Acolhedora / Pedagógica" : "Padrão Clínico"
    };

    consultasAgendadas.push(novaConsulta);

    // Atualiza a tabela visível na tela
    atualizarTabelaAgenda();

    // Limpa o formulário
    formConsulta.reset();
});

// 4. FUNÇÃO: Atualizar a tabela de consultas na tela
function atualizarTabelaAgenda() {
    corpoTabela.innerHTML = ''; // Limpa a tabela antes de redesenhar

    consultasAgendadas.forEach(consulta => {
        const linha = document.createElement('tr');

        // Define a cor da tag dependendo do tipo de consulta
        const classeBadge = consulta.abordagem === "Acolhedora / Pedagógica" ? "badge badge-pedagógica" : "badge";

        linha.innerHTML = `
            <td><strong>Dr(a). ${consulta.medicoNome}</strong></td>
            <td>${consulta.paciente}</td>
            <td>${consulta.dataHora}</td>
            <td><span class="${classeBadge}">${consulta.abordagem}</span></td>
        `;

        corpoTabela.appendChild(linha);
    });
}