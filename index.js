const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const connection = require('./database/database');
const Produtos =  require('./database/tarefas');

app.use(express.json());
app.use(cors());
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
app.get('/produtos', (req, res) => {
    
    Produtos.findAll({raw: true}).then(tarefas => {   
        res.statusCode = 200;
        return res.json(tarefas);             
    });
});

//listando uma tarefa pelo id
app.get("/produto/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        Produtos.findOne({where: {id: id}}).then(tarefas => {

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
app.post('/produto', (req,res) => {
    var {nome,price,quantidade,descri,img} = req.body;

    Produtos.create({

        nome: nome,
        price: price,
        quantidade: quantidade,
        descri: descri,
        img: img

    }).then(() => {res.json(200);});
    
});

//Delete uma tarefa




app.listen(8181);



