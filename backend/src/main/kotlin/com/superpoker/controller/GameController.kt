package com.superpoker.controller

import com.superpoker.dto.GameStartDto
import com.superpoker.dto.PlayerDto
import com.superpoker.dto.RoundResultDto
import com.superpoker.game.engine.RoundResult
import com.superpoker.game.model.Player
import com.superpoker.mapper.GameMapper
import com.superpoker.service.GameService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping("/api/game")
class GameController(
    private val gameService: GameService
) {

    @PostMapping("/initialize")
    fun initialize(@RequestBody playerNames: List<String>): GameStartDto {
        val result = gameService.initializeGame(playerNames)
        return GameMapper.toGameStartDto(result)
    }

    @PostMapping("/play")
    fun playRound(): RoundResultDto {
        val result = gameService.playRound()
        return GameMapper.toRoundResultDto(result)
    }

    @GetMapping("/players")
    fun getPlayers(): List<PlayerDto> {
        return gameService.getPlayers()
            .map { GameMapper.toPlayerDto(it) }
    }

    @GetMapping("/round")
    fun getRoundNumber(): Int {
        return gameService.getRoundNumber()
    }

    @PostMapping("/reset")
    fun reset() {
        return gameService.resetGame()
    }
}