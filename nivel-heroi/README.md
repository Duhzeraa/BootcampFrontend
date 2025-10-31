# Desafio: Classificador de Nível de Herói

## Descrição
O objetivo deste desafio é criar um sistema simples para classificar o nível de um herói baseado em sua quantidade de experiência (XP). Esse exercício ajuda a praticar conceitos básicos de programação como **variáveis**, **operadores lógicos**, **estruturas condicionais** e **entrada/saída de dados**.

O desafio exige a criação de um programa que leia o nome e a quantidade de XP de um herói e, usando estruturas condicionais (`if`, `else if`), determine o nível correspondente.

## Regras de Classificação
O nível do herói deve seguir a tabela abaixo:

| XP               | Nível       |
|-------------------|-------------|
| menor que 1.000  | Ferro       |
| 1.001 a 2.000     | Bronze      |
| 2.001 a 5.000     | Prata       |
| 5.001 a 7.000     | Ouro        |
| 7.001 a 8.000     | Platina     |
| 8.001 a 9.000     | Ascendente  |
| 9.001 a 10.000    | Imortal     |
| maior ou igual a 10.001 | Radiante |

## Entrada
O programa deve receber:
- Um valor string representando o nome do herói.
- Um valor inteiro representando a quantidade de XP do herói.

## Saída
O programa deve exibir:

## Exemplos
| Entrada               | Saída                                          |
|-----------------------|------------------------------------------------|
| Thor                  | 450                                            |
|                       | O Herói de nome Thor está no nível de Ferro  |
| Loki                  | 6000                                           |
|                       | O Herói de nome Loki está no nível de Ouro   |
| Athena                | 10050                                          |
|                       | O Herói de nome Athena está no nível de Radiante |

## Tecnologias Utilizadas
- JavaScript
- Node.js (opcional para execução local)

## Observações
Este desafio é uma excelente oportunidade para praticar lógica condicional e manipulação de variáveis, além de preparar seu portfólio para projetos reais.
