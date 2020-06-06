function transform(ele) {
    if (ele % 2 == 0) {
        return ele + 1;
    }
    else {
        return ele - 1;
    }
}
function isPrime(ele) {
    for (let i = 2; i * i <= ele; i++) {
        if (ele % i == 0)
            return false;
    }
    return true;
}
Array.prototype.myMap = function (cb) {
    let mappedArr = [];
    for (let i = 0; i < this.length; i++) {
        mappedArr.push(cb(this[i]));
    }
    return mappedArr;
}
Array.prototype.myFilter = function (cb) {
    let filteredArr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i]))
            filteredArr.push(this[i]);
    }
    return filteredArr;
}
let arr = [1, 2, 3, 4, 5];
let mapArr = arr.myMap(transform);
console.log(mapArr);
let filteredArr = arr.myFilter(isPrime);
console.log(filteredArr);