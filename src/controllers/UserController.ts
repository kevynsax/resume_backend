import {IUserApp} from "src/model/user/UserApp";
import {Request, Response} from "express";
import {httpStatusCode} from "src/constants";
import {CreateUserViewModel, UserViewModel} from "src/viewModel/userViewModels";

export class UserController {

    constructor(private app: IUserApp){}

    public insertUser = async (req: Request, res: Response): Promise<void> =>{
        const {ipAddress} = req.body as CreateUserViewModel;
        
       await this.app.createUser(ipAddress)
            .then((id) => {
                const result: UserViewModel = {id};
                res.status(httpStatusCode.success).send(result);
            })
            .catch((err) => res.status(httpStatusCode.internalServerError).send(err.message));
    }
}