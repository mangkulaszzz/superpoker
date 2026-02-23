package com.superpoker.game.engine

import com.superpoker.game.evaluator.EvaluatedHand
import com.superpoker.game.model.Card
import com.superpoker.game.model.Player

data class RoundResult(
    val players: List<Player>,
    val communityCards: List<Card>,
    val winners: List<Player>,
    val winningHand: EvaluatedHand,
    var isGameOver: Boolean,
    var overallWinner: String?
)