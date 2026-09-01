import type { PlayerDto } from "../../types/game"
import "./Scoreboard.css"

interface ScoreboardProps {
    players: PlayerDto[]
}

export default function Scoreboard({ players }: ScoreboardProps) {
    if (players.length === 0) return null

    const highestScore = Math.max(...players.map((p) => p.score))

    const ranked = [...players].sort((a, b) => b.score - a.score)

    return (
        <div className="scoreboard">
            <h3 className="scoreboard__title">Scores</h3>

            <ul className="scoreboard__list">
                {ranked.map((player) => (
                    <li
                        key={player.name}
                        className={
                            "scoreboard__row" +
                            (player.score === highestScore && highestScore > 0 ? " scoreboard__row--leader" : "")
                        }
                    >
                        <span className="scoreboard__name">{player.name}</span>
                        <span className="scoreboard__score">{player.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
