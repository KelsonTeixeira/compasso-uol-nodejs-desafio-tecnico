# compasso-uol-nodejs-desafio-tecnico
Desafio Técnico da Compasso Uol para a vaga de NodeJS

#
Para esse desafio foram utilizados principalmente o NodeJS, Express, NeBD e o JestJS.

Optei por usar um **NeDB**, devido ao fato de ser um banco de dados em JavaScript, que salva os dados em arquivo de texto, tornando ele ótimo para projetos simples e que não irão para a produção.

Já o uso do **JestJS** se deu pela escolha de escrever um código utilazando TDD, o que tornou o desenvolvimento muito produtivo.

#
## Instalação
* Para instalação e utilização desse projeto, é necessário fazer o download desse repositório que pode ser por meio do zip ou utilizando o seguinte comando via terminal:
```
 $ git clone https://github.com/KelsonTeixeira/compasso-uol-nodejs-desafio-tecnico.git
```

* Dentro do repositório dentro em seu computador, rode o seguinte comando para intalar as dependências:
```
 $ yarn
```
* Para iniciar o servidor, rode o camando:
```
$ yarn start
```
* Pronto, o servidor já está pronto para receber requisições

# Dados e endpoints

## Cidades 

### Adicionar nova cidade
* POST '/cities', os corpo da requisição deve seguir esse padrão: 
  ```
  { 
    "name": "nome da cidade", 
    "state": "nome do estado" 
  }
  ```

* Resultado da requisição (exemplo): 
  ```
  (201 Created) 
  { 
    "name": "Brasília", 
    "state": "Distrito Federal", 
    "_id": "a7b98bd5-8de0-4e1c-9e03-99e3016f64a9" 
  }
  ```

### Consultar cidade pelo nome
* GET '/cities/name/?name=nome-da-cidade'

* Resultado da requisição (exemplo): 
  ```
  (200 OK)
  [ 
    { 
      "name": "Brasília", 
      "state": "Distrito Federal", 
      "_id": "a7b98bd5-8de0-4e1c-9e03-99e3016f64a9" 
    },
    {
      "name": "Brasília",
      "state": "Distrito Federal",
      "_id": "a7b98bd5-8de0-4e1c-9e03-99e3016f64a9"
    } 
  ]
  ```
* Se a cidade não existe, será exibido uma mensagem de erro:
  ```
  (404 Not Found)
  {
    "error": "City not found!"
  }
  ```

### Consultar cidade pelo estado
* GET '/cities/state/?name=nome-do-estado':
  
* Resultado da requesição (exemplo):
  ```
  (200 OK)
  [
    {
      "name": "Brasília",
      "state": "Distrito Federal",
      "_id": "7e9d0418-022a-44c3-b19a-93358cee809d"
    },
    {
      "name": "Brasília",
      "state": "Distrito Federal",
      "_id": "a7b98bd5-8de0-4e1c-9e03-99e3016f64a9"
    }
  ]
  ```
* Se não existe uma cidade com este estado, será exibido uma mensagem de erro:
  ```
  (404 Not Found)
  {
    "error": "City not found!"
  }
  ```

#
## Clients

## Adicionar novo Cliente

* POST '/clients', os corpo da requisição deve seguir esse padrão: 
  ```
  {
    "birth": "1997-04-09",
    "city": "Brasília",
    "name": "Nome do Cliente",
    "sex": "male"
  }
  ```

* Resultado da requisição (exemplo): 
  ```
  (201 Created) 
  {
    "name": "Nome do Cliente",
    "sex": "male",
    "birth": "1997-04-09T00:00:00.000Z",
    "city": "Brasília",
    "_id": "684e0c84-af45-44f6-9722-9e4882e59782",
    "age": 24
  }
  ```
### Consultar cliente pelo nome
* GET '/clients/name/?name=nome-do-cliente'  

* Resultado da requisição (exemplo): 
  ```
  (200 OK)
  [ 
    {
      "name": "Nome do Cliente",
      "sex": "male",
      "birth": "1997-04-09T00:00:00.000Z",
      "city": "Brasília",
      "_id": "684e0c84-af45-44f6-9722-9e4882e59782",
      "age": 24
    },
    {
      "name": "Nome do Cliente",
      "sex": "male",
      "birth": "1997-04-09T00:00:00.000Z",
      "city": "Brasília",
      "_id": "684e0c84-af45-44f6-9722-9e4882e59782",
      "age": 24
    }
  ]
  ```
* Se não existe um cliente com este nome, será exibido uma mensagem de erro:
  ```
  (404 Not Found)
  {
    "error": "Client not found!"
  }
  ```
  ### Consultar cliente pelo id
* GET '/clients/'  
* Passar pelo header da requisição o id:
  ```
  {
    "id": "684e0c84-af45-44f6-9722-9e4882e59782"
  }
  ```
* Resultado da requisição (exemplo): 
  ```
  (200 OK)
  {
    "name": "Nome do Cliente",
    "sex": "male",
    "birth": "1997-04-09T00:00:00.000Z",
    "city": "Brasília",
    "_id": "684e0c84-af45-44f6-9722-9e4882e59782",
    "age": 24
  }
  ```
* Se não existe um cliente com este id, será exibido uma mensagem de erro:
  ```
  (404 Not Found)
  {
    "error": "Client not found!"
  }
  ```

### Deletar Cliente
* DELETE '/clients/'  
* Passar pelo header da requisição o id:
  ```
  {
    "id": "684e0c84-af45-44f6-9722-9e4882e59782"
  }
  ```
* Resultado da requisição (exemplo): 
  ```
  (204 No Content)
  ```
* Se não existe um cliente com este id, será exibido uma mensagem de erro:
  ```
  (404 Not Found)
  {
    "error": "Client not found!"
  }
  ```

## Atualizar nome do Cliente

* PATCH '/clients'
* Passar pelo header da requisição o id:
  ```
  {
    "id": "684e0c84-af45-44f6-9722-9e4882e59782"
  }
  ```
* Os corpo da requisição deve seguir esse padrão: 
  ```
  {
    "name": "Novo nome do Cliente"
  }
  ```

* Resultado da requisição (exemplo): 
  ```
  (200 OK)
  ```
* Se não existe um cliente com este id, será exibido uma mensagem de erro:
  ```
  (404 Not Found)
  {
    "error": "Client not found!"
  }
  ```