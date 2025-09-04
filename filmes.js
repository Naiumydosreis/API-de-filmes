const express = require('express');
const router = express.Router();

const filmes = [];

router.post('/', (req, res) => {
    const {titulo, ano} = req.body

    const novoFilme = {
        id: filmes.length + 1,
        titulo,
        ano,
        reviews: []
    };

    filmes.push(novoFilme);

    res.status(201).json({
        message: "Filme criado com sucesso!",
        filme: novoFilme
    });
});

router.get('/', (req, res) => {
    res.json(filmes)
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const filme = filmes.find(f => f.id === id) 

  if (!filme) {
    return res.status(404).json({ message: "Filme não encontrado" })
  };

  res.json(filme)
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const filme = filmes.find(f => f.id === id)
    
    if (!filme) {
        return res.status(404).json({
            message: "Filme não encontrado"
        });
    };

    const {titulo, ano} = req.body
    if (titulo) filme.titulo = titulo
    if (ano) filme.ano = ano

    res.json({
        message: "Filme atualizado com sucesso!",
        filme
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = filmes.findIndex(f => f.id === id)
    if (index === -1) {
        return res.status(404).json({
            message: "Filme não encontrado"
        });
    };

    const filmeRemovido = filmes.splice(index, 1)
    res.json({
        message: "Filme deletado com sucesso!",
        filme: filmeRemovido[0]
    });
});

// CRUD de review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id)
    const filme = filmes.find(f => f.id === id)

    if (!filme) {
        return res.status(404).json({
            message: "Filme não encontrado"
        });
    };

    const novaReview = {
        id: filme.reviews.length + 1,
        comentario: req.body.comentario,
        nota: req.body.nota
    };

    filme.reviews.push(novaReview)
    res.status(201).json(novaReview)
});

router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id)
    const filme = filmes.find(f => f.id === id)

    if (!filme) {
        return res.status(404).json({
            message: "Filme não encontrado"
        });
    };

    res.json(filme.reviews)
});

router.put('/:id/reviews/:reviewsId', (req, res) => {
    const id =  parseInt(req.params.id)
    const reviewsId = parseInt(req.params.reviewsId)
    const filme = filmes.find(f => f.id === id)

    if (!filme) {
        return res.status(404).json({
            message: "Filme não encontrado"
        });
    };

    const review = filme.reviews.find(r => r.id === reviewsId)
    if (!review) {
        return res.status(404).json({
              message: "Review não encontrada"
        });
    };

    review.comentario = req.body.comentario || review.comentario
    review.nota = req.body.nota || review.nota
    
    res.json(review)
});

router.delete('/:id/reviews/:reviewsId', (req, res) => {
    const id =  parseInt(req.params.id)
    const reviewsId = parseInt(req.params.reviewsId)
    const filme = filmes.find(f => f.id === id)

    if (!filme) {
        return res.status(404).json({
            message: "Filme não encontrado"
        });
    };

    const index = filme.reviews.findIndex(r => r.id === reviewsId)
    if (index === -1) {
        return res.status(404).json({
            message: "Review não encontrada"
        });
    };
    
    const reviewRemovida = filme.reviews.splice(index, 1)

    res.json({
        message: "Review deletada com sucesso!",
        review: reviewRemovida[0]
    });
});

module.exports = router