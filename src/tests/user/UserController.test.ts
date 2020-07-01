import {Request} from "express";
import {ResumeResponse} from "src/middleware/injectHelpers";
import request from "supertest";
import {ResumeServer} from "src/ResumeServer";
import {httpStatusCode} from "src/constants";
import {UserController} from "src/user/UserController";
import {IUserApp} from "src/user/UserApp";
import {UserViewModel} from "src/user/userViewModels";
import {fakeUser} from "src/tests/user/userTestsConstants";



export const fakeReturnUser: UserViewModel = {
    id: "abacate",
};

describe('User Controller', () => {
    let target: UserController;
    let fakeApp: IUserApp;
    let fakeResponse: ResumeResponse;

    beforeEach(() => {
        const fakeUnwrap = jest.fn()
            .mockImplementationOnce(x => x);
        
        fakeResponse = {
            unwrap: fakeUnwrap
        } as unknown as ResumeResponse;


        const createUser = jest.fn()
            .mockImplementationOnce(x => 
                new Promise<string>(resolve => resolve(fakeReturnUser.id)));
        fakeApp = {createUser} as IUserApp;
        target = new UserController(fakeApp);
    });

    test('Insert User', async () => {
        // given
        const req = {
            connection: {
                remoteAddress: fakeUser.ipAddress
            }
        } as Request;

        // when
        const result = await target.insertUser(req, fakeResponse);

        // then
        expect(result).toEqual(fakeReturnUser);
        expect(fakeApp.createUser).toBeCalledWith(fakeUser.ipAddress);
    });
    
    test('Insert User - Test Endpoint', async () => {
        const server = new ResumeServer([target]); 
        const agent = request.agent(server.appExpress);
        
        const response = await agent
            .post(`/api/user`)
            .expect(httpStatusCode.success)
            .then(x => x.text);
        
        expect(response).toBe(JSON.stringify(fakeReturnUser));
    });
});