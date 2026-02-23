package com.superpoker.mapper

import com.superpoker.dto.CardDto
import com.superpoker.dto.GameStartDto
import com.superpoker.dto.PlayerDto
import com.superpoker.dto.RoundResultDto
import com.superpoker.game.engine.RoundResult
import com.superpoker.game.model.Card
import com.superpoker.game.model.GameState
import com.superpoker.game.model.Player

object GameMapper {

    fun toCardDto(card: Card): CardDto {
        return CardDto(
            suit = card.suit.name,
            rank = card.rank.name
        )
    }

    fun toPlayerDto(player: Player): PlayerDto {
        return PlayerDto(
            name = player.name,
            score = player.score,
            holeCards = player.holeCards.map { toCardDto(it) }
        )
    }

    fun toGameStartDto(result: GameState): GameStartDto {
        return GameStartDto(
            initialBet = result.initialBet,
            multiplier = result.multiplier,
            targetScore = result.targetScore,
            betCard = toCardDto(result.betCard),
            multiplierCard = toCardDto(result.multiplierCard),
            targetCard = toCardDto(result.targetCard),
            players = result.players.map { toPlayerDto(it) }
        )
    }

    fun toRoundResultDto(result: RoundResult): RoundResultDto {
        return RoundResultDto(
            players = result.players.map { toPlayerDto(it) },
            communityCards = result.communityCards.map { toCardDto(it) },
            winners = result.winners.map { it.name },
            winningHand = result.winningHand.category
                .name
                .replace("_", " ")
                .lowercase()
                .replaceFirstChar { it.uppercase() },
            isGameOver = result.isGameOver,
            overallWinner = result.overallWinner
        )
    }
}