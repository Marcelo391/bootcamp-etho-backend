import { Request, Response } from "express";
import { User } from "../models/user.model";


function index(req: Request, res: Response){
    return res.status(200).json('Rota de Filmes');
}

export { index }