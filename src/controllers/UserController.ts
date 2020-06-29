import {IUserApp} from "src/model/user/UserApp";
import {CreateUserViewModel, UserViewModel} from "src/viewModel/userViewModels";
import {Endpoint} from "src/middleware/injectHelpers";

export class UserController {

    constructor(private app: IUserApp){}

    public insertUser: Endpoint = async (req, res): Promise<void> =>{
        const {ipAddress} = req.body as CreateUserViewModel;
        
       const result = this.app.createUser(ipAddress)
           .then(id => ({id} as UserViewModel));
       return res.unwrap(result);
    }
}