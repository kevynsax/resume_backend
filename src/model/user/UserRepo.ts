import {User} from "src/model/user/types";
import {Model, Document} from "mongoose";

export type UserModel = User & Document;

export type IUserRepo = Model<UserModel>;