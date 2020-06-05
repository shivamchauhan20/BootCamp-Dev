//lexical scope => It is where the function reside physically.
let myVal = 3;
function c(){
    console.log("Inside C "+myVal);
}
function b(){
    let myVal = 2;
    console.log("Indide B "+myVal);
    c();
}
function a(){
    let myVal = 1;
    console.log("Inside A "+myVal);
    b();
}
a();