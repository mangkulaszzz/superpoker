import { useState } from "react"
import { type GameSpeed, type CardDto, type RoundResultDto } from "../types/game"
import { initializeGame, playRound, reset } from "../api/gameApi"

export function useGame() {
    const [playerNames, setPlayerNames] = useState("")
    const [roundResult, setRoundResult] = useState<RoundResultDto | null>(null)
    const [error, setError] = useState("")
    const [dealtCards, setDealtCards] = useState<Record<string, number>>({})
    const [dealtCommunity, setDealtCommunity] = useState<number>(0)
    const [showWinner, setShowWinner] = useState(false)
    const [showSuspense, setShowSuspense] = useState(false)

    const [metaCards, setMetaCards] = useState<CardDto[]>([])
    const [betValue, setBetValue] = useState<number | null>(null)
    const [multiplier, setMultiplier] = useState<number | null>(null)
    const [targetScore, setTargetScore] = useState<number | null>(null)
    const [isMetaPhase, setIsMetaPhase] = useState(true)
    const [isMetaAnimating, setIsMetaAnimating] = useState(false)
    const [isGamePhase, setIsGamePhase] = useState(false)
    const [isRoundOngoing, setIsRoundOngoing] = useState(false)

    const [currentScore, setCurrentScore] = useState<number[]>([])
    const [animateScore, setAnimateScore] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    const [displayFlop, setDisplayFlop] = useState(false)
    const [displayTurn, setDisplayTurn] = useState(false)
    const [displayRiver, setDisplayRiver] = useState(false)

    const [gameSpeed, setGameSpeed] = useState<GameSpeed>("normal")

    const SPEED_CONFIG: Record<GameSpeed, { speed: number }> = {
        normal: {
            speed: 1000, // 1 second
        },
        fast: {
            speed: 500, // 0.5 seconds
        },
    }

    const handleInitialize = async () => {
        try {
            const names = playerNames.split(",").map((n) => n.trim())
            const result = await initializeGame(names)
            setError("")

            setBetValue(result.initialBet)
            setMultiplier(result.multiplier)
            setTargetScore(result.targetScore)
            
            // Start animation
            animateMetaCards([
                result.betCard,
                result.multiplierCard,
                result.targetCard
            ])
        } catch (err: any) {
            setError(err.message)
        }
    }

    const animateMetaCards = async (cards: CardDto[]) => {
        setIsMetaAnimating(true)

        setTimeout(() => {}, 1000)

        for (let i = 0; i < cards.length; i++) {
            setMetaCards(prev => [...prev, cards[i]])
            await new Promise(resolve => setTimeout(resolve, 2000))
        }

        await new Promise(resolve => setTimeout(resolve, 3000))

        setIsMetaAnimating(false)
        setIsMetaPhase(false)
    }

    const handlePlay = async () => {
        try {
            const result = await playRound();
            setRoundResult(result)
            setError("")

            // reset dealing state
            setDealtCards({})
            setDealtCommunity(0)
            setShowWinner(false)

            setIsGamePhase(true)
            setIsRoundOngoing(true)

            const dealSpeed = SPEED_CONFIG[gameSpeed].speed
            let delay = dealSpeed

            // deal player cards first
            result.players.forEach((player) => {

                // first card
                setTimeout(() => {
                    setDealtCards(prev => ({
                        ...prev,
                        [player.name]: 1
                    }))
                }, delay)

                delay += dealSpeed

                // second card
                setTimeout(() => {
                    setDealtCards(prev => ({
                        ...prev,
                        [player.name]: 2
                    }))
                }, delay)

                delay += dealSpeed
            })

            // then deal community cards
            result.communityCards.forEach((card, index) => {
                setTimeout(() => {
                    setDealtCommunity(prev => prev + 1)
                    
                    if (index < 3) {
                        setDisplayFlop(true)
                    } else if (index === 3) {
                        setDisplayFlop(false)
                        setDisplayTurn(true)
                    } else if (index === 4) {
                        setDisplayTurn(false)
                        setDisplayRiver(true)
                    }
                }, delay)
                delay += dealSpeed
            })

            // Suspense
            setTimeout(() => {
                setDisplayRiver(false)
                setShowSuspense(true)
            }, delay)

            delay += 1200

            // Show winner AFTER everything
            setTimeout(() => {
                setShowWinner(true)
                setShowSuspense(false)

                setCurrentScore(result.players.map(p => p.score))
                setAnimateScore(true)

                setTimeout(() => {
                    setAnimateScore(false)
                }, 300)

                // Check if already over
                if (result.isGameOver) {
                    setGameOver(true)
                }
                
                setIsRoundOngoing(false)
            }, delay)

        } catch (err: any) {
            setError(err.message)
        }
    }

    const resetGame = async () => {
        try {
            const result = await reset()
            
            setGameOver(false)

            setDealtCards({})
            setDealtCommunity(0)
            setShowWinner(false)
            setCurrentScore([])

            setIsGamePhase(false)
            setIsMetaPhase(true)

            setBetValue(0)
            setMultiplier(0)
            setTargetScore(0)
            setMetaCards([])

            handleInitialize()

        } catch (err: any) {
            setError(err.message)
        }
    } 

    return {
        playerNames,
        setPlayerNames,
        roundResult,
        error,
        dealtCards,
        dealtCommunity,
        showWinner,
        showSuspense,
        metaCards,
        betValue,
        multiplier,
        targetScore,
        isMetaPhase,
        isMetaAnimating,
        isGamePhase,
        isRoundOngoing,
        currentScore,
        animateScore,
        gameOver,
        displayFlop,
        displayTurn,
        displayRiver,
        gameSpeed,
        handleInitialize,
        handlePlay,
        resetGame,
        setGameSpeed
    }
}