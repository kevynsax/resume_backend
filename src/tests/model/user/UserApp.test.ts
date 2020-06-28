import {IUserRepo, UserModel} from "src/model/user/UserRepo";
import {UserApp} from "src/model/user/UserApp";

describe('Insert User', () => {

    test('Happy path', async () => {

        // given
        const fakeIp = "fake ip";
        const fakeId = "this is a fakeId Number" ; 

        const create = jest.fn()
            .mockImplementationOnce(() => 
                new Promise<UserModel>(resolve => resolve({_id: fakeId} as UserModel)));
        
        const repo = {
            create
        } as unknown as IUserRepo;
        const target = new UserApp(repo);
        
        // when
        const result = await target.createUser(fakeIp);
        
        // then
        expect(result).toBe(fakeId);
    });
});