import "./GamePage.css"
import { useEffect, useRef, useState } from "react";
import MetaPhase from "../components/meta/MetaPhase";
import PokerTable from "../components/table/PokerTable";
import MusicPlayer from "../components/shared/MusicPlayer";
import { useGame } from "../hooks/useGame";
import { type GameSpeed } from "../types/game";

export default function GamePage() {

    const game = useGame()

    const stageRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const stage = stageRef.current
        if (!stage) return

        const recomputeScale = () => {
            const { offsetWidth, offsetHeight } = stage
            if (!offsetWidth || !offsetHeight) return

            const fitScale = Math.min(
                window.innerWidth / offsetWidth,
                window.innerHeight / offsetHeight
            )

            // Before the poker table is showing, content is small; only
            // shrink to fit, never enlarge it. The poker table itself is
            // allowed to scale up to fill the screen.
            setScale(!game.isGamePhase ? Math.min(fitScale, 1) : fitScale)
        }

        recomputeScale()

        const resizeObserver = new ResizeObserver(recomputeScale)
        resizeObserver.observe(stage)
        window.addEventListener("resize", recomputeScale)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", recomputeScale)
        }
    }, [game.isGamePhase])

    return (
        <div className="table-background">

            {game.showSuspense && <div className="suspense-overlay" />}

            <MusicPlayer
                active={game.isGamePhase}
                src="/audio/background.mp3"
            />

            <div className="top-left-panel">
                {game.gameOver && (
                    <div className="game-over" >
                        <h1>Game Over!</h1>
                    </div>
                )}

                <h1 className="title">Super Poker</h1>

                <div className="controls">
                    {game.isMetaPhase && (
                        <div className="player-inputs">
                            {game.playerNames.map((name, index) => (
                                <input
                                    key={index}
                                    placeholder={`Player ${index + 1}`}
                                    value={name}
                                    onChange={(e) => game.setPlayerNameAt(index, e.target.value)}
                                />
                            ))}

                            <button
                                type="button"
                                className="add-player-btn"
                                onClick={game.addPlayerField}
                                disabled={game.playerNames.length >= game.maxPlayerFields}
                                hidden={game.playerNames.length >= game.maxPlayerFields}
                                aria-label="Add player"
                            >
                                +
                            </button>
                        </div>
                    )}

                    <button
                        onClick={game.handleInitialize}
                        hidden={!game.isMetaPhase}
                        disabled={game.isMetaAnimating}
                    >
                        Initialize
                    </button>

                    <button
                        onClick={game.handlePlay}
                        hidden={game.isMetaPhase}
                        disabled={game.isRoundOngoing}
                    >
                        Play Round
                    </button>

                    <button
                        onClick={game.resetGame}
                        hidden={!game.gameOver}
                    >
                        Reset Game
                    </button>
                </div>
            </div>

            <div className="stage" ref={stageRef} style={{ transform: `scale(${scale})` }}>

            {!game.isMetaPhase && game.isGamePhase && (
                <div className="game-speed">
                    <label>
                        <input
                            type="radio"
                            value="normal"
                            checked={game.gameSpeed === "normal"}
                            onChange={(e) =>
                                game.setGameSpeed(e.target.value as GameSpeed)}
                        />
                        Normal
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="fast"
                            checked={game.gameSpeed === "fast"}
                            onChange={(e) =>
                                game.setGameSpeed(e.target.value as GameSpeed)}
                        />
                        Fast
                    </label>
                </div>
            )}

            {!game.isGamePhase && (
                <MetaPhase
                    metaCards={game.metaCards}
                    betValue={game.betValue}
                    multiplier={game.multiplier}
                    targetScore={game.targetScore}
                />
            )}

            {!game.isMetaPhase && (
                <PokerTable
                    roundResult={game.roundResult}
                    dealtCards={game.dealtCards}
                    dealtCommunity={game.dealtCommunity}
                    showWinner={game.showWinner}
                    currentScore={game.currentScore}
                    animateScore={game.animateScore}
                    targetScore={game.targetScore}
                    displayFlop={game.displayFlop}
                    displayTurn={game.displayTurn}
                    displayRiver={game.displayRiver}
                />
            )}

            </div>
        </div>
    )
}