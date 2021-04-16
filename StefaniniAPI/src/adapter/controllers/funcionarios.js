const Funcionario = require('../../framework/models/funcionarios')

module.exports = app => {
    app.get('/funcionarios', (req, res) => {
        Funcionario.lista(res)
    })

    app.get('/funcionarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Funcionario.buscaPorId(id, res)
    })

    app.post('/funcionarios', (req, res) => {
       const funcionario = req.body

       Funcionario.adiciona(funcionario, res)
    }) 

    app.patch('/funcionarios/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Funcionario.altera(id, valores, res)
    })

    app.delete('/funcionarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Funcionario.deleta(id, res)
    })
}