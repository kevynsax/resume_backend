import {Reaction, ReactionTypeEnum} from "src/model/blog/types";
import {Document, model, Model, Schema} from "mongoose";

export const reactionCollection = 'blogReactions';
export type ReactionModel = Reaction & Document;

export type IReactionRepo = Model<ReactionModel>;

const schema = new Schema<ReactionModel>({
    type: {type: ReactionTypeEnum, required: true},
    idArticle: {type: String, required: true},
    idUser: {type: String, required: true}
});

export const ReactionRepo = 
    model<ReactionModel>(reactionCollection, schema, reactionCollection);

