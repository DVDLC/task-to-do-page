

export class Todo {

    static fromJson ({ id, task, complete, created }){

        const tempTodo = new Todo( task )

        tempTodo.id = id,
        tempTodo.complete = complete,
        tempTodo.created = created

        return tempTodo
    }

    constructor( task ) {

        this.task = task

        this.id = new Date().getTime(); //11323545
        this.complete = false
        this.created = new Date()
    }

}