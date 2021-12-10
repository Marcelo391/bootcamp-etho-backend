import express from 'express';
import mongoose from 'mongoose';
import config from './config';


const app = express();

app.use(express.json());

app.get('/', (req, res)  => {

    res.status(200).json({
        message: 'Criamos um servidor Express'
    });

});


app.listen(config.PORT, () => {
    console.log('Server funcionando na porta ',config.PORT);
    mongoose.connect(config.MONGO_URI);
    
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