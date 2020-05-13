
const newToDoForm = document.querySelector('.add');
let toDoList = document.querySelector('ul');
const empty = document.querySelector('.empty');
const failSearch = document.querySelector('.failSearch');

let toDoData = [
    'click anywhere on a todo to cross it out. Click on it again to uncheck it.',
    'click on the x to delete a todo',
    'add new /search for todos with the forms'
];

const loadToDos = function() {
    toDoData.forEach(function(data){
        generateToDo(data, toDoList);
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
    const info = document.querySelector('.info');

    if(newToDo.length === 0){
        info.innerText = 'New to do must be at least 1 character long';
    } else {
        toDoData.push(newToDo);
        generateToDo(newToDo, toDoList);
        info.innerText = 'Add a new to do...';
        newToDoForm.reset();
        //remove h4 - remove invisible class, toggle fadeIn
        empty.classList.add('filtered');
        let result = Array.from(empty.classList).find((cls)=> cls.includes('fadeIn'));
        if (result) {
            empty.classList.toggle('fadeIn');
        }
        // let timer = setTimeout( ()=> {

        // }, 400)
    }
});

// CHECK TO DO

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

        checkToDos();
    }
});

// CHECK IF TODOs ARE AVAILABLE

const checkToDos = function(){
    
    let toDoAvailable = Array.from(toDoList.children);
    if( toDoAvailable.length <= 1) {
        let timer = setTimeout(()=>{
            empty.classList.toggle('filtered');
            empty.classList.toggle('fadeIn');
        }, 300);
    }

}


// SEARCH TO DO
//Function - 
//A. detect when a user enters an input, and 
//B. searches the list items for any matchers
//the matchers remain on the page, the ones not matching disappears from the page

//A.
//target search form
const searchForm = document.querySelector('.search input');

// FILTER LIST
/*
1) filterList requires an input field - and list items. It searches amongst list items 
currently present in the DOM - and returns a filtered and unfiltered array. 

2) The filtered array are list items that do not include the phrase in the form

3) The unfiltered array are list items that includes the phrases in the form.

4) We then add the .filtered class to elements that are filtered - which is likely to hide them

5) We remove the .filtered class from the elements that aren't filtered at any point.


*/

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
    loadToDos();
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


