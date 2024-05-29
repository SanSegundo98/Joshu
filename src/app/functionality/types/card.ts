export interface Card { 
    cardID: number
    userID: number | null
    example: string | null | undefined
    toLearn: string | null | undefined
    translation: string | null | undefined
}
