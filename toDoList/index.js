// Selecionando os elementos
const clear = document.querySelector('#clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');

// Variáveis
let LIST = [];
let id = 0;

// Mostrar a data
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('pt-BR', options);

// Pega um item do localStorage
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
        addToDo(item.name, item.id);
    }) 
}

// Limpar o localStorage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})

function addToDo(toDo, id) {        
    const text = `
        <li class="item flex items-center justify-between w-full h-12 px-3 border-b-2 border-gray-600">
            <p>${toDo}</p>
            <span class="flex-1"></span>
            <i class="far fa-check-square btn bg-gray-600 hover:bg-green-600 w-8 h-8 mr-2 rounded" id="${id}" job="done"></i>
            <i class="far fa-trash-alt btn bg-gray-600 hover:bg-red-400 w-8 h-8 rounded" job="delete"></i>
        </li>
    `
            
    const position = 'beforeEnd';

    list.insertAdjacentHTML(position, text)
}

// Adicionar toDo ao pressionar o enter
document.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        // Se o input estiver em branco
        if(toDo){
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id
            })
        }
        // Adiciona um item no localStorage
        localStorage.setItem('TODO', JSON.stringify(LIST));
  
        id++
        input.value = '';
    }
});

function completeToDo(e){
    const currentClass = e.parentNode.classList

    currentClass.contains("done") ? currentClass.remove("done") : currentClass.add("done")
}

function removeToDo(e){
    e.parentNode.parentNode.removeChild(e.parentNode);
}

list.addEventListener('click', function(e){
    const element = e.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == 'delete'){
        removeToDo(element);

    } else if(elementJob == 'done'){
        completeToDo(element);
    }

    // Adiciona um item no localStorage
    localStorage.setItem('TODO', JSON.stringify(LIST));
});