import {IBlogApp} from "src/model/blog/BlogApp";
import {Reaction} from "src/model/blog/types";
import {ClassMiddleware, Controller, Get, Post} from "@overnightjs/core";
import {Endpoint, injectHelpers} from "src/middleware/injectHelpers";

export const blogRoute = "api/blog";

@Controller(blogRoute)
@ClassMiddleware(injectHelpers)
export class BlogController {
    
    constructor(private app: IBlogApp){};
    
    @Post("reaction")
    public insertReaction: Endpoint = (req, {unwrap}) => {
        const {type, idArticle, idUser} = req.body;
        
        const result = this.app.createReaction({type, idArticle, idUser} as Reaction);
        return unwrap(result);
    };
    
    @Get("reaction/:idUser")
    public listReactions: Endpoint = (req, {unwrap}) => {
        const {idUser} = req.params;
        
        const result = this.app.listReactionsByUser(idUser);
        return unwrap(result);
    }
}
