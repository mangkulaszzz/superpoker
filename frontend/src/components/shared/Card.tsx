import type { CardDto } from "../../types/game"
import { getRankSymbol, getSuitSymbol } from "../../utils/cardUtils"

type Props = {
    card: CardDto
}

export default function Card({ card }: Props) {
    const isRed = card.suit === "HEARTS" || card.suit === "DIAMONDS"

    return (
        <div className="card">
            <div className="card-inner">
                <div className={`card-front ${isRed ? "red" : "black"}`}>
                    {getRankSymbol(card.rank)} {getSuitSymbol(card.suit)}
                </div>
                <div className="card-back"></div>
            </div>
        </div>
    )
}