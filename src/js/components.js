import { Todo } from "../classes"
import { taskList } from '../index'

// Html Reference

const divTodoList  = document.querySelector('.todo-list'),
    newToDo        = document.querySelector('.new-todo'),
    clearCompleted = document.querySelector('.clear-completed'),
    ulFilters      = document.querySelector( '.filters' ),
    filterAnchor   = document.querySelectorAll( '.filtro' )

export const createTodoHtml = ( task ) => {
    const htmlTask = `
    <li class="${ ( task.complete)? 'completed' : ' ' }" data-id="${ task.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ ( task.complete)? 'checked' : '' }>
			<label> ${ task.task } </label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `
    const div = document.createElement('div')
    div.innerHTML = htmlTask

    divTodoList.append( div.firstElementChild )
    return div.firstElementChild
}


// Events

newToDo.addEventListener( 'keyup',  e => {

    if ( e.keyCode === 13 && newToDo.value.length > 0){
        /* console.log( newToDo.value ) */
        const newTask = new Todo ( newToDo.value )

        taskList.newTask( newTask )
        createTodoHtml( newTask )
        newToDo.value = ''
    }
})

divTodoList.addEventListener( 'click', e => {

    const elementClicked = e.target.localName,
        toDoElement = e.target.parentElement.parentElement,
        toDoId = toDoElement.getAttribute( 'data-id' )

    if ( elementClicked.includes( 'input' ) ){

        taskList.toggleTask( toDoId )
        toDoElement.classList.toggle( 'completed' )

    } else if ( elementClicked.includes( 'button' ) ){

        taskList.deleteTask( toDoId )
        divTodoList.removeChild( toDoElement )
    }
})

clearCompleted.addEventListener( 'click', () => {
    
    taskList.deleteTasksCompleted()
    const completed = document.querySelectorAll( '.completed' )
    for( const complete of completed ){
        complete.remove()
    }

})

ulFilters.addEventListener( 'click', event => {

    const filtro = event.target.innerText
    if( !filtro ) { return }

    filterAnchor.forEach( element => element.classList.remove( 'selected' ) )
    event.target.classList.add( 'selected' )

    for( const task of divTodoList.children ){

        task.classList.remove( 'hidden' )
        const complete = task.classList.contains( 'completed' )
        switch( filtro ) {
            case 'Pendientes': 
                if( complete ) task.classList.add( 'hidden' )
                break
            case 'Completados': 
                if( !complete ) task.classList.add( 'hidden' )
                break
        }
    }
})