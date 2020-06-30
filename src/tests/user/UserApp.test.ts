import {AxiosError, AxiosResponse, AxiosStatic} from "axios";
import {IUserRepo, UserModel} from "src/user/UserRepo";
import {UserApp} from "src/user/UserApp";
import {User, Geolocation} from "src/user/types";
import {fakeGeolocation, fakeUser} from "src/tests/user/userTestsConstants";

const fakeKey = "this is a fake key";
const fakeId = "this is a fakeId Number" ;
const fakeIp = fakeUser.ipAddress;

describe('Insert User', () => {

    test('Happy path', async () => {

        process.env = Object.assign(process.env, {GEOLOCATION_IP_ADDRESS: fakeKey});
        // given

        const create = jest.fn()
            .mockImplementationOnce(() => 
                new Promise<UserModel>(resolve => resolve({_id: fakeId} as UserModel)));
        
        const get = jest.fn()
            .mockImplementationOnce(() =>
                new Promise<AxiosResponse<Geolocation>>(resolve => resolve({
                    data: fakeGeolocation
                } as AxiosResponse<Geolocation>)));
        
        const axios = {get} as unknown as AxiosStatic;
        const repo = {
            create
        } as unknown as IUserRepo;
        const target = new UserApp(repo, axios);
        
        // when
        const result = await target.createUser(fakeIp);
        
        // then
        expect(result).toBe(fakeId);
        expect(get).toBeCalledWith(`http://api.ipstack.com/${fakeIp}?access_key=${fakeKey}`);
        
        const userPassed = create.mock.calls[0][0] as User;
        expect(userPassed.geolocation).toBe(fakeGeolocation);
    });
    
    test('Api stack offline', async () => {
        // given
        const create = jest.fn()
            .mockImplementationOnce(() => 
                new Promise<UserModel>(resolve => resolve({_id: fakeId} as UserModel)));
        const repo = {create} as unknown as IUserRepo;
        
        
        const get = jest.fn()
            .mockImplementationOnce(() => 
                new Promise<AxiosResponse<Geolocation>>((_, reject) =>
                    reject({
                        code: "301"
                    } as AxiosError)
                ));
        const axios = {get} as unknown as AxiosStatic;
        
        const target = new UserApp(repo, axios);
        
        // when
        const result = await target.createUser(fakeIp);
        
        // then
        expect(result).toBe(fakeId);       
    });
    
    test('Error on database', async () => {
        // given
        const error = new Error('Error connecting to mongo');
        const create = jest.fn()
            .mockImplementationOnce(() => 
                new Promise<UserModel>((_, reject) => reject(error)));

        const get = jest.fn()
            .mockImplementationOnce(() =>
                new Promise<AxiosResponse<Geolocation>>(resolve => resolve({
                    data: fakeGeolocation
                } as AxiosResponse<Geolocation>)));

        const target = new UserApp({create} as unknown as IUserRepo, {get} as unknown as AxiosStatic);
        
        // when
        const action = () => target.createUser(fakeIp);
        
        // then
        await expect(action()).rejects.toBe(error);
        expect(create).toBeCalledTimes(1);
    })
});