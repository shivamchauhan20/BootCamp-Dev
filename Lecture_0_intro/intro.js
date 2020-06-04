console.log("Hello All");
let number = 23;
for(let i = 2 ; i * i <= number ; i++){
    if(number % i == 0){
        console.log("Number is not prime");
        return;
    }
}
console.log("Number is Prime");
