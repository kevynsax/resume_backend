import {Model, Document} from "mongoose";
import {User} from "src/user/types";

export type UserModel = User & Document;

export type IUserRepo = Model<UserModel>;