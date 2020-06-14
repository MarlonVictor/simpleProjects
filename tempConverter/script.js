document.querySelector('#temperatura-input').addEventListener('input', (e) => {
    let tempInput = parseFloat(e.target.value)

    if(tempInput) {
        document.querySelector('#output').style.display = 'inline'
    
        // Primeira saida
        document.querySelector('#output-1').innerHTML = (tempInput + 273.15).toFixed(2) + ' °K';
    
        // Segunda saida
        document.querySelector('#output-2').innerHTML = ((5 / 9) * ((tempInput) -32)).toFixed(2) + ' °F'

        // Última saida
        document.querySelector('#output-3').innerHTML = ((tempInput + 273.15) * (9 / 5)).toFixed(2) + ' °R'
    } else
        document.querySelector('#output').style.display = 'none'
})