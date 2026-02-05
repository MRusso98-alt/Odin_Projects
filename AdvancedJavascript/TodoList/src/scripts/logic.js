export class toDo{
    #title;
    #description;
    #dueDate;
    #priority;
    #notes;
    #isComplete;

    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
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
};

export class Project{
    #todos;
    #name;

    constructor(name = "My Project"){
        this.todos = [];
        this.name = name;
    }

    addtodo(todo) {
        this.todos.push(todo);
    }

    getTodos(){
        return this.todos;
    }

    getName(){
        return this.name;
    }
}