import {ResumeServer} from "src/ResumeServer";
import {BlogController} from "src/controllers/BlogController";
import {BlogApp} from "src/model/blog/BlogApp";
import {ReactionRepo} from "src/model/blog/ReactionRepo";
import {dbConnection, port} from "src/constants";
import {connect} from "mongoose";

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
const controllers = [blogController];
const server = new ResumeServer(controllers);

server.start(port);