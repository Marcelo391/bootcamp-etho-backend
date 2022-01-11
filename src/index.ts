import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import { apiRouter } from './routes/api.routes';
import { extRouter } from './routes/external.routes';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(apiRouter);
app.use(extRouter);

const ENV_VARS = {
    
    mongoURI: process.env.MONGO_URI,
    token_secret: process.env.TOKEN_SECRET
}
// port: process.env.PORT,

mongoose.connect(ENV_VARS.mongoURI as string);

export const handler = serverless(app, { callbackWaitForEmptyEventLoop: false});

// app.listen(config.PORT, async () => {
//     console.log('Server funcionando na porta ',config.PORT);
    
//     if(ENV_VARS.mongoURI)
//         mongoose.connect(ENV_VARS.mongoURI);
//     else
//         console.log('Erro na conexão com DB');
    
// });

export { ENV_VARS }

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