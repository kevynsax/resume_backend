import {Document, model, Model, Schema} from "mongoose";
import {Reaction, ReactionTypeEnum} from "src/blog/types";

export const reactionCollection = 'blogReactions';
export type ReactionModel = Reaction & Document & {active?: boolean};

export type IReactionRepo = Model<ReactionModel>;

const schema = new Schema<ReactionModel>({
    type: {type: ReactionTypeEnum, required: true},
    idArticle: {type: String, required: true},
    idUser: {type: String, required: true},
    active: {type: Boolean, required: true, default: true}
});

 

export const ReactionRepo = 
    model<ReactionModel>(reactionCollection, schema, reactionCollection);

