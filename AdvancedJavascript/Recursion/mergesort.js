
function merge(array, left, mid, right){
    // Create temporary arrays for left and right halves
    let leftArr = array.slice(left, mid);
    let rightArr = array.slice(mid, right);
    
    let i = 0, j = 0, k = left;
    
    // Merge the two sorted arrays back into the original array
    while(i < leftArr.length && j < rightArr.length){
        if(leftArr[i] <= rightArr[j]){
            array[k++] = leftArr[i++];
        } else {
            array[k++] = rightArr[j++];
        }
    }
    
    // Copy remaining elements from left array
    while(i < leftArr.length){
        array[k++] = leftArr[i++];
    }
    
    // Copy remaining elements from right array
    while(j < rightArr.length){
        array[k++] = rightArr[j++];
    }
}

function mergesort(array, left, right){
    if(right - left <= 1) return array;
    if(left < right){
        const mid = Math.floor((left + right)/2);
        mergesort(array, left, mid);
        mergesort(array, mid, right);
        merge(array, left, mid, right);
    }
}

let array = [2, 4, 98, 7, 4, 75, 38, 29, 94, 20, 4, 29, 73];
mergesort(array, 0, array.length);
console.log(array);