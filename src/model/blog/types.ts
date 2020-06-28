export enum ReactionTypeEnum{
    like,
    dislike
}

export interface Reaction {
    type: ReactionTypeEnum,
    idArticle: number
}