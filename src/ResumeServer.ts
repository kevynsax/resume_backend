import {Server} from "@overnightjs/core";
import * as bodyParser from "body-parser";
import {Application} from "express";

export class ResumeServer extends Server{
    constructor(controllers: InstanceType<any>[]){
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        
        super.addControllers(controllers);
    }
    
    public get appExpress(): Application{
        return this.app;
    }
}