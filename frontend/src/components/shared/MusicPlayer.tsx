import { useEffect, useRef, useState } from "react"
import "./MusicPlayer.css"

interface MusicPlayerProps {
    active: boolean
    trackTitle: string
    src: string
}

export default function MusicPlayer({ active, trackTitle, src }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        if (active && !paused) {
            audio.play().catch(() => {
                // Autoplay may be blocked until the user interacts with the page;
                // the play/pause button below always works as a fallback.
            })
        } else {
            audio.pause()
        }
    }, [active, paused])

    if (!active) return null

    return (
        <div className="music-player">
            <audio ref={audioRef} src={src} loop />

            <button
                className="music-player__toggle"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play" : "Pause"}
            >
                {paused ? "▶" : "❚❚"}
            </button>

            <div className="music-player__screen">
                <div className="music-player__marquee">
                    <span>{trackTitle} &nbsp;&nbsp;•&nbsp;&nbsp; {trackTitle} &nbsp;&nbsp;•&nbsp;&nbsp; </span>
                </div>
            </div>
        </div>
    )
}
