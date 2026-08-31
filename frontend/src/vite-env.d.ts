/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MUSIC_TRACK_SRC: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
