const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection'); //banco de dados na nossa mao
const bodyParser = require('body-parser');
const Job = require('./models/job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000; //COMUM INICIAR O SERVIDOR EM ALGUMA PORTA

app.listen(PORT, function () {
    console.log(`o Express está rodando na porta ${PORT}`); // VAI FAZER O APP ESCUTAR A PORTA E FUNCAO ANONIMA DIZENDO OMNDE TA RODANDO
});

// body parser
app.use(bodyParser.urlencoded({ extended: false}));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
//conexão do banco que vai fazer o teste, senore quye aplicação for utilizada vai ter que passar pela conexão
db
    .authenticate() //retorna uma promisse
    .then(() => {
        console.log("Conectou ao banco com sucesso");
        return db.sync();
    })
    .then(() => {
        console.log("Sincronização de modelos concluída");
    })   
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });

//routes
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%' +search+'%'; // Se digitar PH -> PHP, OU Word -> Wordpress

    if(!search) {
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            console.log("Vagas recuperadas:", jobs);
            res.render('index', {
                jobs, search
            }); //o index vai ser renderizado no index.handlebars (que é o corpo do main)
        })
        .catch(err => {
            console.log("Erro ao buscar vagas:", err); // Adicione este log
            res.status(500).send("Erro ao buscar vagas.");
        })
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [ 
              ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            console.log("Vagas com pesquisa:", jobs);
            res.render('index', {
                jobs, search
            }); //o index vai ser renderizado no index.handlebars (que é o corpo do main)
        })
        .catch(err => {
            console.log("Erro ao buscar vagas com pesquisa:", err);
            res.status(500).send("Erro ao buscar vagas com pesquisa.");
        }); 
    }
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));