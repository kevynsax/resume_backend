import {IUserApp} from "src/model/user/UserApp";
import {CreateUserViewModel, UserViewModel} from "src/viewModel/userViewModels";
import {Endpoint, injectHelpers} from "src/middleware/injectHelpers";
import {ClassMiddleware, Controller, Post} from "@overnightjs/core";

@Controller("api/user")
@ClassMiddleware(injectHelpers)
export class UserController {

    constructor(private app: IUserApp){}

    @Post("")
    public insertUser: Endpoint = async (req, res): Promise<void> =>{
        const {ipAddress} = req.body as CreateUserViewModel;
        
       const result = this.app.createUser(ipAddress)
           .then(id => ({id} as UserViewModel));
       return res.unwrap(result);
    }
}