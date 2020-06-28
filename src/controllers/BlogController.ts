import {Request, Response} from "express";
import {IBlogApp} from "src/model/blog/BlogApp";
import {Reaction} from "src/model/blog/types";
import {httpStatusCode} from "src/constants";

export class BlogController {
    
    constructor(private app: IBlogApp){};
    
    public async insertReaction(req: Request, res: Response): Promise<void>{
        const {type, idArticle} = req.body;
        
        await this.app.createReaction({type, idArticle} as Reaction)
            .then(() => res.sendStatus(httpStatusCode.created))
            .catch(err => res.status(httpStatusCode.internalServerError).send(err.message));
    }
}