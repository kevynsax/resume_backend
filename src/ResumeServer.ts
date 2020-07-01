import {Server} from "@overnightjs/core";
import * as bodyParser from "body-parser";
import {Application, Request, Response} from "express";
import {httpStatusCode} from "src/constants";
import cors from 'cors';

export class ResumeServer extends Server{
    constructor(controllers: InstanceType<any>[]){
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        
        this.app.use(cors());
        
        super.addControllers(controllers);
    }
    
    public get appExpress(): Application{
        return this.app;
    }
    
    public start(port: number){
        this.app.get('*', (req: Request, res: Response) => 
            res.status(httpStatusCode.success).send('Server is online'));
        
        this.app.listen(port, () => console.log(`server listening on ${port}`))
    }
}