const conexao = require('../infraestrutura/conexao')

class Funcionario {
    adiciona(funcionario, res) {      
        const funcionarioValido = funcionario.cliente.length >= 5
        const cargoValido = funcionario.nome.length >= 5

        const validacoes = [
            {
                nome: 'nome',
                valido: funcionarioValido,
                mensagem: 'Funcionario deve ter pelo menos cinco caracteres'
            },
            {
                nome: 'cargo',
                valido: cargoValido,
                mensagem: 'Cargo deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO funcionarios SET ?'
    
            conexao.query(sql, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(funcionario)
                }
            })
        }
       
    }

    lista(res) {
        const sql = 'SELECT * FROM funcionarios'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM funcionarios WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const funcionario = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(funcionario)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE funcionarios SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM funcionarios WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Funcionario