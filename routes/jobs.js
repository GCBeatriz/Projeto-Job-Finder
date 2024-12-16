const express = require('express');
const router = express.Router();
const Job = require('../models/job'); // Importar o modelo Job

// rota de teste
router.get('/test', (req, res) => {
    res.send('deu certo');
})

// detalhe da vaga -> view/1, view/2

router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}
}).then(job => {

    res.render('view', {
       job 
    });
}) 

.catch(err => console.log(err)));

// form da rota de envio

router.get('/add', (req, res) => {
    res.render('add'); 
})

// add job via post

router.post('/add', (req, res) => {
    console.log(req.body);

    let {title, salary, company, description, email, new_job} = req.body; //todos osdados de titulo salario empresa... vao vir por essa propriedade

    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/')) //redireciona para a página inicial
    .catch(err => console.log(err));
});

module.exports = router //sempre lembrar de exportar