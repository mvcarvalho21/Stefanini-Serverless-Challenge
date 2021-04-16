const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: "funcionarios.cbmr2sjuajxv.sa-east-1.rds.amazonaws.com",
    user: "admin",
    password: "11223344",
    database: "app",
})

module.exports = conexao