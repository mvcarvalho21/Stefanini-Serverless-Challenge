class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarFuncionario()
    }

    criarFuncionario() {
        const sql = 'CREATE TABLE IF NOT EXISTS funcionarios (id int NOT NULL AUTO_INCREMENT, nome varchar(255) NOT NULL, idade varchar(20), cargo(255) NOT NULL)'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Funcionários criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas