class Node{
    value;
    next;

    constructor(value = null, next = null){
        this.value = value;
        this.next = next;
    }

    setValue(value){
        this.value = value;
    }

    setNext(next){
        this.next = next;
    }

    getValue(){
        return this.value;
    }

    getNext(){
        return this.next;
    }
}

class LinkedList{
    head;
    
    constructor(key, value){
        this.head = new Node(null, null);
    }

    append(value){
        if(this.head.getValue() === null) this.head.setValue(value);
        else{
            let node = this.head;
            while(node.getNext()){
                node = node.getNext();
            }
            node.setNext(new Node(value));
        }
    }

    prepend(value){
        if(this.head.getValue() === null) this.head.setValue(value);
        else{
            let newHead = new Node(value, this.head);
            this.head = newHead;
        }
    }

    size(){
        let count;
        if(this.head.getValue() === null) return 0;
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

    head(){
        if(this.head.getValue() === null) return undefined;
        else return this.head();
    }

    tail(){
        if(this.head.getValue() === null) return undefined;
        else{
            let tail = this.head;
            while(tail.getNext()){
                tail = tail.getNext();
            }
            return tail;
        }
    }

    at(index){
        if(this.head.getValue() === null || this.size() <= index) return undefined;
        else{
            let node = this.head;
            for(let i = 0; i < index; i++){
                node = node.getNext();
            }
            console.log(node.getValue());
            return node;
        }
    }

    pop(){
        if(this.head.getValue() === null) return undefined;
        if(this.head.getNext() === null) this.head.setValue(null);
        else this.head = this.head.getNext();
    }

    contains(value){
        if(this.head.getValue() === null) return undefined;
        else{
            let node = this.head;
            if (node.getValue() === value) return true;
            while(node.getNext()){
                node = node.getNext();
                if (node.getValue() === value) return true;
            }
            return false;
        }
    }

    findIndex(value){
        if(this.head.getValue() === null) return -1;
        else{
            let index = 0;
            let node = this.head;
            if (node.getValue() === value) return index;
            while(node.getNext()){
                index++;
                node = node.getNext();
                if (node.getValue() === value) return index;
            }
            return -1;
        }
    }

    insertAt(index, ...values){
        if(index < 0 || this.size() <= index) throw RangeError;
        else{
            let head = this.head;
            for(let i = 0; i < index; i++){
                head = head.getNext();
            }
            let tail = head.getNext();
            for(let i = 0; i < values.length; i++){
                head.setNext(new Node(values[i]));
                head = head.getNext();
            }
            head.setNext(tail);
        }
    }

    removeAt(index){
        if(index < 0 || this.size() <= index) throw RangeError;
        else{
            let node = this.head;
            for(let i = 0; i < index-1; i++){
                node = node.getNext();
            }
            node.setNext(node.getNext().getNext());
        }
    }
    
    toString(){
        let node = this.head;
        let string = "";

        while(1){
            if(node != null && node.getValue()){
                string = string += "( " + node.getValue() + " ) -> ";
                node = node.getNext();
            } else {
                string = string + "null";
                return string;
            }
        }
    }
}

let myList = new LinkedList();
myList.append("house");
myList.prepend("lift");
myList.append("dog");
myList.prepend("car");
myList.pop();
myList.prepend("bike");
myList.append("swim");
myList.insertAt(2, "bye", "happy", "fun");
myList.removeAt(5);
console.log(myList.toString());
console.log(myList.size());
console.log(myList.findIndex("dog"));

