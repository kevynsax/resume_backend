import {Request, Response} from "express";
import {BlogController} from "src/controllers/BlogController";
import {IBlogApp} from "src/model/blog/BlogApp";
import {Reaction, ReactionTypeEnum} from "src/model/blog/types";
import {httpStatusCode} from "src/constants";

const fakeReaction = {
    type: ReactionTypeEnum.like,
    idArticle: 3,
} as Reaction;

describe('Insert reaction article', () => {
    test('Happy path', async () => {
        // given
        const createReaction = jest.fn()
            .mockImplementationOnce(() => new Promise<void>((resolve) => resolve()));
        
        const app = { createReaction } as IBlogApp;
        const target = new BlogController(app);
        const sendStatus = jest.fn();

        const req = {body: fakeReaction} as Request;
        const res = {sendStatus} as unknown as Response;

        // when
        const result = await target.insertReaction(req, res);
        
        // then
        expect(sendStatus).toBeCalledWith(httpStatusCode.created);
        expect(createReaction).toBeCalledWith(fakeReaction);
    });
    
    test('Error on app',  async() => {
        // given
        const errorMessage = "error on app";
        const createReaction = jest.fn()
            .mockImplementationOnce(() => 
                new Promise<void>((_, reject) => reject(new Error(errorMessage))));
        
        const target = new BlogController({createReaction} as IBlogApp);

        const send = jest.fn();
        const res = {send} as unknown as Response;

        const status = jest.fn().mockImplementationOnce(() => res);
        res.status = status;

        // when
        const result = await target.insertReaction({body:{}} as Request, res);
        
        // then
        expect(send).toBeCalledWith(errorMessage);
        expect(status).toBeCalledWith(httpStatusCode.internalServerError);
    })
});