import { Todo } from "./todo.class"


export class TodoList {

    constructor(  ){
        //this.todos = []
        this.loadingLS()
    }

    newTask( task ) {
        this.todos.push( task )
        this.saveAtLS()
    } 

    deleteTask( id ){
        this.todos = this.todos.filter( toDo => toDo.id != id )
        this.saveAtLS()
    }

    toggleTask( id ){

        for( const toDo of this.todos ){
            
            if ( id == toDo.id ){
                toDo.complete = !toDo.complete
                this.saveAtLS()
                break
            }
        }

    }

    deleteTasksCompleted(){
        this.todos = this.todos.filter( toDo => !toDo.complete )
        this.saveAtLS()
    }   

    saveAtLS(){
        localStorage.setItem( 'todo', JSON.stringify(this.todos)  )
    }

    loadingLS(){
        this.todos = ( localStorage.getItem('todo') )?
            JSON.parse( localStorage.getItem('todo') ):
            []

        this.todos = this.todos.map( obj => Todo.fromJson( obj ) )
    }
}