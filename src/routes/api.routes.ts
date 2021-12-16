import { Router } from "express";
import * as userController from '../controllers/user.controller';
import * as sessionController from '../controllers/session.controller';
import * as movieController from '../controllers/movie.controller';
import * as listController from '../controllers/list.controller';
import { authorize } from "../middlewares/auth";

const apiRouter = Router();


/* Rotas Gerais */

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
// apiRouter.get('/users/all', userController.viewAll);
apiRouter.delete('/users/delete/:id', authorize, userController.destroy);

/* Rotas de Filmes */
apiRouter.get('/movies', movieController.index);
apiRouter.get('/movies/id/:id', authorize, movieController.view);
apiRouter.get('/movies/:search', authorize, movieController.search);
apiRouter.post('/movies/new', authorize, movieController.create);

/* Rotas de Lista */
apiRouter.get('/list', authorize, listController.index);
apiRouter.post('/list/add/:id', authorize, listController.add);
apiRouter.delete('/list/remove/:id', authorize, listController.remove);

export  { apiRouter };


// app.get('/', (req, res)  => {

//     res.status(200).json({
//         message: 'Criamos um servidor Express'
//     });

// });