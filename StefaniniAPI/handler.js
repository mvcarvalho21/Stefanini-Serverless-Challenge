const customExpress = require('./src/application/config/customExpress')
const conexao = require('./src/framework/infraestrutura/conexao')
const Tabelas = require('./src/framework/infraestrutura/tabelas')

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



/*const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})*/

