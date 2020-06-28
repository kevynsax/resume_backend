import {Reaction} from "src/model/blog/types";

export interface IBlogApp {
    createReaction: (reaction: Reaction) => Promise<void>;
}