const input = document.querySelector('#temperatura-input')
const result = document.querySelector('#output')

// buttons radio
const checkCelsius = document.querySelector('#C')
const checkFahrenheit = document.querySelector('#F')
const checkKelvin = document.querySelector('#K')
const checkRankine = document.querySelector('#R')

input.addEventListener('input', e => {
    let tempInput = parseFloat(e.target.value)

    if(tempInput) {
        result.style.display = 'inline'

        const saida1 = document.querySelector('#output-1')
        const saida2 = document.querySelector('#output-2')
        const saida3 = document.querySelector('#output-3')

        if(checkCelsius.checked) {
            saida1.innerHTML = (tempInput + 273.15).toFixed(2) + ' °K'
            saida2.innerHTML = (tempInput * 1.8 + 32).toFixed(2) + ' °F'
            saida3.innerHTML = ((tempInput + 273.15) * (9 / 5)).toFixed(2) + ' °R'

        } else if(checkFahrenheit.checked) {
            saida1.innerHTML = ((tempInput - 32) * 5/9 + 273.15).toFixed(2) + ' °K'
            saida2.innerHTML = ((tempInput - 32) / 1.8).toFixed(2) + ' °C'
            saida3.innerHTML = (tempInput + 459.67).toFixed(2) + ' °R'

        } else if(checkKelvin.checked) {
            saida1.innerHTML = (tempInput - 273.15).toFixed(2) + ' °C'
            saida2.innerHTML = ((tempInput - 273.15) * 9/5 + 32).toFixed(2) + ' °F'
            saida3.innerHTML = (tempInput * 1.8).toFixed(2) + ' °R'

        } else if(checkRankine.checked) {
            saida1.innerHTML = (tempInput * 5/9).toFixed(2) + ' °K'
            saida2.innerHTML = (tempInput - 459.67).toFixed(2) + ' °F'
            saida3.innerHTML = ((tempInput - 491.67) * 5/9).toFixed(2) + ' °C'
        }
    }
})

function clearInput() {
    input.value = ''
    result.style.display = 'none'
}

checkCelsius.onchange = () => {
    clearInput()
    input.placeholder = '°C'
}

checkFahrenheit.onchange = () => {
    clearInput()
    input.placeholder = '°F'
}

checkKelvin.onchange = () => {
    clearInput()
    input.placeholder = '°K'
}

checkRankine.onchange = () => {
    clearInput()
    input.placeholder = '°R'
}