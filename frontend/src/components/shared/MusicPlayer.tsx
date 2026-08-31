import { useEffect, useRef, useState } from "react"
import "./MusicPlayer.css"

interface MusicPlayerProps {
    active: boolean
    src: string
}

function titleFromSrc(src: string): string {
    const filename = src.split("/").pop() ?? ""
    const withoutExtension = filename.replace(/\.[^/.]+$/, "")

    return withoutExtension
        .split(/[-_]+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

export default function MusicPlayer({ active, src }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [paused, setPaused] = useState(false)
    const trackTitle = titleFromSrc(src)

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
