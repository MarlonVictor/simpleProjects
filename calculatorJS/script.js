let displayBuffer = '';
    number = '';
    term = [undefined,undefined,undefined];
    result = undefined;
    displayUp = document.getElementById('display_up')
    displayDown = document.getElementById('display_down')

    function showDisplay(content) {
        displayBuffer = displayBuffer.concat(content);
        displayDown.innerHTML = displayBuffer;
    }

    function pressNum(num) {
        number = number.concat(num.innerHTML);
        showDisplay(num.innerHTML);
    }

    function pressOperator(op) {    
        term[0] = number;
        term[1] = op.innerHTML;
        showDisplay(op.innerHTML);
        number = '';            
    }

    function pressEqual() {
            if(term[0] != undefined && term[1] != undefined && number != '') {
                var keepResult;
                term[2] = number;
                switch (term[1]) {
                    case '+':
                        result = Number(term[0]) + Number(term[2])
                        break
                    case '-':
                        result = Number(term[0]) - Number(term[2])
                        break
                    case 'x':
                        result = Number(term[0]) * Number(term[2])
                        break
                    case '÷':
                        result = Number(term[0]) / Number(term[2])
                        break                
            }
            keepResult = result;
            clearAll();
            showDisplay(result);
            number = keepResult.toString();
            displayUp.innerHTML = `${term[0]} ${term[1]} ${term[2]}`
            }
    }

    function pressDelete() {
        displayBuffer = displayBuffer.substring(0,(displayBuffer.length - 1));
        displayDown.innerHTML = displayBuffer;
    }

    function clearAll(){
        number = '';
        displayBuffer = '';
        displayDown.innerHTML = displayBuffer;
        displayUp.innerHTML = displayBuffer;
    }
