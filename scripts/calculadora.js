// Seleção de elementos
const input1 = document.getElementById('input_1');
const input2 = document.getElementById('input_2');
const sinalDisplay = document.getElementById('sinal');
const resultadoDisplay = document.getElementById('resultado');
const btnIgual = document.getElementById('igual');
const btnLimpar = document.getElementById('limpar');
const listaHistorico = document.getElementById('lista-historico');

let operacaoAtual = '+';

// 1. Funções Matemáticas
const operacoes = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (b === 0 ? "Erro: Divisão por 0" : a / b)
};

// 2. Função de Cálculo Principal
function calcular() {
    const val1 = input1.value.replace(',', '.');
    const val2 = input2.value.replace(',', '.');

    // Validações
    if (val1 === "" || val2 === "") {
        alert("Por favor, preencha ambos os campos.");
        return;
    }

    const num1 = Number(val1);
    const num2 = Number(val2);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Digite apenas números válidos.");
        return;
    }

    // Execução
    const resultado = operacoes[operacaoAtual](num1, num2);
    
    // Exibição
    resultadoDisplay.textContent = resultado;
    
    if (typeof resultado === 'number') {
        adicionarAoHistorico(`${num1} ${operacaoAtual} ${num2} = ${resultado}`);
    }
}

// 3. Atualizar Operação
function setOperacao(op) {
    operacaoAtual = op;
    sinalDisplay.textContent = op;
}

// 4. Histórico
function adicionarAoHistorico(texto) {
    const li = document.createElement('li');
    li.textContent = texto;
    listaHistorico.prepend(li); // Adiciona no topo
}

// 5. Event Listeners (Boas práticas)
document.querySelectorAll('.botao').forEach(btn => {
    btn.addEventListener('click', () => setOperacao(btn.getAttribute('data-op')));
});

btnIgual.addEventListener('click', calcular);

btnLimpar.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    resultadoDisplay.textContent = '';
    setOperacao('+');
});

// 6. Suporte para Teclado
document.addEventListener('keydown', (event) => {
    if (['+', '-', '*', '/'].includes(event.key)) {
        setOperacao(event.key);
    }
    if (event.key === 'Enter') {
        calcular();
    }
    if (event.key === 'Escape') {
        btnLimpar.click();
    }
});