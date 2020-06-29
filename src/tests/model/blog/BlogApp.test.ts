import {Reaction, ReactionTypeEnum} from "src/model/blog/types";
import {BlogApp} from "src/model/blog/BlogApp";
import {IReactionRepo, ReactionModel} from "src/model/blog/ReactionRepo";


describe('Insert Reaction', () => {
    test('happy path', async () => {
        // given
        const fakeReaction: Reaction = {
            type: ReactionTypeEnum.dislike,
            idArticle: "Fake id article",
            idUser: "48597"
        };
        
        const create = jest.fn()
            .mockImplementationOnce((reaction: Reaction) =>
                new Promise<ReactionModel>((resolve) => resolve(reaction as ReactionModel)));

        const target = new BlogApp({ create } as unknown as IReactionRepo);
       
        // when
        await target.createReaction(fakeReaction);
        
        // then
        expect(create).toBeCalledWith(fakeReaction);
    });
    
    test('error on repo',async () => {
        const errorMessage = 'error on blog repo';
        const create = jest.fn()
            .mockImplementationOnce(() => 
                new Promise<ReactionModel>((_, reject) => reject(errorMessage)));
        
        const target = new BlogApp({ create } as unknown as IReactionRepo);
        
        const action = () =>
            target.createReaction({} as Reaction);
        
        await expect(action()).rejects.toMatch(errorMessage);
    });
});