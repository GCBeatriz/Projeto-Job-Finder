const express = require('express');
const router = express.Router();
const Job = require('../models/job'); // Importar o modelo Job

// rota de teste
router.get('/test', (req, res) => {
    res.send('deu certo');
})

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
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router //sempre lembrar de exportar