import type { GameStartDto, PlayerDto, RoundResultDto } from "../types/game"

const BASE_URL = "http://localhost:8080/api/game"

export async function initializeGame(players: string[]): Promise<GameStartDto> {
    const response = await fetch(`${BASE_URL}/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            playerNames: players
        })
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Something went wrong")
    }

    return response.json()

}

export async function playRound(): Promise<RoundResultDto> {
    const response = await fetch(`${BASE_URL}/play`, {
        method: "POST"
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Something went wrong")
    }

    return response.json()
}

export async function getPlayers(): Promise<PlayerDto[]> {
    const response = await fetch(`${BASE_URL}/players`)
    return response.json()
}

export async function reset() {
    const response = await fetch(`${BASE_URL}/reset`, {
        method: "POST"
    })
    return response.json
}
