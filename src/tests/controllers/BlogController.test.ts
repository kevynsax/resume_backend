import {Request} from "express";
import {BlogController, blogRoute} from "src/controllers/BlogController";
import {IBlogApp} from "src/model/blog/BlogApp";
import {Reaction, ReactionTypeEnum} from "src/model/blog/types";
import {httpStatusCode} from "src/constants";
import request from 'supertest';
import {ResumeServer} from "src/ResumeServer";
import {ResumeResponse} from "src/middleware/injectHelpers";
import Mock = jest.Mock;
import {successPromise} from "src/tests/utilsTest";
import {DeleteReactionViewModel} from "src/viewModel/blogViewModels";

const fakeIdUser = "fake id user";
const fakeIdArticle = "fake id article";
const fakeReaction: Reaction = {
    type: ReactionTypeEnum.like,
    idArticle: fakeIdArticle,
    idUser: fakeIdUser
};
const listReactions = [fakeReaction];

const fakeDeleteReaction: DeleteReactionViewModel = {
    idArticle: fakeIdArticle,
    idUser: fakeIdUser
};

const reactionRoute = `/${blogRoute}/reaction`;

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
            .mockImplementationOnce(successPromise);

        const listReactionsByUser = jest.fn()
            .mockImplementationOnce(() =>
                new Promise<Reaction[]>(resolve => resolve(listReactions)));
        
        const deleteReaction = jest.fn()
            .mockImplementationOnce(successPromise);
        
        app = {createReaction, listReactionsByUser, deleteReaction} as unknown as IBlogApp;
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
            .post(reactionRoute)
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
            .get(`${reactionRoute}/${fakeIdUser}`)
            .expect(httpStatusCode.success)
            .then(x => x.text);
        
        expect(response).toBe(JSON.stringify(listReactions));
    });

    test('Delete Reaction', async () => {
        const req = {body: fakeDeleteReaction} as Request;
        
        const action = () => target.removeReaction(req, fakeResponse);
        
        await expect(action()).resolves;
        expect(app.deleteReaction).toBeCalledWith(fakeDeleteReaction.idUser, fakeDeleteReaction.idArticle);
    });
    
    test('Delete Reaction - test endpoint', async () => {
        const server = new ResumeServer([target]);
        const agent = request.agent(server.appExpress);
        
        await agent
                .delete(reactionRoute)
                .send(fakeDeleteReaction)
                .expect(httpStatusCode.success);
    });
});