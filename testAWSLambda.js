/*
----------------------------------------------------------
TESTE DE API SERVERLESS CRUD COM API GATEWAY E DYNAMO DB
----------------------------------------------------------

- Criar uma conta na AWS
- Criar uma tabela no banco de dados DynamoDB na AWS com nome "product-inventory" e primary key "productId"
- Criar uma função "serverless-api" na AWS Lambda e em permissões, adicionar uma new role com o nome "serverless-api-role"
- Adicionar nas permissões da role "serverless-api-role" as políticas: "AmazonDynamoDBFullAccess" e "CloudWatchLogsFullAccess"
- Criar uma API no API Gateway com nome "serverless-api"
- Adicionar na API Gateway (marcando a opção "API Gateway CORS") os recursos "company", "products" e "product".
- Criar o método "GET" em "company" e em "poducts", marcando a opção "Lambda proxy integration", "default timeout" e com a função lambda de nome "serverless-api"
- Criar os métodos "GET", "POST", "PATCH" e "DELETE" em "product", marcando a opção "Lambda proxy integration", "default timeout" e com a função lambda de nome "serverless-api"
- Fazer Deply da API com "stage name: prod"
- Copiar e colar o código desse arquivo na serverless-api criada no API Gateway
- Utilizar a "Invoke URL" gerada no deploy do API Gateway no software Postman ou Insomnia para verificar o CRUD dos produtos

*/

const AWS = require("aws-sdk");
AWS.config.update({
  region: "sa-east-1",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "product-inventory";
const companyPath = "/company";
const productsPath = "/products";
const productPath = "/product";

exports.handler = async function (event) {
  console.log("Request event", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === companyPath:
      response = buildResponse(200);
      break;
    case event.httpMethod == "GET" && event.path === productPath:
      response = await getProduct(event.queryStringParameters.productId);
      break;
    case event.httpMethod === "GET" && event.path === productsPath:
      response = await getProducts();
      break;
    case event.httpMethod === "POST" && event.path === productPath:
      response = await saveProduct(JSON.parse(event.body));
      break;
    case event.httpMethod === "PATCH" && event.path === productPath:
      const requestBody = JSON.parse(event.body);
      response = await modifyProduct(
        requestBody.productId,
        requestBody.updateKey,
        requestBody.updateValue
      );
      break;
    case event.httpMethod === "DELETE" && event.path === productPath:
      response = await deleteProduct(JSON.parse(event.body).productId);
      break;
    default:
      response = buildResponse("404 - Não Econtrado");
  }
  return response;
};

async function getProduct(productId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: productId,
    },
  };
  return await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        return buildResponse(200, response.Item);
      },
      (error) => {
        console.error("Erro: Produto não encontrado", error);
      }
    );
}

async function getProducts() {
  const params = {
    TableName: dynamodbTableName,
  };
  const allProducts = await scanDynamoRecords(params, []);
  const body = {
    products: allProducts,
  };
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error("Erro: Produtos não encontrados", error);
  }
}

async function saveProduct(requestBody) {
  const params = {
    Item: requestBody,
  };
  return await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: requestBody,
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error("Erro ao cadastrar produto", error);
      }
    );
}

async function modifyProduct(productId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: productId,
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAtributeValues: {
      ":value": updateValue,
    },
    ReturnValues: "UPDATED_NEW",
  };
  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operations: "UPDATE",
          Message: "SUCCESS",
          Item: response,
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error("Erro ao modificar produto", error);
      }
    );
}

async function deleteProduct(product) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: productId,
    },
    ReturnValues: "ALL_OLD",
  };
  return await dynamodb
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operations: "DELETE",
          Message: "SUCCESS",
          Item: response,
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error("Erro ao deletar produto", error);
      }
    );
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
