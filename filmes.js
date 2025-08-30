const express = require('express')
const router = express.Router()

const filmes = []

router.post('/', (req, res) => {
    const {titulo, ano} = req.body

    const novoFilme = {
        id: filmes.length +1,
        titulo,
        ano
    }

    filmes.push(novoFilme);

    res.status(201).json({
        message: "Filme criado com sucesso!",
        filme: novoFilme
    })
});

router.get('/', (req, res) => {
    res.json(filmes)
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const filme = filmes.find(f => f.id === id) 

  if (!filme) {
    return res.status(404).json({ message: "Filme não encontrado" })
  }

  res.json(filme)
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const filme = filmes.find(f => f.id === id)
    
    if (!filme) {
        return res.status(404).json({
            message: "Filme não encontrado"
        })
    }

    const {titulo, ano} = req.body
    if (titulo) filme.titulo = titulo
    if (ano) filme.ano = ano

    res.json({
        message: "Filme atualizado com sucesso!",
        filme
    })
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = filmes.findIndex(f => f.id === id)
    if (index ) {
        
    }
})

module.exports = router