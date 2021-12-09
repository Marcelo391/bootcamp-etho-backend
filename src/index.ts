import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res)  => {

    res.status(200).json({
        message: 'Criamos um servidor Express'
    });

});


const port = 5000;
app.listen(port, () => {
    console.log('Server funcionando na porta ',port);
});

/*
import http from 'http';

const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Funcionou.');
});

const port = 5000;
server.listen(port, ()=>{
    console.log('Server funcionando na porta ',port);
});

*/