export function capitalize(string){
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export function reverseString(string){
    return string.split("").reverse().join("");
}

export class calculator{
    sum(a, b){
        return a + b;
    }

    subtract(a, b){
        return a - b;
    }

    multiply(a, b){
        return a * b;
    }

    divide(a, b){
        return a/b;
    }
}

export function caesar(string, factor){
    let shifted = "";
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for(let i = 0; i < string.length; i++){
        const myChar = string.charAt(i);
        if(myChar === myChar.toUpperCase()){
            let index = (uppercase.indexOf(myChar) + factor)%26;
            shifted += uppercase.charAt(index);
        } else {
            let index = (lowercase.indexOf(myChar) + factor)%26;
            shifted += lowercase.charAt(index);
        }
    };
    return shifted;
}

export function analyzeArray(array){
    const obj = {
        average: array.reduce((sum, a)=> sum + a, 0)/array.length,
        min: Math.min(...array),
        max: Math.max(...array),
        length: array.length
    };

    return obj;
}