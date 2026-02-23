import "./GamePage.css"
import MetaPhase from "../components/meta/MetaPhase";
import PokerTable from "../components/table/PokerTable";
import { useGame } from "../hooks/useGame";

export default function GamePage() {

    const game = useGame()

    return (
        <div className="table-background">

            {game.gameOver && (
                <div className="game-over" >
                    <h1>Game Over!</h1>
                </div>
            )}

            {game.showSuspense && <div className="suspense-overlay" />}

            <h1 className="title">Super Poker</h1>

            <div className="controls">
                <input
                    placeholder="Alice, Bob, Charlie"
                    value={game.playerNames}
                    onChange={(e) => game.setPlayerNames(e.target.value)}
                    hidden={!game.isMetaPhase}
                />

                <button
                    onClick={game.handleInitialize}
                    hidden={!game.isMetaPhase}
                >
                    Initialize
                </button>

                <button 
                    onClick={game.handlePlay}
                    hidden={game.isMetaPhase}
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
    )
}