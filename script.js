const orientacoes = {
  verde: {
    etiqueta: "🟢 Comunicação acolhedora",
    titulo: "Verde — Pode continuar!",
    introducao: "Atitudes que favorecem uma comunicação respeitosa:",
    itens: [
      "Falar com respeito e clareza.",
      "Dar tempo para a pessoa responder.",
      "Utilizar imagens, textos e instruções objetivas.",
      "Respeitar as diferentes formas de comunicação."
    ]
  },
  amarelo: {
    etiqueta: "🟡 Atenção e adaptação",
    titulo: "Amarelo — Observe e adapte!",
    introducao: "Observe a situação e adapte sua forma de comunicar:",
    itens: [
      "Verificar se a explicação foi compreendida, sem pressionar.",
      "Reduzir informações excessivas na tela.",
      "Evitar estímulos visuais desnecessários.",
      "Oferecer alternativas de comunicação."
    ]
  },
  vermelho: {
    etiqueta: "🔴 Pare e reavalie",
    titulo: "Vermelho — Evite essas atitudes!",
    introducao: "Algumas atitudes podem dificultar a participação:",
    itens: [
      "Não gritar ou pressionar para obter uma resposta.",
      "Não desrespeitar o tempo e os limites da pessoa.",
      "Não utilizar textos confusos ou difíceis de entender.",
      "Não presumir que todas as pessoas autistas são iguais."
    ]
  }
};

const luzes = document.querySelectorAll(".luz");
const mensagem = document.querySelector("#mensagem-semaforo");

function mostrarOrientacao(cor) {
  const orientacao = orientacoes[cor];

  if (!orientacao) return;

  luzes.forEach((luz) => {
    const selecionada = luz.dataset.cor === cor;
    luz.setAttribute("aria-pressed", String(selecionada));
  });

  mensagem.replaceChildren();

  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta";
  etiqueta.textContent = orientacao.etiqueta;

  const titulo = document.createElement("h3");
  titulo.textContent = orientacao.titulo;

  const introducao = document.createElement("p");
  introducao.textContent = orientacao.introducao;

  const lista = document.createElement("ul");

  orientacao.itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  mensagem.append(etiqueta, titulo, introducao, lista);
}

luzes.forEach((luz) => {
  luz.addEventListener("click", () => {
    mostrarOrientacao(luz.dataset.cor);
  });
});

// Quiz educativo
const formulario = document.querySelector("#form-quiz");
const resultado = document.querySelector("#resultado-quiz");

const respostasCorretas = {
  q1: "b",
  q2: "c",
  q3: "a",
  q4: "b",
  q5: "c"
};

const explicacoes = [
  "Respeitar o tempo de resposta evita pressão desnecessária.",
  "Instruções claras e alternativas tornam a comunicação mais acessível.",
  "O amarelo representa observar e adaptar a comunicação.",
  "Cada pessoa autista tem características e necessidades individuais.",
  "O semáforo conscientiza sobre atitudes inclusivas; não classifica pessoas."
];

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = new FormData(formulario);
  let pontuacao = 0;
  const listaResultados = document.createElement("ol");

  Object.keys(respostasCorretas).forEach((pergunta, indice) => {
    const acertou = dados.get(pergunta) === respostasCorretas[pergunta];

    if (acertou) pontuacao++;

    const item = document.createElement("li");
    item.textContent =
      `${acertou ? "Correto!" : "Resposta incorreta."} ` +
      explicacoes[indice];

    listaResultados.appendChild(item);
  });

  resultado.replaceChildren();

  const titulo = document.createElement("h3");
  titulo.textContent = `Você acertou ${pontuacao} de 5 perguntas!`;

  const mensagemFinal = document.createElement("p");

  if (pontuacao === 5) {
    mensagemFinal.textContent =
      "Parabéns! Você demonstrou compreender os princípios da comunicação inclusiva.";
  } else if (pontuacao >= 3) {
    mensagemFinal.textContent =
      "Muito bem! Revise as explicações abaixo para aprender ainda mais.";
  } else {
    mensagemFinal.textContent =
      "Continue aprendendo! Leia as explicações e tente novamente.";
  }

  resultado.classList.toggle("erro", pontuacao < 3);
  resultado.append(titulo, mensagemFinal, listaResultados);
  resultado.hidden = false;
  resultado.focus();
});

formulario.addEventListener("reset", () => {
  resultado.hidden = true;
  resultado.classList.remove("erro");
  resultado.replaceChildren();
});
