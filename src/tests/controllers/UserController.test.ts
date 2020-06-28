import {Request, Response} from "express";
import {httpStatusCode} from "src/constants";
import {IUserApp} from "src/model/user/UserApp";
import {UserController} from "src/controllers/UserController";
import {CreateUserViewModel, UserViewModel} from "src/viewModel/userViewModels";

describe('Insert User', () => {
    test('Happy path', async () => {
        const fakeRequestUser: CreateUserViewModel = {
            ipAddress: "192.404.303.022", 
        };
        
        const fakeReturnUser: UserViewModel = {
            id: "abacate",
        };
        
        // given
        const createUser = jest.fn()
            .mockImplementationOnce(x => new Promise<string>(resolve => resolve(fakeReturnUser.id)));

        const target = new UserController({createUser} as IUserApp);
        
        const send = jest.fn();
        
        const req = {body: fakeRequestUser} as Request;
        const res = {send} as unknown as Response;
        
        const status = jest.fn()
            .mockImplementationOnce(() => res);
        
        res.status = status;
        
        // when
        await target.insertUser(req, res);
        
        // then
        expect(status).toBeCalledWith(httpStatusCode.success);
        expect(send).toBeCalledWith(fakeReturnUser);
        expect(createUser).toBeCalledWith(fakeRequestUser.ipAddress);
    });
    
    
    test('Error on App', async () => {
        // given
        const errorMessage = "Error on app user";
        const createUser = jest.fn()
            .mockImplementationOnce(() => new Promise<string>((_, reject) => reject(new Error(errorMessage))));
        const target = new UserController({createUser} as IUserApp);
        
        const send = jest.fn();
        const res = {send} as unknown as Response;
        
        const status = jest.fn().mockImplementationOnce(() => res);
        res.status = status;
        
        // when
        await target.insertUser({body: {}} as Request, res);
        
        // then
        expect(send).toBeCalledWith(errorMessage);
        expect(status).toBeCalledWith(httpStatusCode.internalServerError);
        
    })
     
});