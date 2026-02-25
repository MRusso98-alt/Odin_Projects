class Pair{
    key;
    value;
    
    constructor(key, value){
        this.key = key;
        this.value = value;
    }

    getKey(){
        return this.key;
    }

    getPairValue(){
        return this.value;
    }
}

class Node{
    value;
    next;

    constructor(value, next = null){
        this.value = value;
        this.next = next;
    }

    setNodeValue(value){
        this.value = value;
    }

    setNext(next){
        this.next = next;
    }

    getNodeValue(){
        return this.value;
    }

    getNext(){
        return this.next;
    }
}

class LinkedList{
    head;
    
    constructor(key, value){
        this.head = new Node(new Pair(key, value));
    }

    getHead(){
        return this.head;
    }

    setHead(head){
        this.head = head;
    }

    append(key, value){
        if(this.head.getNodeValue() === null) this.head.setNodeValue(new Pair(key, value));
        else{
            let node = this.head;
            while(node.getNext()){
                node = node.getNext();
            }
            node.setNext(new Node(new Pair(key, value)));
        }
    }

    size(){
        let count;
        if(!this.head || this.head.getNodeValue() === null) return 0;
        else{
            count = 1;
            let node = this.head;
            while(node.getNext()){
                node = node.getNext();
                count++;
            }
            return count;
        }
    }

    findIndex(key){
        if(this.head.getNodeValue() === null) return -1;
        else{
            let index = 0;
            let node = this.head;
            while(node){
                if (node.getNodeValue().getKey() === key) return index;
                index++;
                node = node.getNext();
            }
            return -1;
        }
    }

    removeAt(index){
        if(index < 0 || this.size() <= index) throw RangeError;
        else{
            let node = this.head;
            if(index === 0) this.head = this.head.getNext();
            else {
                for(let i = 0; i < index-1; i++){
                    node = node.getNext();
                }
                if(node.getNext()) node.setNext(node.getNext().getNext());
                else node.setNext(null);
            }
        }
    }

    print(){
        if(this.head.getNodeValue() === null) return;
        else{
            let node = this.head;
            while(node){
                console.log("[" + node.getNodeValue().getKey() + ", " + node.getNodeValue().getPairValue() + "] ");
                node = node.getNext();
            }
        }
    }

    keys(){
        if(this.head.getNodeValue() === null) return [];
        else {
            let keys = [];
            let node = this.head;
            while(node){
                keys.push(node.getNodeValue().getKey());
                node = node.getNext();
            }
            return keys;
        }
    }

    values(){
        if(this.head.getNodeValue() === null) return [];
        else {
            let values = [];
            let node = this.head;
            while(node){
                values.push(node.getNodeValue().getPairValue());
                node = node.getNext();
            }
            return values;
        }
    }
}

class HashMap{
    loadFactor;
    capacity;
    elements;
    buckets;

    constructor(){
        this.elements = 0;
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(16).fill(null);
    }

    grow(){
        if(this.elements > this.loadFactor*this.capacity) this.capacity *= 2;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.capacity;
        }

        return hashCode;
    } 

    set(key, value){
        const index = this.hash(key);
        if(this.buckets[index] === null){
            this.buckets[index] = new LinkedList(key, value);
        } else{
            let node = this.buckets[index].getHead();
            while(node != null){
                if(node.getNodeValue().getKey() === key){
                    node.setNodeValue(new Pair(key, value));
                    return;
                }
                node = node.getNext();
            }
            this.buckets[index].append(key, value);
        }
        this.elements++;
        this.grow();
    }

    has(key){
        const index = this.hash(key);
        if(this.buckets[index] === null){
            return false;
        } else{
            let node = this.buckets[index].getHead();
            while(node != null){
                if(node.getNodeValue().getKey() === key){
                    return true;
                }
                node = node.getNext();
            }
        }
    }

    remove(key){
        const index = this.hash(key);
        if(this.buckets[index] === null){
            return false;
        } else{
            const indexOfKey = this.buckets[index].findIndex(key);
            if(indexOfKey == -1) return false;
            else{
                this.buckets[index].removeAt(indexOfKey);
                if(this.buckets[index].size() === 0) this.buckets[index] = null;
                this.elements--;
                return true;
            }
        }
    }

    length(){
        let size = 0;
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i]) size += this.buckets[i].size();
        }
        return size;
    }

    clear(){
        this.buckets = new Array(16).fill(null);
        this.elements = 0;
    }

    keys(){
        let keys = [];
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i]){
                keys = keys.concat(this.buckets[i].keys());
            }
        }
        return keys;
    }

    values(){
        let values = [];
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i]){
                values = values.concat(this.buckets[i].values());
            }
        }
        return values;
    }

    entries(){
        for(let i = 0; i < this.capacity; i++){
            if(this.buckets[i]) this.buckets[i].print();
        }
    }
}

myHash = new HashMap();
myHash.set('apple', 'red')
myHash.set('banana', 'yellow')
myHash.set('carrot', 'orange')
myHash.set('dog', 'brown')
myHash.set('elephant', 'gray')
myHash.set('frog', 'green')
myHash.set('grape', 'purple')
myHash.set('hat', 'black')
myHash.set('ice cream', 'white')
myHash.set('jacket', 'blue')
myHash.set('kite', 'pink')
myHash.set('lion', 'golden')
console.log(myHash.length());
console.log(myHash.has("jacket"));
console.log(myHash.has("pain"));
console.log(myHash.remove("jacket"))
console.log(myHash.has("jacket"));
console.log(myHash.length());
myHash.entries();
console.log(myHash.keys());
console.log(myHash.values());