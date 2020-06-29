import {Request} from "express";
import {BlogController, blogRoute} from "src/controllers/BlogController";
import {IBlogApp} from "src/model/blog/BlogApp";
import {Reaction, ReactionTypeEnum} from "src/model/blog/types";
import {httpStatusCode} from "src/constants";
import request from 'supertest';
import {ResumeServer} from "src/ResumeServer";
import {ResumeResponse} from "src/middleware/injectHelpers";
import Mock = jest.Mock;


const fakeIdUser = "fake id user";
const fakeReaction: Reaction = {
    type: ReactionTypeEnum.like,
    idArticle: 3,
    idUser: fakeIdUser
};
const listReactions = [fakeReaction];


describe('Blog Controller', () => {
    let app: IBlogApp;
    let target: BlogController;
    let fakeResponse: ResumeResponse;
    let fakeUnwrap: Mock;
    
    beforeEach(() => {
        fakeUnwrap = jest.fn()
            .mockImplementationOnce(x => x);

        fakeResponse = {
            unwrap: fakeUnwrap
        } as unknown as ResumeResponse;
        
        const createReaction = jest.fn()
            .mockImplementationOnce(() => new Promise<void>(resolve => resolve()));

        const listReactionsByUser = jest.fn()
            .mockImplementationOnce(() =>
                new Promise<Reaction[]>(resolve => resolve(listReactions)));
        
        app = {createReaction, listReactionsByUser} as unknown as IBlogApp;
        target = new BlogController(app);
    });


    test('Insert reaction article', async () => {
        const req = {body: fakeReaction} as Request;
        
        const action = () =>
            target.insertReaction(req, fakeResponse);
        
        await expect(action()).resolves;
        expect(app.createReaction).toBeCalledWith(fakeReaction);
    });

    
    test('Insert reaction article - Test end point', async () => {

        const server = new ResumeServer([target]);
        const agent = request.agent(server.appExpress);

        await agent
            .post(`/${blogRoute}/reaction`)
            .send(fakeReaction)
            .expect(httpStatusCode.created);
    });


    test('list reactions by user', async () => {
        // given
        const req = {
            params: {
                idUser: fakeIdUser
            }
        } as Request<{ idUser: string }>;

        // when
        const result = await target.listReactions(req, fakeResponse);

        // then
        expect(app.listReactionsByUser).toBeCalledWith(fakeIdUser);
        expect(result).toBe(listReactions);
    });
    
    test('list reactions by user - testEndpoint', async () => {
        const server = new ResumeServer([target]);
        const agent = request.agent(server.appExpress);
        
        const response = await agent
            .get(`/${blogRoute}/reaction/${fakeIdUser}`)
            .expect(httpStatusCode.success)
            .then(x => x.text);
        
        expect(response).toBe(JSON.stringify(listReactions));
        expect(app.listReactionsByUser).toBeCalledWith(fakeIdUser);
    });

});