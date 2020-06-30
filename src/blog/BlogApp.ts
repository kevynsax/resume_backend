import {Reaction} from "src/blog/types";
import {IReactionRepo} from "src/blog/ReactionRepo";

export const active = true;

export interface IBlogApp {
    createReaction: (reaction: Reaction) => Promise<void>;
    listReactionsByUser: (id: string) => Promise<Reaction[]>;
    deleteReaction: (idUser: string, idArticle: string) => Promise<void>;
}

export class BlogApp implements IBlogApp{
    
    constructor(private repo: IReactionRepo){};
    
    createReaction = async (reaction: Reaction) => {
        await this.repo.create(reaction);
    };
    
    listReactionsByUser = (id: string) =>
        this.repo.find({idUser: id, active})
            .then(lst => lst.map(({type, idArticle, idUser}) => ({type, idArticle, idUser} as Reaction)));
    
    deleteReaction = (idUser: string, idArticle: string) => {
        throw new Error("not implemented");
    };
}