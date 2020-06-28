import {Request, Response} from "express";
import {IBlogApp} from "src/model/blog/BlogApp";
import {Reaction} from "src/model/blog/types";
import {httpStatusCode} from "src/constants";
import {Controller, Post} from "@overnightjs/core";

export const blogRoute = "api/blog";

@Controller(blogRoute)
export class BlogController {
    
    constructor(private app: IBlogApp){};
    
    @Post("reaction")
    public async insertReaction(req: Request, res: Response): Promise<void>{
        const {type, idArticle} = req.body;
        
        await this.app.createReaction({type, idArticle} as Reaction)
            .then(() => res.sendStatus(httpStatusCode.created))
            .catch(err => res.status(httpStatusCode.internalServerError).send(err.message));
        
    }
}