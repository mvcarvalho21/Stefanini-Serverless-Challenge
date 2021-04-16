import { config, DynamoDB } from "aws-sdk";
config.update({
  region: "sa-east-1",
});
const dynamodb = new DynamoDB.DocumentClient();
const dynamodbTableName = "product-inventory";
const companyPath = "/company";
const productsPath = "/products";
const productPath = "/product";

export async function handler (event) {
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
}

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

async function deleteProduct(productId) {
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