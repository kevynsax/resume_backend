import {successPromise} from "src/tests/utilsTest";
import {Reaction, ReactionTypeEnum} from "src/blog/types";
import {active, BlogApp} from "src/blog/BlogApp";
import {IReactionRepo, ReactionModel} from "src/blog/ReactionRepo";

const fakeReaction: Reaction = {
    type: ReactionTypeEnum.dislike,
    idArticle: "Fake id article",
    idUser: "48597"
};

describe('Blog app', () => {
    const getTarget = (repo: any) =>
        new BlogApp(repo as IReactionRepo);
    
    test('Insert Reaction', async () => {
        // given
        const create = jest.fn()
            .mockImplementationOnce(() =>
                new Promise<ReactionModel>((resolve) => resolve(fakeReaction as ReactionModel)));
        
        const target = getTarget({create});
        // when
        const action = () => target.createReaction(fakeReaction);
        
        // then
        await expect(action()).resolves;
        expect(create).toBeCalledWith(fakeReaction);
    });
    
    test('list reactions', async () => {

        const listFakeReaction = [{
            ...fakeReaction,
            _id: "this shouldn't show to controller"
        }];
        const expected = {
            idUser: fakeReaction.idUser,
            active
        };
        
        const find = jest.fn()
            .mockImplementationOnce(() =>
                new Promise<ReactionModel[]>(resolve => resolve(listFakeReaction as ReactionModel[])));
        
        const target = getTarget({find});
        
        const result = await target.listReactionsByUser(fakeReaction.idUser);
        
        expect(result).toEqual([fakeReaction]);
        expect(find).toBeCalledWith(expected);
    });
    
    test('delete reaction', async () => {
        // given
        const {idUser, idArticle} = fakeReaction; 
        
        const findOneAndUpdate = jest.fn()
            .mockImplementationOnce(successPromise);
        
        const target = getTarget({findOneAndUpdate});
        
        // when
        const action = () => target.deleteReaction(idUser, idArticle);
        
        // then
        await expect(action()).resolves;
        expect(findOneAndUpdate).toBeCalledWith({idUser, idArticle, active}, {active: false});
    });
});