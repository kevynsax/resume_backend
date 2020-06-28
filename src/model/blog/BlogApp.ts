import {Reaction} from "src/model/blog/types";
import {IReactionRepo} from "src/model/blog/BlogRepo";

export interface IBlogApp {
    createReaction: (reaction: Reaction) => Promise<void>;
}

export class BlogApp implements IBlogApp{
    
    constructor(private repo: IReactionRepo){};
    
    createReaction = async (reaction: Reaction) => {
        await this.repo.create(reaction);
    };
    
}