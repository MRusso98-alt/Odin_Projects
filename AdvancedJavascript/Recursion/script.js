function fibsUtil(n){
    if(n <= 1) return n;
    return fibsUtil(n-1) + fibsUtil(n-2);
}

function fib(array, n){
    for(let i = 0; i < n; i++){
        array.push(fibsUtil(i));
    }
    return array;
}

let array = [];
console.log(fib(array, 8));