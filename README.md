# Stefanini-Serverless-Challenge
Projeto desenvolvido para desafio "Servless Challenge" utilizando NodeJS e AWS Lambda

## Teste de API SERVERLESS CRUD com API GATEWAY e DynamoDB

- Criar uma conta na AWS;
- Criar uma tabela no banco de dados DynamoDB na AWS com nome "product-inventory" e primary key "productId";
- Criar uma função "serverless-api" na AWS Lambda e em permissões, adicionar uma new role com o nome "serverless-api-role";
- Adicionar nas permissões da role "serverless-api-role" as políticas: "AmazonDynamoDBFullAccess" e "CloudWatchLogsFullAccess";
- Criar uma API no API Gateway com nome "serverless-api";
- Adicionar na API Gateway (marcando a opção "API Gateway CORS") os recursos "company", "products" e "product";
- Criar o método "GET" em "company" e em "poducts", marcando a opção "Lambda proxy integration", "default timeout" e com a função lambda de nome "serverless-api";
- Criar os métodos "GET", "POST", "PATCH" e "DELETE" em "product", marcando a opção "Lambda proxy integration", "default timeout" e com a função lambda de nome "serverless-api";
- Fazer Deply da API com "stage name: prod";
- Copiar e colar o código desse arquivo na serverless-api criada no API Gateway;
- Utilizar a "Invoke URL" gerada no deploy do API Gateway no software Postman ou Insomnia para verificar o CRUD dos produtos.
