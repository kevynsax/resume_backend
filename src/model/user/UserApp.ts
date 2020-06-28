import {IUserRepo} from "src/model/user/UserRepo";
import {Geolocation, User} from "src/model/user/types";

export interface IUserApp {
    createUser: (ipAddress: string) => Promise<string>
}

export class  UserApp implements IUserApp {
    
    constructor(private repo: IUserRepo){} 
    
    public createUser = (ipAddress: string) => {
        const user: User = { ipAddress, geolocation: {} as Geolocation };
        
        return this.repo.create(user)
            .then(x => x._id);
    };
}