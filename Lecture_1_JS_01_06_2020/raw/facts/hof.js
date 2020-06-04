function findFirstName(fullName){
    return fullName.split(" ")[0];
}

function findLastName(fullName){
    return fullName.split(" ")[1];
}
//higher order function
function greeter(fullName,cb){
    let message = cb(fullName);
    console.log("Hi "+message);
}

greeter("Shivam Chauhan",findFirstName);
greeter("Shivam Chauhan",findLastName);