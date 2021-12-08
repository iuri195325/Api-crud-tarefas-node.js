const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Tarefas =  require('./database/tarefas');

app.use(express.json());

//testando a conexão
connection.authenticate().then(()=>{
    console.log("connected..");
}).catch((err) =>{
    console.log(err);
});

//bodyParser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//listando todas as tarefas
app.get('/tarefas', (req, res) => {
    
    Tarefas.findAll({raw: true}).then(tarefas => {   
        res.statusCode = 200;
        return res.json(tarefas);             
    });
});

//listando uma tarefa pelo id
app.get("/tarefa/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        Tarefas.findOne({where: {id: id}}).then(tarefas => {

            if(tarefas != undefined){
                res.statusCode = 200;
                return res.json(tarefas);
            }else{
                res.sendStatus(400);
            }
        });
    }
});

//Criando uma noca tarefa
app.post('/tarefa', (req,res) => {
    var {nome,conteudo,autor} = req.body;

    Tarefas.create({
        nome: nome,
        conteudo: conteudo,
        autor: autor
    }).then(() => {res.sendStatus(200);});
    
});

//Delete uma tarefa
app.delete('/tarefa/:id', (req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id);
        Tarefas.findOne({where: {id: id}}).then(tarefas => {

            if(tarefas != undefined){

                res.sendStatus(200);
                Tarefas.destroy({ where: { id: id }});
                
            }else{
                res.sendStatus(400);
            }
        });
    }
});

app.put('/tarefa/:id', (req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);
        var {nome,conteudo,autor} = req.body;

        Tarefas.findOne({where: {id: id}}).then(tarefas => {

            if(tarefas != undefined) {

                tarefas.update({
                    nome: nome,
                    conteudo: conteudo,
                    autor: autor
                    }).then(() => {
                        res.sendStatus(200);
                    });

            }else{
                res.sendStatus(400); 
            }
        });    
    }
});

app.listen(8181);



