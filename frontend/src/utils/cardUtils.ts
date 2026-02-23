export function getRankSymbol(rank: string) {
    switch (rank) {
        case "ACE": return "A"
        case "KING": return "K"
        case "QUEEN": return "Q"
        case "JACK": return "J"
        case "TEN": return "10"
        case "NINE": return "9"
        case "EIGHT": return "8"
        case "SEVEN": return "7"
        case "SIX": return "6"
        case "FIVE": return "5"
        case "FOUR": return "4"
        case "THREE": return "3"
        case "TWO": return "2"
        case "ONE": return "1"
        default: return rank
    }
}

export function getSuitSymbol(suit: string) {
    switch (suit) {
        case "HEARTS":
            return "♥"
        case "DIAMONDS":
            return "♦"
        case "CLUBS":
            return "♣"
        case "SPADES":
            return "♠"
        default:
            return suit
    }
}
