import { Request, Response } from "express";
import { List } from "../models/list.model";
import { Movie } from "../models/movie.model";
import { paginate } from "../middlewares/pagination";
import  mongoose  from "mongoose";



function index(req: Request, res: Response){

    const  userId = req.user;

    List.aggregate([
        {
            $match: {
                'user_id': new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: 'movie_id',
                foreignField: '_id',
                as: 'movie_list'
            }
        }
    ]).exec( (error, list) => {

        if(error){
            console.log(error);
            return res.status(500).json(error);
        }

        const array: any[] = [];
        list.map( (item) => {
            array.push(item.movie_list);
        } );
        
        const result = array.flat(Infinity);

        return res.status(200).json({result});
    });    
}

async function add(req: Request, res: Response){
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if(!movie){
        return res.status(404).json({
            message: 'Filme não encontrado'
        });
    }

    const insideList = await List.findOne( { movie_id: id });

    if(insideList){
        return res.status(401).json({
            message: 'Filme já se encontra na lista'
        });       
    }

    const data = new List({
        user_id: req.user,
        movie_id: movie._id
    })


    data.save((error: any, result: any) => {
        if( error ){
            return res.status(500).json({
                message: 'Erro: '+error
            }); 
        }

        return res.status(201).json({
           result
        }); 

    });

}   

async function remove(req: Request, res: Response){
    const { id } = req.params;
    const movieLista = await List.findOne( { movie_id: id, user_id: req.user });

    console.log(movieLista);

    if(!movieLista){
        return res.status(404).json({
            message: 'Filme não encontrado'
        });
    }

    const deleted = await List.findByIdAndDelete(movieLista._id).catch( error => {
        return res.status(404).json({
            error,
            message: 'Erro ao deletar'
        });
    });   

    //console.log(deleted);
    return res.status(200).json({
        message: 'Item apagado com sucesso'
    })

    // List.remove({ movie_id: id }, (error, result) => {;
    //     if( error ){
    //         return res.status(500).json({
    //             message: 'Erro: '+error
    //         }); 
    //     }

    //     return res.status(201).json({
    //        result
    //     }); 
    // })

}

export { index, add, remove}