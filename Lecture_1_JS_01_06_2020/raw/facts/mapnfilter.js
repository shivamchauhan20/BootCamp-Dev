let arr = [3, 6, 14, 16, 22];
function transform(ele) {
    if (ele % 2 == 0) {
        return ele + 1;
    }
    else
        return ele - 1;
}
// let mappedArray = arr.map(transform);
// console.log(mappedArray);
function isPrime(num) {
    for (let i = 2; i * i <= num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
// let filteredArray = mappedArray.filter(isPrime);
// console.log(filteredArray);
function myMap(arr, cb) {
    let mapped = [];
    for (let i = 0; i < arr.length; i++) {
        let ans = cb(arr[i]);
        mapped.push(ans);
    }
    return mapped;
}
let newArray = myMap(arr, transform);
console.log(arr);
console.log("------------------------------------------------------------");
console.log(newArray);