package com.superpoker.game.evaluator

import com.superpoker.game.model.Card
import com.superpoker.game.model.Rank

class HandEvaluator {

    fun evaluateSevenCards(cards: List<Card>): EvaluatedHand {
        require(cards.size == 7) { "Must provide exactly 7 cards" }

        val combinations = generateFiveCardCombinations(cards)

        return combinations
            .map { evaluateFiveCards(it) }
            .maxOrNull()!!
    }

    // Generate all 5-card combinations from 7 cards
    private fun generateFiveCardCombinations(cards: List<Card>): List<List<Card>> {
        val result = mutableListOf<List<Card>>()

        for (a in 0 until cards.size - 4)
            for (b in a + 1 until cards.size - 3)
                for (c in b + 1 until cards.size - 2)
                    for (d in c + 1 until cards.size - 1)
                        for (e in d + 1 until cards.size)
                            result.add(listOf(cards[a], cards[b], cards[c], cards[d], cards[e]))

        return result
    }

    // Evaluate a single 5-card hand
    private fun evaluateFiveCards(cards: List<Card>): EvaluatedHand {

        val sorted = cards.sortedByDescending { it.rank.value }
        val ranks = sorted.map { it.rank.value }
        val suits = sorted.map { it.suit }

        val isFlush = suits.distinct().size == 1
        val isStraight = isStraight(ranks)

        val rankCounts = ranks.groupingBy { it }.eachCount()
        val counts = rankCounts.values.sortedDescending()

        return when {
            isStraight && isFlush && ranks.max() == Rank.ACE.value ->
                EvaluatedHand(HandCategory.ROYAL_FLUSH, listOf())

            isStraight && isFlush ->
                EvaluatedHand(HandCategory.STRAIGHT_FLUSH, listOf(ranks.max()))

            counts == listOf(4, 1) -> {
                val four = rankCounts.filterValues { it == 4 }.keys.first()
                val kicker = rankCounts.filterValues { it == 1 }.keys.first()
                EvaluatedHand(HandCategory.FOUR_OF_A_KIND, listOf(four, kicker))
            }

            counts == listOf(3, 2) -> {
                val three = rankCounts.filterValues { it == 3 }.keys.first()
                val pair = rankCounts.filterValues { it == 2 }.keys.first()
                EvaluatedHand(HandCategory.FULL_HOUSE, listOf(three, pair))
            }

            isFlush ->
                EvaluatedHand(HandCategory.FLUSH, ranks)

            isStraight ->
                EvaluatedHand(HandCategory.STRAIGHT, listOf(ranks.max()))

            counts == listOf(3, 1, 1) -> {
                val three = rankCounts.filterValues { it == 3 }.keys.first()
                val kickers = rankCounts.filterValues { it == 1 }.keys.sortedDescending()
                EvaluatedHand(HandCategory.THREE_OF_A_KIND, listOf(three) + kickers)
            }

            counts == listOf(2, 2, 1) -> {
                val pairs = rankCounts.filterValues { it == 2 }.keys.sortedDescending()
                val kicker = rankCounts.filterValues { it == 1 }.keys.first()
                EvaluatedHand(HandCategory.TWO_PAIR, pairs + kicker)
            }

            counts == listOf(2, 1, 1, 1) -> {
                val pair = rankCounts.filterValues { it == 2 }.keys.first()
                val kickers = rankCounts.filterValues { it == 1 }.keys.sortedDescending()
                EvaluatedHand(HandCategory.ONE_PAIR, listOf(pair) + kickers)
            }

            else ->
                EvaluatedHand(HandCategory.HIGH_CARD, ranks)
        }
    }

    private fun isStraight(ranks: List<Int>): Boolean {
        val distinct = ranks.distinct()

        // Normal straight
        if (distinct.size == 5 && distinct.first() - distinct.last() == 4) {
            return true
        }

        // Ace-low straight (A 2 3 4 5)
        if (distinct == listOf(14, 5, 4, 3, 2)) {
            return true
        }

        return false
    }
}