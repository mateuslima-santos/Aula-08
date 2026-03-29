const input1 = document.getElementById("input_1");
const input2 = document.getElementById("input_2");
const sinal = document.getElementById("sinal");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");
const historico = document.getElementById("historico");
const botaoIgual = document.getElementById("igual");
const botaoLimpar = document.getElementById("limpar");
const botoesOperacao = document.querySelectorAll("[data-operacao]");

let operacaoAtual = "+";
let historicoVazio = true;

function somar(numero1, numero2) {
    return numero1 + numero2;
}

function subtrair(numero1, numero2) {
    return numero1 - numero2;
}

function multiplicar(numero1, numero2) {
    return numero1 * numero2;
}

function dividir(numero1, numero2) {
    return numero1 / numero2;
}

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

function definirOperacao(operacao) {
    operacaoAtual = operacao;
    sinal.textContent = operacao;

    botoesOperacao.forEach((botao) => {
        botao.classList.toggle("ativo", botao.dataset.operacao === operacao);
    });
}

function adicionarAoHistorico(conta, valorFinal) {
    if (historicoVazio) {
        historico.innerHTML = "";
        historicoVazio = false;
    }

    const item = document.createElement("li");
    item.textContent = `${conta} = ${valorFinal}`;
    historico.prepend(item);
}

function validarCampos(valor1, valor2) {
    if (valor1 === "" || valor2 === "") {
        mostrarMensagem("Preencha os dois campos antes de calcular.", "erro");
        return false;
    }

    if (isNaN(valor1) || isNaN(valor2)) {
        mostrarMensagem("Digite apenas números válidos nos campos.", "erro");
        return false;
    }

    if (operacaoAtual === "/" && Number(valor2) === 0) {
        mostrarMensagem("Não é permitido dividir por zero.", "erro");
        return false;
    }

    return true;
}

function calcular() {
    const valor1 = input1.value.trim().replace(",", ".");
    const valor2 = input2.value.trim().replace(",", ".");

    if (!validarCampos(valor1, valor2)) {
        resultado.textContent = "?";
        return;
    }

    const numero1 = Number(valor1);
    const numero2 = Number(valor2);
    let valorFinal;

    if (operacaoAtual === "+") {
        valorFinal = somar(numero1, numero2);
    } else if (operacaoAtual === "-") {
        valorFinal = subtrair(numero1, numero2);
    } else if (operacaoAtual === "*") {
        valorFinal = multiplicar(numero1, numero2);
    } else if (operacaoAtual === "/") {
        valorFinal = dividir(numero1, numero2);
    }

    resultado.textContent = valorFinal;
    mostrarMensagem("Cálculo realizado com sucesso.", "sucesso");
    adicionarAoHistorico(`${numero1} ${operacaoAtual} ${numero2}`, valorFinal);
}

function limparCampos() {
    input1.value = "";
    input2.value = "";
    resultado.textContent = "?";
    mostrarMensagem("Campos limpos. Escolha uma operação e digite novos valores.", "sucesso");
    input1.focus();
}

botoesOperacao.forEach((botao) => {
    botao.addEventListener("click", () => {
        definirOperacao(botao.dataset.operacao);
        mostrarMensagem(`Operação selecionada: ${botao.textContent}.`, "sucesso");
    });
});

botaoIgual.addEventListener("click", calcular);
botaoLimpar.addEventListener("click", limparCampos);

document.addEventListener("keydown", (evento) => {
    if (["+", "-", "*", "/"].includes(evento.key)) {
        definirOperacao(evento.key);
        mostrarMensagem(`Operação alterada para ${evento.key}.`, "sucesso");
        return;
    }

    if (evento.key === "Enter") {
        calcular();
    }

    if (evento.key === "Escape") {
        limparCampos();
    }
});

definirOperacao("+");
