
const newToDoForm = document.querySelector('.add');
const toDoList = document.querySelector('ul');
const empty = document.querySelector('.empty');
const failSearch = document.querySelector('.failSearch');
let toDoItems = [];

//DATA 

const saveData = (data) => {
    localStorage.setItem('Todos', JSON.stringify(data));
}

const loadData = (savedData) => {

    let loaded = localStorage.getItem(savedData)
    
    if (loaded === null) {
        toDoItems = [
            'click anywhere on a todo to cross it out. Click on it again to uncheck it.',
            'click on the x to delete a todo',
            'add new /search for todos with the forms'
        ];
    } else if (JSON.parse(loaded).length === 0) {
        toggleInfo("Welcome back, your to do list is empty");
        
    } else {
        todoItems = JSON.parse(loaded);
    }
    loadToDos(toDoItems);

}


const loadToDos = (data) => {
    data.forEach(function(datum){
        generateToDo(datum, toDoList);
    });
};

const generateToDo = function (inputValue, outputTarget){
    let template =  `
    <li class="list-group-item d-flex justify-content-between align-items-center bg-light text-capitalize">
        <span class="p-1 todo">${inputValue}</span>
    <button type="button" class="close delete" aria-label="Close">
        <span class="delete" aria-hidden="true">&times;</span>
    </button>
    </li>
    `;
    outputTarget.innerHTML += template;
} 

// ADD NEW TO DO

newToDoForm.addEventListener('submit', function(e){

    e.preventDefault();
    let newToDoInput = newToDoForm.querySelector('input');
    let newToDo = newToDoInput.value.trim();

    if(newToDo.length === 0){
        info.innerText = 'New to do must be at least 1 character long';
    } else {

        toDoItems.push(newToDo);
        console.log(toDoItems);
        generateToDo(newToDo, toDoList);
        newToDoForm.reset();

        //remove h4 - remove invisible class, toggle fadeIn
        empty.classList.add('filtered');
        let result = Array.from(empty.classList).find((cls)=> cls.includes('fadeIn'));
        if (result) {
            empty.classList.toggle('fadeIn');
        }
        saveData(toDoItems);
    }
});

// MARK TO DO

toDoList.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.children[0].classList.toggle('checked');
    } else if (e.target.tagName === 'SPAN' && e.target.classList.contains('todo')) {
        e.target.classList.toggle('checked');
    }
});

// DELETE TO DO

toDoList.addEventListener('click', function(e) {

    if (e.target.tagName === "SPAN" && e.target.className === "delete") {
        e.target.parentElement.parentElement.classList.toggle('fadeOut');

        let animateTimer = setTimeout(function() {
            e.target.parentElement.parentElement.remove();
        }, 350);

        toggleInfo("Wow...it's empty here.");
        const targetToDo = e.target.parentElement.parentElement;
        const targetContent = targetToDo.children[0].textContent;
        const targetIndex = toDoItems.indexOf(targetContent)
        toDoItems.splice(targetIndex, 1);
        saveData(toDoItems);
    }
});

// CHECK IF TODOs ARE AVAILABLE TO TOGGLE INFO MESSAGE

const toggleInfo = (message) =>{
    let toDoAvailable = Array.from(toDoList.children);
    if( toDoAvailable.length <= 1) {
        let timer = setTimeout(()=>{
            empty.textContent = message;
            empty.classList.toggle('filtered');
            empty.classList.toggle('fadeIn');
        }, 300);
    }
}

const searchForm = document.querySelector('.search input');

const filterList = function (list) {

    const input = searchForm.value.trim().toLowerCase();
    const listItems = Array.from(toDoList.children);

    const filtered = listItems.filter((item)=>{
        return !item.textContent.includes(input);
    });

    const unfiltered = listItems.filter((item)=>{
        return item.textContent.includes(input);
    });

    unfiltered.forEach((item)=>{
        item.classList.remove('filtered');
        item.classList.add('unfiltered');
    })

    filtered.forEach((item)=>{
        item.classList.remove('unfiltered');
        item.classList.add('filtered');
    }) 

    if(!input){
        listItems.forEach( (listItem)=> {
            listItem.classList.remove('filtered');
            listItem.classList.remove('unfiltered');
            failSearch.classList.remove('filtered');
        })
    }

    if(filtered.length === listItems.length) {
        failSearch.classList.remove('filtered');
    } else if (unfiltered.length) {
        failSearch.classList.add('filtered');
    }

}


//Add keypress listener, and then store the present value of the input field
searchForm.addEventListener('keyup', (e)=> {

    filterList(toDoList);

});

// PAGE LOAD

window.onload = function(){
    loadData('Todos');
    let animateToDo = setTimeout( function() {
        //Remove invisible class from UL and its LI's
        toDoList.classList.remove('invisible');
        toDoList.childNodes.forEach(function(child){
           if (child.tagName === 'LI') {
               child.classList.remove('invisible');
           }
        });

        toDoList.classList.toggle('fadeIn');
    }, 500)
}



