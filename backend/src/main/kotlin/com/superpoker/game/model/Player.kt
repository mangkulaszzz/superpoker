package com.superpoker.game.model

data class Player(
    val name: String,
    var score: Int = 0,
    var holeCards: List<Card> = emptyList()
)