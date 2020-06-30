import 'module-alias/register';
import {ResumeServer} from "src/ResumeServer";
import {dbConnection, port} from "src/constants";
import {connect} from "mongoose";
import {BlogApp} from "src/blog/BlogApp";
import {ReactionRepo} from "src/blog/ReactionRepo";
import {BlogController} from "src/blog/BlogController";
import {UserController} from "src/user/UserController";
import {UserApp} from "src/user/UserApp";
import {UserRepo} from "src/user/UserRepo";
import Axios from "axios";

const createConnection = (): void => {
    connect(dbConnection)
        .then(() => 
            console.log(`Database connected using uri ${dbConnection}`))
        .catch(err => {
            console.warn(`Error on connection: ${dbConnection}\n try again in 10 sec`);
            console.error(err);
            setTimeout(createConnection, 10 * 1000);
        });
};

createConnection();

const blogApp = new BlogApp(ReactionRepo);
const blogController = new BlogController(blogApp);

const userApp = new UserApp(UserRepo, Axios);
const userController = new UserController(userApp);

const controllers = [blogController, userController];
const server = new ResumeServer(controllers);

server.start(port);