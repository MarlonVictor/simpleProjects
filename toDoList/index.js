// Selecionando os elementos
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');

// Variaveis
let LIST = [];
let id = 0;

// Mostrar a data
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('pt-BR', options);

// Pega um item do localstorage
let data = localStorage.getItem('TODO');

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

// Carrega os itens na interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.trash);
    }) 
}

// Limpar o localstorage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})

// 

function addToDo(toDo, id, trash) {

    if(trash) return;

    const text = `
        <li class="item">${toDo}
            <i class="far fa-trash-alt icon" id="${id}" job="delete"></i>
            <i class="far fa-check-square icon green" onclick=done()></i>
        </li>
        `
            
    const position = 'beforeEnd';

    list.insertAdjacentHTML(position, text)
}

// Adicionar toDo ao presionar o enter
document.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        // Se o input estiver em branco
        if(toDo){
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                trash: false
            })
        }
        // Adiciona um item no localstorage
        localStorage.setItem('TODO', JSON.stringify(LIST));
  
        id++
        input.value = '';
    }
});

function completeToDo(e){
    e.classList.toggle(check);
    e.classList.toggle(uncheck);
    e.parentNode.querySelector('li').classList.toggle('check');

    LIST[e.id].done = LIST[e.id].done ? false : true;
}

function removeToDo(e){
    e.parentNode.parentNode.removeChild(e.parentNode);

    LIST[e.id].trash = true
}

list.addEventListener('click', function(e){
    const element = e.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == 'delete'){
        removeToDo(element);
    }

    // Adiciona um item no localstorage
    localStorage.setItem('TODO', JSON.stringify(LIST));
});

// Btn check
function done(){
    document.querySelector('li').classList.add("check");
}