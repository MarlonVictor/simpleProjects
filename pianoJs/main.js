const keys = document.querySelectorAll('.key')

function playNote(event) {
    let audioKeyCode = getKeyCode(event)

    const key = document.querySelector(`.key[data-key='${audioKeyCode}']`)
    const isKeyExists = key

    // If key not exists
    if(!isKeyExists) {
        return
    }

    addClass(key)
    playAudio(audioKeyCode)
}

function addClass(key) {
    key.classList.add('playing')
}

function removeClass(event) {
    event.target.classList.remove('playing')
}

function getKeyCode(event) {
    let keyCode

    const isKeyboard = event.type === 'keydown'
    if(isKeyboard) {
        keyCode = event.keyCode
    } else {
        keyCode = event.target.dataset.key
    }

    return keyCode
}

function playAudio(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key='${audioKeyCode}']`)
    audio.currentTime = 0
    audio.play()
}

// Call notes
keys.forEach( key => {
    key.addEventListener('click', playNote) // With mouse  
    key.addEventListener('transitionend', removeClass)
})
window.addEventListener('keydown', playNote) // With keys