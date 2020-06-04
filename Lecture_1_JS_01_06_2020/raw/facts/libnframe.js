function framework(data,scb,fcb){
    for(let i = 2 ; i * i <= data ; i++){
        if(data % i == 0){
            return fcb();
        }
    }
    return scb();
}
let {exec} = require("child_process");
function scb(){
    console.log("Number is prime");
    //Now if we want to open chrome when this function is called
    exec('start chrome').unref();
}
function fcb(){
    console.log("number is not prime");
    //Now if we want to open calculator when this function is called
    exec('calc').unref();
}
framework(21,scb,fcb);
framework(23,scb,fcb);