import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../index';

interface JWToken {
    id?: string,
    iat?: string,
    exp?: string
}


function authorize(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    

    if(!authorization){
        return res.status(401).json({ 
            message: 'Sem autorização'
        });
    }

    const token = authorization.replace('Bearer', '').trim();

    try{

        if(ENV_VARS.token_secret){
            const data = jwt.verify(token, ENV_VARS.token_secret);
             const { id } = data as JWToken;
            req.user = id;            
            return next(); 
        }       
        

    }catch(error){
        console.log(error);
        return res.status(401).json({ error });
    }
    return token;

}

export { authorize };