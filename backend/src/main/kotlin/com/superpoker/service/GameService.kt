package com.superpoker.service

import com.superpoker.game.engine.GameManager
import com.superpoker.game.engine.RoundResult
import com.superpoker.game.model.GameState
import com.superpoker.game.model.Player
import org.springframework.stereotype.Service

@Service
class GameService {

    private val gameManager = GameManager()

    fun initializeGame(playerNames: List<String>): GameState {
        return gameManager.initialize(playerNames)
    }

    fun playRound(): RoundResult {
        return gameManager.playRound()
    }

    fun getPlayers(): List<Player> {
        return gameManager.getPlayers()
    }

    fun getRoundNumber(): Int {
        return gameManager.getRoundNumber()
    }

    fun resetGame() {
        gameManager.resetGame()
    }
}