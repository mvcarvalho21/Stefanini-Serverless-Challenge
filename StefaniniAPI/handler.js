const customExpress = require('./src/application/config/customExpress')
const conexao = require('./src/framework/infraestrutura/conexao')
const Tabelas = require('./src/framework/infraestrutura/tabelas')

"use strict";

module.exports.getFuncionarios = async (event) => {
  const p = new Promise((resolve) => {
    conexao.query("SELECT * FROM funcionarios", function (err, results) {
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
        console.erro("Erro: Falha ao conectar", erro);
    } else {
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})*/

