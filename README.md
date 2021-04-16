# Stefanini-Serverless-Challenge
Projeto desenvolvido para desafio "Servless Challenge" utilizando NodeJS e AWS Lambda

## Estrutura "Clean Architecture"

* 1) enterprise - nessa pasta não foi inserida nenhum arquivo para regra de negócio.
* 2) adapter - nessa pasta consta o arquivo funcionarios.js, utilizado para indicar os caminhos conforme verbos do database.
* 3) application - nessa pasta constam as configurações de customExpress e a api de testes utilizando DynamoDB (em desenvolvimento)
* 4) framework - essa estrutura engloba o modelo com as regras de requisições e infraestrutura do projeto, contendo a tabela do database e as regras para conexão com o mesmo.

## Sequência para instalação de dependências:

*Antes de tudo, deve-se criar uma conta na AWS e acessando o IAM e criar uma chave de acesso para obter uma "access key" e a sua respectiva "secret key*

* 1 - Instalação serverless:   *npm install serverless*
* 2 - Credenciais serverless:   *serverless config credentials --provider aws --key [access key] --secret [secret key] -o*
* 3 - Criar um projeto serverless:   *serverless*
* 4 - instalar dependencias:   *npm install*
* 5 - instalar pacote express:   *npm install express*, *npm install consign* e *npm install body-parser*
* 6 - instalar banco de dados:   *npm i mysql --save*

## Pacotes da aplicação:

* *npm install*
* *npm install express*
* *npm install consign*
* *npm install body-parser*
* *npm i mysql --save*

* deploy do serverless:
*serverless deploy*

## Deploy da aplicação:

* deploy do serverless:
*serverless deploy*

### Link de acesso da API na internet (AWS):

URL da API: https://k7tlkvvt2m.execute-api.sa-east-1.amazonaws.com/dev

* Acessar com Postman ou Insomnia 

### Teste de API SERVERLESS CRUD com API GATEWAY e DynamoDB

* *Nota: API de testes em desenvolvimento*

URL da API:  https://zpq6nmjy0m.execute-api.sa-east-1.amazonaws.com/prod

#### Não foi possível finalizar a integração completa do database com express e realizar os testes com JEST.