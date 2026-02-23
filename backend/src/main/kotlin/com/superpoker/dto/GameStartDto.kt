package com.superpoker.dto

import com.superpoker.game.model.Card

data class GameStartDto(
    val initialBet: Int,
    val multiplier: Int,
    val targetScore: Int,
    val betCard: CardDto,
    val multiplierCard: CardDto,
    val targetCard: CardDto,
    val players: List<PlayerDto>
)
