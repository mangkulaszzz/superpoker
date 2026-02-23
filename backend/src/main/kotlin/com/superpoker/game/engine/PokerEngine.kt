package com.superpoker.game.engine

import com.superpoker.game.evaluator.HandEvaluator
import com.superpoker.game.model.Player

class PokerEngine(
    private val handEvaluator: HandEvaluator = HandEvaluator()
) {

    fun playRound(players: List<Player>): RoundResult {

        require(players.size >= 2) { "At least 2 players required" }

        val deck = Deck()
        deck.shuffle()

        // Deal 2 hole cards to each player
        players.forEach { player ->
            player.holeCards = deck.draw(2)
        }

        // Deal 5 community cards
        val communityCards = deck.draw(5)

        // Evaluate each player's best hand
        val evaluated = players.map { player ->
            val sevenCards = player.holeCards + communityCards
            val hand = handEvaluator.evaluateSevenCards(sevenCards)
            player to hand
        }

        // Determine best hand
        val bestHand = evaluated.maxByOrNull { it.second }!!.second

        // Determine winners (can be multiple)
        val winners = evaluated
            .filter { it.second == bestHand }
            .map { it.first }

        return RoundResult(
            players = players,
            communityCards = communityCards,
            winners = winners,
            winningHand = bestHand,
            isGameOver = false,
            overallWinner = null
        )
    }
}