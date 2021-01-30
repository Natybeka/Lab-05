//Get the UI elements
const number = document.querySelectorAll(".number-btn");
const clearAll = document.querySelector(".clear-all");
const deleteButton = document.querySelector(".delete-item");
const functions = document.querySelectorAll(".function-btn");
const equalsButton = document.querySelector(".equals-btn");
const previousOperand = document.querySelector(".previous-input");
const nextOperand = document.querySelector(".next-input");
//saves the last two operations
var opStack = new Array();
//bool to check whether the user is entering a number 
//for the first time
var firstEntry = false;
var hasEntered = false;
//Adding click listeners to the buttons

//numbers are appended onto the nextOperand div
number.forEach(memberButton => {
    memberButton.addEventListener('click', () => {
        if (memberButton.innerHTML == '.' && nextOperand.innerHTML.includes('.'))  return;
        if (nextOperand.innerHTML == '0' && memberButton.innerHTML != '.' && !firstEntry)      return;
        if (firstEntry) {
            nextOperand.innerHTML = '';
            firstEntry = false;
        }
        nextOperand.append(memberButton.innerHTML);
        hasEntered = true;
    });
});

//clear button clear the screen
clearAll.addEventListener('click', () => {
    nextOperand.innerHTML = '';
    previousOperand.innerHTML = '';
    opStack = new Array();
});

//delete button removes the previous appended number
deleteButton.addEventListener('click', () => {
    if (nextOperand.innerHTML == ''){
        return;
    }
    if (nextOperand.innerHTML.toString().length == 1){
        nextOperand.innerHTML = '';
        return;
    }      
    var temp = nextOperand.innerHTML.toString();
    nextOperand.innerHTML = temp.slice(0, temp.length - 1);  
});



functions.forEach(member => {
    member.addEventListener('click', () => {
        firstEntry = true;
        var operation = member.innerHTML.toString();
        if (hasEntered) {
            opStack.push(nextOperand.innerHTML.toString());
            opStack.push(operation);
            previousOperand.innerHTML = previousOperand.innerHTML.toString().concat(nextOperand.innerHTML.toString(), " " , member.innerHTML.toString(), " ");
        }
        else {
            var temp = previousOperand.innerHTML.toString();
            temp = temp.replaceAt(temp.length - 2, member.innerHTML.toString());
            operation = temp.charAt(temp.length - 2);
            opStack.pop()
            opStack.push(operation);
            previousOperand.innerHTML = temp;
        }
            
        console.log(opStack.length)
        if (opStack.length >=  3) {
            opStack = compute(opStack);
            opStack.push(member.innerHTML.toString());
            nextOperand.innerHTML = opStack[0].toString();    
        }             
    });
});


function compute(opStack) {
    var operation = opStack[1];
    var result;
    switch(operation){
        case ('+'): result = parseFloat(opStack[0]) + parseFloat(opStack[2]);break;
        case ('-'): result = parseFloat(opStack[0]) - parseFloat(opStack[2]);break;
        case ('x'): result = parseFloat(opStack[0]) * parseFloat(opStack[2]);break;
        case ('/'): result = parseFloat(opStack[0]) / parseFloat(opStack[2]);break;
        default: return; 
    }
    opStack = new Array();
    opStack.push(result);
    hasEntered = false;
    return opStack;  
}

//helper replace function
String.prototype.replaceAt = function(index, newChar){
    return this.substring(0, index) + newChar + this.substring(index + 1);
};