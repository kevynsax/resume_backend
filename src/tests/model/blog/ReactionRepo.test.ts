import {MongoMemoryServer} from 'mongodb-memory-server-global';
import {connect, disconnect, mongo, connection} from "mongoose";
import {Reaction, ReactionTypeEnum} from "src/model/blog/types";
import {ReactionRepo} from 'src/model/blog/ReactionRepo';


describe('Reaction Repo tests', () => {
    let uri;
    beforeAll(async () => {
        const mongoServer = new MongoMemoryServer();
        uri = await mongoServer.getUri();
        
        await connect(uri, {useNewUrlParser: true, useCreateIndex: true}, err => {
            if(!err) return;
            
            console.error(err);
            process.exit(1);
        });
    });

    test('Test mapping', async () => {
        // given
        const fakeReaction: Reaction = {
            type: ReactionTypeEnum.like,
            idArticle: 9,
            idUser: "fake id user"
        };
        
        const validReaction = new ReactionRepo(fakeReaction);
        
        // then
        const savedReaction = await validReaction.save(); 
        
        expect(savedReaction._id).toBeDefined();
        expect(savedReaction.type).toBe(fakeReaction.type);
        expect(savedReaction.idArticle).toBe(fakeReaction.idArticle);
        expect(savedReaction.idUser).toBe(fakeReaction.idUser);
    })
});