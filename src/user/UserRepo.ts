import {Model, Document, model, Schema} from "mongoose";
import {User} from "src/user/types";

export const userCollection = 'users'
export type UserModel = User & Document;

export type IUserRepo = Model<UserModel>;

const schema = new Schema<UserModel>({
    ipAddress: {type: String, required: true},
    geolocation: {type: {
        continent_code: {type: String, required: true},
        continent_name: {type: String, required: true},
        country_code: {type: String, required: true},
        country_name: {type: String, required: true},
        region_code: {type: String, required: true},
        region_name: {type: String, required: true},
        city: {type: String, required: true},
        zip: {type: String, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
    }, required: false}
});

export const UserRepo = model<UserModel>(userCollection, schema);






















































