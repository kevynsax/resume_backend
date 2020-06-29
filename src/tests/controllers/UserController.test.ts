import {Request, Response} from "express";
import {httpStatusCode} from "src/constants";
import {IUserApp} from "src/model/user/UserApp";
import {UserController} from "src/controllers/UserController";
import {CreateUserViewModel, UserViewModel} from "src/viewModel/userViewModels";
import {ResumeResponse} from "src/middleware/injectHelpers";

const fakeRequestUser: CreateUserViewModel = {
    ipAddress: "192.404.303.022",
};

const fakeReturnUser: UserViewModel = {
    id: "abacate",
};

describe('Insert User', () => {
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

    test('Happy path', async () => {
        // given
        const req = {body: fakeRequestUser} as Request;


        // when
        const result = await target.insertUser(req, fakeResponse);

        // then
        expect(result).toEqual(fakeReturnUser);
        expect(fakeApp.createUser).toBeCalledWith(fakeRequestUser.ipAddress);
    });
});