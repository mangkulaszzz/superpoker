package com.superpoker.game.engine

import com.superpoker.game.model.GameState
import com.superpoker.game.model.Player
import com.superpoker.game.model.Rank

class GameManager {

    private val pokerEngine = PokerEngine()
    private lateinit var gameState: GameState

    // Initialize game with players
    fun initialize(playerNames: List<String>): GameState {

        if (playerNames.size < 2) {
            throw IllegalStateException("At least 2 players required")
        }

        val players = playerNames.map { name ->
            Player(
                name = name,
                score = 0
            )
        }.toMutableList()

        val deck = Deck().apply { shuffle() }

        val betCard = deck.draw()
        val multiplierCard = deck.draw()
        val targetCard = deck.draw()

        val initialBet = betCard[0].rank.value
        var multiplier = multiplierCard[0].rank.value
        var targetScore = targetCard[0].rank.value

        if (multiplier == Rank.ACE.value) {
            multiplier = 1
        }

        if (targetScore == Rank.ACE.value) {
            targetScore = 1
        }

        gameState = GameState(
            players = players,
            initialBet = initialBet,
            multiplier = multiplier,
            targetScore = targetScore,
            roundNumber = 0,
            betCard = betCard[0],
            multiplierCard = multiplierCard[0],
            targetCard = targetCard[0],
            initialized = true
        )

        return gameState
    }

    // Play one round
    fun playRound(): RoundResult {

        if (!gameState.initialized) {
            throw IllegalStateException("Game has not been initialized")
        }

        val result = pokerEngine.playRound(gameState.players)

        // Update score (1 point per winner)
        result.winners.forEach { winnerName ->
            gameState.players.find { it.name == winnerName.name }?.let {
                it.score += 1
            }
        }

        // Increase round count
        gameState.roundNumber++

        // Detect game over
        val overallWinner = gameState.players
            .find { it.score >= gameState.targetScore }

        if (overallWinner != null) {
            gameState.isGameOver = true
            result.overallWinner = overallWinner.name
            result.isGameOver = true
        }

        return result
    }

    fun getPlayers(): List<Player> = gameState.players

    fun getRoundNumber(): Int = gameState.roundNumber

    fun resetGame() {
        gameState.players.forEach { it.score = 0 }
        gameState.roundNumber = 0
        gameState.initialized = false
        gameState.isGameOver = false
    }

}