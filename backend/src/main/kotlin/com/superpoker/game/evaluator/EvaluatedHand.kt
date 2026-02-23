package com.superpoker.game.evaluator

data class EvaluatedHand(
    val category: HandCategory,
    val tiebreakers: List<Int>
) : Comparable<EvaluatedHand> {

    override fun compareTo(other: EvaluatedHand): Int {

        // Compare hand category strength
        if (this.category.strength != other.category.strength) {
            return this.category.strength - other.category.strength
        }

        // If same category, compare tie breakers one by one
        for (i in tiebreakers.indices) {
            val comparison = this.tiebreakers[i] - other.tiebreakers[i]
            if (comparison != 0) {
                return comparison
            }
        }

        // Completely equal
        return 0
    }
}