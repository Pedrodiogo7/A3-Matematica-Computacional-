# 🚦 Sistema de Semáforo Inteligente

Projeto desenvolvido para a disciplina de **Matemática Computacional Aplicada**.

## 🎯 Objetivo

Desenvolver um modelo computacional simplificado de um sistema de controle de semáforo inteligente utilizando:

- Sistemas numéricos binários
- Lógica proposicional
- Álgebra booleana
- Teoria dos conjuntos
- Tabela-verdade
- Máquina de estados
- Programação em Python

---

## 🌍 Problema

O sistema simula um cruzamento urbano contendo:

- Via A
- Via B
- Faixa de pedestres

O objetivo é decidir automaticamente qual fluxo deve ser liberado com base na presença de veículos e pedestres.

---

## 🧮 Modelagem com Conjuntos

Foram definidos os seguintes conjuntos:

A = Veículos da Via A

B = Veículos da Via B

P = Pedestres aguardando travessia

Exemplos:

- v ∈ A
- v ∈ B
- p ∈ P

União dos elementos monitorados:

T = A ∪ B ∪ P

---

## 🚦 Estados do Sistema

E = {S0, S1, S2, S3, S4}

| Estado | Descrição |
|----------|----------|
| S0 | Via A Verde |
| S1 | Via A Amarelo |
| S2 | Via B Verde |
| S3 | Via B Amarelo |
| S4 | Pedestre Verde |

---

## 💻 Representação Binária

| Estado | Binário |
|----------|----------|
| S0 | 100001 |
| S1 | 010001 |
| S2 | 001100 |
| S3 | 001010 |
| S4 | 001001 |

---

## 📊 Tabela-Verdade

| A | B | P | Resultado |
|---|---|---|---|
| 0 | 0 | 0 | S0 |
| 0 | 0 | 1 | S4 |
| 0 | 1 | 0 | S2 |
| 0 | 1 | 1 | S4 |
| 1 | 0 | 0 | S0 |
| 1 | 0 | 1 | S4 |
| 1 | 1 | 0 | Alterna entre S0 e S2 |
| 1 | 1 | 1 | S4 |

---

## 🧠 Regras Lógicas

### Prioridade para pedestres

P → S4

### Veículos apenas na Via A

A ∧ ¬B ∧ ¬P → S0

### Veículos apenas na Via B

B ∧ ¬A ∧ ¬P → S2

### Veículos nas duas vias

A ∧ B ∧ ¬P → Alternância entre S0 e S2

---

## 🔄 Máquina de Estados

S0 → S1 → S2 → S3 → S0

Quando existe solicitação de pedestre:

S0/S1/S2/S3 → S4 → Retorno ao ciclo normal

---

## 🐍 Implementação

O sistema foi implementado em Python.

Funcionalidades:

- Recebimento de entradas
- Aplicação de regras lógicas
- Decisão automática do estado
- Representação binária
- Simulação do semáforo

---

## ▶️ Execução

Execute:

