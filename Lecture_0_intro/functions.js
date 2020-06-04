function sayHi(message){
    console.log("Hi "+message);
    return 10;
}
let value = sayHi("Shivam Chauhan");
console.log(value);
let fnKa = function greeter(){
    console.log("Because functions are variables");
    return 10;
}
console.log(fnKa);
console.log(fnKa());
function greater(param){
    console.log("Inside greater");
    console.log(param);
    param();
}
greater(function inner(){
    console.log("I am inner Function");
    let a = 10;
    console.log(++a);
})
