import {connect} from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server-global';
import {fakeUser} from "src/tests/user/userTestsConstants";
import {UserRepo} from 'src/user/UserRepo';

describe('User repo tests', () => {
    beforeAll(async () => {
        const server = new MongoMemoryServer();
        const uri = await server.getUri();
        await connect(uri, err => {
            if(!err) return;
            
            console.log('error connecting database');
            process.exit(1);
        })
    });

    test('test mapping optional parameters', async () => {
        const user = {...fakeUser, geolocation: null};
        const validUser = new UserRepo(user);

        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
    });
    
    test('test mapping', async () => {
        const validUser = new UserRepo(fakeUser);
        
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.ipAddress).toBe(fakeUser.ipAddress);
        expect(savedUser.geolocation).toBe(fakeUser.geolocation);
        expect(savedUser.geolocation?.city).toBe(fakeUser.geolocation?.city);
    });
});