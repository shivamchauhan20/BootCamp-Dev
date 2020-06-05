//Function statement
function sayHello(){
    console.log("I am a function statement.");
}

//fn are variables
//Funciton expression
let fnVar = function(){
    console.log("I am a funtion expression.");
}

//Arrow Function
let arrowFn = () =>{
    console.log("I am a arrow function.");
}
sayHello();
fnVar();
arrowFn();
//IIFEE=>Immediately invoked fn expression
(function anotherFn(){
    console.log("I will be called immediately after my creation.");
})();
