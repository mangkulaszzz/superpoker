package com.superpoker.dto

data class PlayerDto(
    val name: String = "",
    val score: Int = 0,
    val holeCards: List<CardDto> = emptyList()
)
