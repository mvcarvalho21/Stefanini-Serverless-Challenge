"use strict";

module.exports.getFuncionarios = async (event) => {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "funcionarios.cbmr2sjuajxv.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "11223344",
    database: "app",
  });

  const p = new Promise((resolve) => {
    connection.query("SELECT * FROM funcionarios", function (err, results) {
      resolve(results);
    });
  });

  const result = await p;

  return {
    statusCode: 200,
    body: JSON.stringify({ results: result }),
  };
};
