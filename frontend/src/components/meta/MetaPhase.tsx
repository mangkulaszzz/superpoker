import type { CardDto } from "../../types/game"
import Card from "../shared/Card"

type Props = {
    metaCards: CardDto[]
    betValue: number | null
    multiplier: number | null
    targetScore: number | null
}

export default function MetaPhase({
    metaCards,
    betValue,
    multiplier,
    targetScore
}: Props) {
    return (
        <div className="meta-area">
            <h2>Game Setup</h2>

            <div className="meta-cards">
                {metaCards.map((card, index) => (
                    <Card card={card} key={index}/>
            ))}
            </div>

            {metaCards.length === 1 && (
                <div className="bet-display">
                    Bet Value: {betValue}
                </div>
            )}

            {metaCards.length === 2 && (
                <div className="multiplier-display">
                    Multiplier: {multiplier}
                </div>
            )}

            {targetScore && metaCards.length === 3 && (
                <div className="target-display">
                    Target Score: {targetScore}
                </div>
            )}
        </div>
    )
}