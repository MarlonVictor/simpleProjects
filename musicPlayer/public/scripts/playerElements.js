import {secondsToMinutes} from './utils.js'

export default {
    set() {
        this.background    = document.querySelector('#background')
        this.cover         = document.querySelector('.card-image')
        this.title         = document.querySelector('.card-content h5')
        this.artist        = document.querySelector('.artist')
        this.playPause     = document.querySelector('#play')
        this.volControl    = document.querySelector('#volume')
        this.vol           = document.querySelector('.vol')
        this.bar           = document.querySelector('#bar')
        this.atualDuration = document.querySelector('#current-duration')
        this.totalDuration = document.querySelector('#total-duration')
        this.buttonNext    = document.querySelector('#next')
    },

    createAudioElement(track) {
        this.audio = new Audio(track)
    },

    actions() {
        this.audio.ontimeupdate = () => this.timeUpdate()
        this.playPause.onclick  = () => this.togglePlayPause()
        this.volControl.oninput = () => this.setVolume(this.volControl.value)
        this.audio.onended      = () => this.next()
        this.bar.onchange       = () => this.setBar(this.bar.value)
        this.vol.onclick        = () => this.toggleMute()
        this.buttonNext.onclick = () => this.next()
        
        this.totalDuration.innerText = secondsToMinutes(this.audio.duration)
        this.bar.max = this.audio.duration
    }
}