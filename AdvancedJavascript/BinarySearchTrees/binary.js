
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.getRight(), `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue()}`);
  prettyPrint(node.getLeft(), `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

class Node{
    #value;
    #left;
    #right;

    constructor(value = null, left = null, right = null){
        this.#value = value;
        this.#left = left;
        this.#right = right;
    }

    getValue(){
        return this.#value;
    }

    setValue(value){
        this.#value = value;
    }

    getLeft(){
        return this.#left;
    }

    setLeft(left){
        this.#left = left;
    }

    getRight(){
        return this.#right;
    }

    setRight(right){
        this.#right = right;
    }
}

class Tree{
    #root;

    #sort(array){
        for(let i = 0; i < array.length; i++){
            let min = Number.MAX_SAFE_INTEGER;
            let index = -1;
            for(let j = i; j < array.length; j++){
                if(array[j] < min){
                    min = array[j];
                    index = j;
                }
            }
            [array[i], array[index]] = [array[index], array[i]];
        }
        return array;
    }

    #createBalancedTree(array, start, end){
        if(start > end) return null;
        const mid = Math.floor((start + end) / 2);
        return new Node(
            array[mid],
            this.#createBalancedTree(array, start, mid - 1),
            this.#createBalancedTree(array, mid + 1, end)
        );
    }

    getRoot(){
        return this.#root;
    }

    constructor(array){
        this.#root = this.#createBalancedTree(this.#sort(array), 0, array.length-1);
    }

    #findNode(value){
        let node = this.#root;
        while(node){
            if(node.getValue() === value) return node;
            else if (node.getValue() > value) node = node.getLeft();
            else if (node.getValue() < value) node = node.getRight();
        }
        return null;
    }

    includes(value){
        if(this.#findNode(value)) return true;
        return false;
    }

    insert(value){
        let node = this.#root;
        while(node){
            if(value < node.getValue()){
                if(!node.getLeft()){
                    node.setLeft(new Node(value));
                    return;
                }
                node = node.getLeft();
            }

            if(value > node.getValue()){
                if(!node.getRight()){
                    node.setRight(new Node(value));
                    return;
                }
                node = node.getRight();
            }
        }
    }

    #findSuccessor(value){
        let node = this.#root;
        while(node){
            if(value < node.getValue()) node = node.getLeft();
            else if(value > node.getValue()) node = node.getRight();
            else if(value === node.getValue()){
                node = node.getRight()
                while(node && node.getLeft()) node = node.getLeft();
                return node;
            }
        }
    }

    // recursively delete a value starting from the given node
    #deleteNode(node, value) {
        if (node === null) return null;

        if (value < node.getValue()) {
            node.setLeft(this.#deleteNode(node.getLeft(), value));
        } else if (value > node.getValue()) {
            node.setRight(this.#deleteNode(node.getRight(), value));
        } else {
            // found the node to delete
            if (!node.getLeft() && !node.getRight()) {
                // no children
                return null;
            }
            if (!node.getLeft()) {
                return node.getRight();
            }
            if (!node.getRight()) {
                return node.getLeft();
            }

            // two children: replace value with successor
            const successor = this.#findSuccessor(node.getValue());
            node.setValue(successor.getValue());
            node.setRight(this.#deleteNode(node.getRight(), successor.getValue()));
        }
        return node;
    }

    deleteItem(value){
        if(!this.includes(value)) return;
        this.#root = this.#deleteNode(this.#root, value);
    }

    #levelOrderUtil(node, callback, queue){
        if(!node) return;
        callback(node.getValue());
        if(node.getLeft()) queue.push(node.getLeft());
        if(node.getRight()) queue.push(node.getRight());
        this.#levelOrderUtil(queue.shift(), callback, queue);
    }

    levelOrderForEach(callback){
        if(typeof callback != "function") throw Error;
        let queue = [];
        queue.push(this.#root);
        this.#levelOrderUtil(queue.shift(), callback, queue);
        console.log("\n");
    }

    #inOrderUtil(node, callback){
        if(!node) return;
        this.#inOrderUtil(node.getLeft(), callback);
        callback(node.getValue());
        this.#inOrderUtil(node.getRight(), callback);
    }

    inOrderForEach(callback){
        if(typeof callback != "function") throw Error;
        this.#inOrderUtil(this.#root, callback);
        console.log("\n");
    }

    #preOrderUtil(node, callback){
       if(!node) return;
       callback(node.getValue());
       this.#preOrderUtil(node.getLeft(), callback);
       this.#preOrderUtil(node.getRight(), callback);
    }

    preOrderForEach(callback){
        if(typeof callback != "function") throw Error;
        this.#preOrderUtil(this.#root, callback);
        console.log("\n");
    }

    #postOrderUtil(node, callback){
       if(!node) return;
       this.#postOrderUtil(node.getLeft(), callback);
       this.#postOrderUtil(node.getRight(), callback);
       callback(node.getValue());
    }

    postOrderForEach(callback){
        if(typeof callback != "function") throw Error;
        this.#postOrderUtil(this.#root, callback);
        console.log("\n");
    }

    #heightUtil(node){
        if(!node) return -1;
        return Math.max(this.#heightUtil(node.getLeft())+1, this.#heightUtil(node.getRight())+1);
    }

    height(value){
        if(!this.includes(value)) return undefined;
        return this.#heightUtil(this.#findNode(value));
    }

    #depthUtil(node, value, height){
        if(node.getValue() === value) return height;
        if(node.getValue() < value) return this.#depthUtil(node.getRight(), value, height+1);
        if(node.getValue() > value) return this.#depthUtil(node.getLeft(), value, height+1);
    }

    depth(value){
        if(!this.includes(value)) return undefined;
        return this.#depthUtil(this.#root, value, 1);
    }

    #balancedUtil(node){
        if(!node) return true;
        const leftHeight = node.getLeft()? this.height(node.getLeft().getValue()) : 0;
        const rightHeight = node.getRight()? this.height(node.getRight().getValue()) : 0;
        
        return (Math.abs(leftHeight - rightHeight) <=1  
        && this.#balancedUtil(node.getLeft()) && this.#balancedUtil(node.getRight()));
    }

    isBalanced(){
        return this.#balancedUtil(this.#root);
    }

    rebalance(){
        let sorted = [];
        this.inOrderForEach((c) => sorted.push(c));
        this.#root = this.#createBalancedTree(sorted, 0, sorted.length-1);
    }
}

let myArray = [1, 4, 6, 8, 56, 53, 32, 23, 6, 5, 7, 23, 54, 6, 29, 94, 60, 97, 85, 34, 22, 34, 56, 64, 76, 87, 24, 65, 45];
let uniqueArray = Array.from(new Set(myArray));
let myTree = new Tree(uniqueArray);
process.stdout.write("LevelOrder: "); myTree.levelOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("InOrder: "); myTree.inOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("PreOrder: "); myTree.preOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("PostOrder: "); myTree.postOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("Is balanced: "); console.log(myTree.isBalanced());
myTree.insert(100);
myTree.insert(110);
myTree.insert(112);
myTree.insert(123);
myTree.insert(145);
process.stdout.write("Is balanced: "); console.log(myTree.isBalanced());
myTree.rebalance();
process.stdout.write("LevelOrder: "); myTree.levelOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("InOrder: "); myTree.inOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("PreOrder: "); myTree.preOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("PostOrder: "); myTree.postOrderForEach((c) => process.stdout.write(c + " "));
process.stdout.write("Is balanced: "); console.log(myTree.isBalanced());