# compasso-uol-nodejs-desafio-tecnico
Desafio Técnico da Compasso Uol para a vaga de NodeJS

#
Para esse desafio foram utilizados principalmente o NodeJS, Express, NeBD e o JestJS.

Optei por usar um **NeDB**, devido ao fato de ser um banco de dados em JavaScript, que salva os dados em arquivo de texto, tornando ele ótimo para projetos simples e que não irão para a produção.

Já o uso do **JestJS** se deu pela escolha de escrever um código utilazando TDD, o que tornou o desenvolvimento muito produtivo.

#
## Instalação
* Para instalação e utilização desse projeto, é necessário fazer o download desse repositório que pode ser por meio do zip ou utilizando o seguinte comando via terminal:

* $ git clone https://github.com/KelsonTeixeira/compasso-uol-nodejs-desafio-tecnico.git

* Dentro do repositório dentro em seu computador, rode o seguinte comando para intalar as dependências:

* $ yarn

* Para iniciar o servidor, rode o camando:
  
* $ yarn start

* Pronto, o servidor já está pronto para receber requisições

## Dados e endpoints

### Adicionar nova cidade
* POST '/cities', os corpo da requisição deve seguir esse padrão: \
  { \
    "name": "nome da cidade", \
    "state": "nome do estado" \
  }

### Consultar cidade pelo nome


