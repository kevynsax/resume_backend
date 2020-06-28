import {Reaction} from "src/model/blog/types";
import {Document, Model} from "mongoose";

export type ReactionModel = Reaction & Document;

export type IReactionRepo = Model<ReactionModel>;