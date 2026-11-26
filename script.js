import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let historiaFinal = "";

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/\bvocê\b/gi, nome);
    }
}

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";

    telaInicial.style.display = "none";
    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

function mostraPergunta() {
    if (atual < 0 || atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];

    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    mostraAlternativas(perguntaAtual.alternativas);
}

function mostraAlternativas(alternativas) {
    caixaAlternativas.innerHTML = "";

    for (const alternativa of alternativas) {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.type = "button";
        botaoAlternativa.textContent = alternativa.texto;

        botaoAlternativa.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacao + " ";

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }

    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.add("mostrar");

    textoResultado.textContent = `Em 2049, ${nome}... ${historiaFinal}`;
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");

    telaInicial.style.display = "block";
}

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

substituiNome();
