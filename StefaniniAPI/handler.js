const customExpress = require('./src/application/config/customExpress')
const conexao = require('./src/framework/infraestrutura/conexao')
const Tabelas = require('./src/framework/infraestrutura/tabelas')

"use strict";

module.exports.getFuncionarios = async (event) => {
  const connection = conexao

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

/*const customExpress = require("./src/application/config/customExpress");
const conexao = require("./src/framework/infraestrutura/conexao");
const Tabelas = require("./src/framework/infraestrutura/tabelas");

("use strict");
console.log(customExpress)

module.exports.getFuncionarios = async (event) => {
  conexao.connect((erro) => {
    if (erro) {
      console.log(erro);
    } else {
      console.log("conectado com sucesso");

      Tabelas.init(conexao);

      const app = customExpress();

      app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    }
  });
};*/