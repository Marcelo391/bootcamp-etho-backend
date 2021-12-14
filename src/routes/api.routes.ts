import { Router } from "express";
import * as userController from '../controllers/user.controller';
import * as sessionController from '../controllers/session.controller';
import * as movieController from '../controllers/movie.controller';
import { authorize } from "../middlewares/auth";

const apiRouter = Router();

apiRouter.get('/', (req, res) => {

 return res.json({
        message: 'Nossa Primeira Rota de APi'
    });
});

/* Rotas de Sessão */

apiRouter.post('/session/new', sessionController.create);
apiRouter.get('/session', authorize, sessionController.index);
    
/* Rotas de Usuário */
apiRouter.post('/users/new', userController.create);
apiRouter.get('/users/id/:id', userController.view);
apiRouter.get('/users/all', userController.viewAll);
apiRouter.delete('/users/delete/:id', userController.destroy);

/* Rotas de Filmes */
apiRouter.get('/movies', authorize, movieController.index);


export  { apiRouter };


// app.get('/', (req, res)  => {

//     res.status(200).json({
//         message: 'Criamos um servidor Express'
//     });

// });