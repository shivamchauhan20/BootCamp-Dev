Array.prototype.mymap = function(cb){
    let arr = [];
    for(let i = 0 ; i < this.length ; i++){
        let ans = cb(this[i]);
        arr.push(ans);
    }
    return arr;
}
function transform(ele) {
    if (ele % 2 == 0)
        return ele + 1;
    else
        return ele - 1;
}
let arr = [2,5,16,19,23];
let newArray = arr.mymap(transform);
console.log(newArray);

Array.prototype.myfilter = function(cb){
    let arr = [];
    for(let i = 0 ; i < this.length ; i++){
        let ans = cb(this[i]);
        if(ans) arr.push(this[i]);
    }
    return arr;
}
function isPrime(ele){
    for(let i = 2 ; i * i <= ele ; i++){
        if(ele % 2 == 0) return false;
    }
    return true;
}
let arr1 = [2,5,16,19,23,25];
let newArray1 = arr.myfilter(isPrime);
console.log(newArray1);