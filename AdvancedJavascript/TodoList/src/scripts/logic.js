export class toDo{
    #title;
    #description;
    #dueDate;
    #priority;
    #notes;
    #isComplete;
    #id;

    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
        this.id = crypto.randomUUID();
    }

    addNotes(notes){
        this.notes = notes;
    }

    getTitle(){
        return this.title;
    }

    getDescription(){
        return this.description;
    }

    getdueDate(){
        return this.dueDate;
    }

    getPriority(){
        return this.priority;
    }

    getNotes(){
        return this.notes;
    }

    getCompleteStatus(){
        return this.isComplete;
    }
    
    getId(){
        return this.id;
    }
};

export class Project{
    #todos;
    #name;
    #id;

    constructor(name = "My Project"){
        this.todos = [];
        this.name = name;
        this.id = crypto.randomUUID();
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodos(){
        return this.todos;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }
}