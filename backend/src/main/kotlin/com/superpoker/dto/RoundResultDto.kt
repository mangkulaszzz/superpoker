package com.superpoker.dto

data class RoundResultDto(
    val players: List<PlayerDto> = emptyList(),
    val communityCards: List<CardDto> = emptyList(),
    val winners: List<String> = emptyList(),
    val winningHand: String = "",
    val isGameOver: Boolean = false,
    val overallWinner: String? = null
)
