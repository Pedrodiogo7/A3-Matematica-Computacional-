let automatico = false;
let intervalo = null;
let contador = 0;

const cenarios = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1]
];

function limparLuzes() {
  document.querySelectorAll(".luz").forEach(luz => {
    luz.classList.remove("verde", "amarelo", "vermelho");
  });

  document.querySelectorAll("tbody tr").forEach(linha => {
    linha.classList.remove("ativo");
  });
}

function ligar(id, cor) {
  document.getElementById(id).classList.add(cor);
}

function destacarLinha(A, B, P) {
  const id = `linha-${A}${B}${P}`;
  const linha = document.getElementById(id);
  if (linha) linha.classList.add("ativo");
}

function atualizarPainel(estado, binario, regra, descricao) {
  document.getElementById("estado").textContent = estado;
  document.getElementById("binario").textContent = binario;
  document.getElementById("regra").textContent = regra;
  document.getElementById("descricao").textContent = descricao;
}

function calcularSemaforo() {
  const A = document.getElementById("viaA").checked ? 1 : 0;
  const B = document.getElementById("viaB").checked ? 1 : 0;
  const P = document.getElementById("pedestre").checked ? 1 : 0;

  limparLuzes();
  destacarLinha(A, B, P);

  if (P === 1) {
    ligar("a-vermelho", "vermelho");
    ligar("b-vermelho", "vermelho");
    ligar("p-verde", "verde");
    atualizarPainel(
      "S4",
      "001001",
      "P → S4",
      "Como existe pedestre aguardando, o sistema prioriza a travessia."
    );
    return;
  }

  if (A === 1 && B === 0) {
    ligar("a-verde", "verde");
    ligar("b-vermelho", "vermelho");
    ligar("p-vermelho", "vermelho");
    atualizarPainel(
      "S0",
      "100001",
      "A ∧ ¬B ∧ ¬P → S0",
      "Há veículos apenas na Via A, então a Via A é liberada."
    );
    return;
  }

  if (B === 1 && A === 0) {
    ligar("a-vermelho", "vermelho");
    ligar("b-verde", "verde");
    ligar("p-vermelho", "vermelho");
    atualizarPainel(
      "S2",
      "001100",
      "B ∧ ¬A ∧ ¬P → S2",
      "Há veículos apenas na Via B, então a Via B é liberada."
    );
    return;
  }

  if (A === 1 && B === 1) {
    if (contador % 2 === 0) {
      ligar("a-verde", "verde");
      ligar("b-vermelho", "vermelho");
      ligar("p-vermelho", "vermelho");
      atualizarPainel(
        "S0",
        "100001",
        "A ∧ B ∧ ¬P → alternância",
        "Como há veículos nas duas vias, o sistema alterna e libera a Via A neste ciclo."
      );
    } else {
      ligar("a-vermelho", "vermelho");
      ligar("b-verde", "verde");
      ligar("p-vermelho", "vermelho");
      atualizarPainel(
        "S2",
        "001100",
        "A ∧ B ∧ ¬P → alternância",
        "Como há veículos nas duas vias, o sistema alterna e libera a Via B neste ciclo."
      );
    }
    contador++;
    return;
  }

  ligar("a-verde", "verde");
  ligar("b-vermelho", "vermelho");
  ligar("p-vermelho", "vermelho");
  atualizarPainel(
    "S0",
    "100001",
    "¬A ∧ ¬B ∧ ¬P → S0",
    "Não há veículos nem pedestres, então o sistema mantém o ciclo padrão."
  );
}

function modoAutomatico() {
  automatico = !automatico;

  if (automatico) {
    intervalo = setInterval(() => {
      const cenario = cenarios[contador % cenarios.length];

      document.getElementById("viaA").checked = cenario[0] === 1;
      document.getElementById("viaB").checked = cenario[1] === 1;
      document.getElementById("pedestre").checked = cenario[2] === 1;

      calcularSemaforo();
      contador++;
    }, 1800);
  } else {
    clearInterval(intervalo);
  }
}

calcularSemaforo();
