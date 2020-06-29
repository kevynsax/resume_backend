import {Reaction} from "src/model/blog/types";
import {IReactionRepo} from "src/model/blog/ReactionRepo";

export interface IBlogApp {
    createReaction: (reaction: Reaction) => Promise<void>;
    listReactionsByUser: (id: string) => Promise<Reaction[]>;
}

export class BlogApp implements IBlogApp{
    
    constructor(private repo: IReactionRepo){};
    
    createReaction = async (reaction: Reaction) => {
        await this.repo.create(reaction);
    };
    
    listReactionsByUser = (id: string) => {
        throw new Error("not implemented");
    };
}