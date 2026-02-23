package com.superpoker.game.engine

import com.superpoker.game.model.Card
import com.superpoker.game.model.Rank
import com.superpoker.game.model.Suit
import java.security.SecureRandom

class Deck {

    private val random = SecureRandom()
    private val cards: MutableList<Card> = mutableListOf()

    init {
        reset()
    }

    fun reset() {
        cards.clear()
        for (suit in Suit.entries) {
            for (rank in Rank.entries) {
                cards.add(Card(suit, rank))
            }
        }
    }

    fun shuffle() {
        cards.shuffle(random)
    }

    fun draw(count: Int = 1): List<Card> {
        require(cards.size >= count) { "Not enough cards in deck" }
        return List(count) { cards.removeAt(0) }
    }
}