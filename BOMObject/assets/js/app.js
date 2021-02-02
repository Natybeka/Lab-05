// Define UI Variables 
const taskInput = document.querySelector('#task'); //the task input text field
const form = document.querySelector('#task-form'); //The form at the top
const filter = document.querySelector('#filter'); //the task filter text field
const taskList = document.querySelector('.collection'); //The UL
const clearBtn = document.querySelector('.clear-tasks'); //the all task clear button
const sortAscending = document.querySelector('#ascending');
const sortDescending = document.querySelector('#descending');
const reloadIcon = document.querySelector('.fa'); //the reload button at the top navigation 
var globalTaskList = new Array();
// Add Event Listener  [Form , clearBtn and filter search input ]

// form submit 
form.addEventListener('submit', addNewTask);
// Clear All Tasks
clearBtn.addEventListener('click', clearAllTasks);
//   Filter Task 
filter.addEventListener('keyup', filterTasks);
// Remove task event [event delegation]
taskList.addEventListener('click', removeTask);
// Event Listener for reload 
reloadIcon.addEventListener('click', reloadPage);





// Add New  Task Function definition 
function addNewTask(e) {

    e.preventDefault(); //disable form submission


    // Check empty entry
    if (taskInput.value === '') {
        taskInput.style.borderColor = "red";

        return;
    }

    // Create an li element when the user adds a task 
    const li = document.createElement('li');
    // Adding a class
    li.className = 'collection-item';
    // Create text node and append it 
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new element for the link 
    const link = document.createElement('a');
    // Add class and the x marker for a 
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append to UL 
    taskList.appendChild(li);
    globalTaskList.push(Task(new Date().getTime(), li));
    
}

var Task = function(date, li){
    var obj = {};
    obj.date = date;
    obj.li = li;
    return obj;
};







// Clear Task Function definition 
function clearAllTasks() {

    //This is the first way 
    // taskList.innerHTML = '';

    //  Second Wy 
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

}



// Filter tasks function definition 
function filterTasks(e) {

    /*  
    Instruction for Handling the Search/filter 
    
    1. Receive the user input from the text input 
    2. Assign it to a variable so the us can reuse it 
    3. Use the querySelectorAll() in order to get the collection of li which have  .collection-item class 
    4. Iterate over the collection item Node List using forEach
    5. On each element check if the textContent of the li contains the text from User Input  [can use indexOf]
    6 . If it contains , change the display content of the element as block , else none
    
    
    */
    var items = document.querySelectorAll('.collection-item');
    items.forEach(node => {
        var search = filter.value.toString();
        if (node.childNodes[0].nodeValue.toString().includes(search)) {
            node.style.display = 'block';
        }
        else {
            node.style.display = 'none';
        }
    });

}

// Remove Task function definition 
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure about that ?')) {
            e.target.parentElement.parentElement.remove();

        }

    }
}


// Reload Page Function 
function reloadPage() {
    //using the reload fun on location object 
    location.reload();
}



// function sortAscending(dateArray) {
//     for(let i = 0; i < dateArray.length;i++) {
//         for(let j = i + 1; dateArray[j] < dateArray[j - 1]; j--){
//             var swap = dateArray[j];
//             dateArray[j] = dateArray[j - 1];
//             dateArray[j - 1] = swap;
//         }
//     }
// }

// function sortDescending(dateArray) {
//     for(let i = 0; i < dateArray.length;i++) {
//         var currentMax = dateArray[i];
//         var currentMaxIndex = i;
//         for(let j = i + 1; j < dateArray.length; j++){
//             if (dateArray[j] > currentMax){ 
//                 currentMaxIndex = j;
//             }        
//         }
//         if (i !== currentMaxIndex) {
//             var swap = dateArray[i];
//             dateArray[i] = dateArray[currentMaxIndex];
//             dateArray[currentMaxIndex] = swap;
//         }   
//     }
// }
globalTaskList.sort((a, b) => {
    if (a.date < b.date) return -1;
    else return 1;
});
sortAscending.addEventListener('click', () => { 
    clearAllTasks();
    globalTaskList.forEach(node => {
        taskList.appendChild(node.li);
    })
});

sortDescending.addEventListener('click', () => {
    globalTaskList.sort()
    clearAllTasks();
    for(let i = globalTaskList.length - 1; i >= 0;i--){
        taskList.appendChild(globalTaskList[i].li);
    } 
});