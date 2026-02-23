package com.superpoker.game.model

data class GameState(
    val players: MutableList<Player>,
    var initialBet: Int = 0,
    var multiplier: Int = 1,
    var targetScore: Int = 0,
    val betCard: Card,
    val multiplierCard: Card,
    val targetCard: Card,
    var roundNumber: Int = 0,
    var initialized: Boolean = false,
    var isGameOver: Boolean = false
)