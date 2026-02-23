import type { RoundResultDto } from "../../types/game"
import Card from "../shared/Card"

type Props = {
    roundResult: RoundResultDto | null
    dealtCards: Record<string, number>
    dealtCommunity: number
    showWinner: boolean
    currentScore: number[]
    animateScore: boolean
    targetScore: number | null
    displayFlop: boolean
    displayTurn: boolean
    displayRiver: boolean
}

export default function PokerTable({
    roundResult,
    dealtCards,
    dealtCommunity,
    showWinner,
    currentScore,
    animateScore,
    targetScore,
    displayFlop,
    displayTurn,
    displayRiver
}: Props) {
    if (!roundResult) return null

    return (
        <div className="poker-table">

            <div className="community-section">
                {displayFlop && <h2>FLOP PHASE</h2>}
                {displayTurn && <h2>TURN PHASE</h2>}
                {displayRiver && <h2>RIVER PHASE</h2>}
                    <div className="cards-row">
                        {roundResult.communityCards.slice(0, dealtCommunity).map((card, i) => (
                            <Card card={card} key={i}/>
                        ))}
                    </div>
            </div>

            <div className="players-container">
                {roundResult.players.map((player, index) => {
                    const total = roundResult.players.length
                    const angle = (index / total) * 2 * Math.PI - Math.PI / 2

                    const radius = 320

                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    return(
                        <div
                            key={player.name}
                            className="player-box"
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                            }}
                        >

                        <h3
                            className={
                                showWinner && roundResult.winners.includes(player.name)
                                    ? "winner"
                                    : ""
                            }
                        >
                            {player.name}
                        
                        <div className={animateScore ? "score-animate" : ""}>score: {currentScore[index] ?? 0}</div>
                        </h3>

                        {player.holeCards
                            .slice(0, dealtCards[player.name] ?? 0)
                            .map((card, i) => (
                                <Card card={card} key={i}/>
                            ))}
                        </div>
                    )
                })}
            </div>

            {showWinner && (
                <div className="winner-section">
                    <p>Winner: {roundResult.winners.join(", ")} — {roundResult.winningHand}</p>
                </div>
            )}

            <div className="target-score">
                <p>Target Score: {targetScore}</p>
            </div>

        </div>
    )   
}