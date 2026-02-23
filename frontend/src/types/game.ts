export type CardDto = {
    suit: string
    rank: string
}

export type PlayerDto = {
    name: string
    score: number
    holeCards: CardDto[]
}

export type RoundResultDto = {
    players: PlayerDto[]
    communityCards: CardDto[]
    winners: string[]
    winningHand: string
    isGameOver: boolean
    overallWinner: string
}

export type GameStartDto = {
    initialBet: number
    multiplier: number
    targetScore: number
    betCard: CardDto
    multiplierCard: CardDto
    targetCard: CardDto
    players: PlayerDto[]
}