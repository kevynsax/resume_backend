import {Endpoint, injectHelpers} from "src/middleware/injectHelpers";
import {ClassMiddleware, Controller, Post} from "@overnightjs/core";
import {IUserApp} from "src/user/UserApp";
import {UserViewModel} from "src/user/userViewModels";

@Controller("api/user")
@ClassMiddleware(injectHelpers)
export class UserController {

    constructor(private app: IUserApp){}

    @Post("")
    public insertUser: Endpoint = async (req, res): Promise<void> => {
        const ipAddress = req.connection?.remoteAddress || "";
        
       const result = this.app.createUser(ipAddress)
           .then(id => ({id} as UserViewModel));
       return res.unwrap(result);
    }
}