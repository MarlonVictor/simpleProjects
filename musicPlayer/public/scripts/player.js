import audios from "../../data.js"
import {path, secondsToMinutes} from "./utils.js"
import elements from "./playerElements.js"

export default {
    audioData: audios,
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,
    start() {
        elements.set.call(this)
        this.update();
    },
    play() {
        this.audio.play()
        this.isPlaying = true
        this.playPause.innerText = 'pause'
    },
    pause() {
        this.audio.pause()
        this.isPlaying = false
        this.playPause.innerText = 'play_arrow'
    },
    togglePlayPause() {
        this.isPlaying ? this.pause() : this.play()
    },
    toggleMute() {
        this.audio.muted = !this.audio.muted
        this.vol.innerText = this.audio.muted ? 'volume_off' : 'volume_up'
    },
    setVolume(vol) {
        this.audio.volume = vol / 100
        this.volControl.value < 30 ? this.vol.innerText = 'volume_down' : this.vol.innerText = 'volume_up'
    },
    setBar(seconds) {
        this.audio.currentTime = seconds
    },
    next() {
        this.audio.pause()
        this.currentPlaying++
        if(this.currentPlaying == 3) this.restart()
        this.update()
        this.play()
    },
    timeUpdate() {
        this.atualDuration.innerText = secondsToMinutes(this.audio.currentTime)
        this.bar.value = this.audio.currentTime
    },
    update() {
        this.currentAudio = this.audioData[this.currentPlaying]

        this.cover.style.backgroundImage = `url('${this.currentAudio.cover}')`
        this.background.style.backgroundImage = `url('${this.currentAudio.cover}')`
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        elements.createAudioElement.call(this, path(this.currentAudio.file))

        this.audio.onloadeddata = () => { // Libera o actions após os meta dados serem carregados
            elements.actions.call(this)
        }
    },
    restart() {
        this.currentPlaying = 0
        this.update
    }
}