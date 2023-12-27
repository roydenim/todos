let todoInput // miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo // info o braku zadań / konieczność wpisania tekstu
let addBtn // przycisk ADD / dodaje nowe elementy do listy
let ulList // lista zadań, tagi UL
let newTodo // nowo dodany LI, nowe zadanie

let popup // popup
let popupInfo // tekst w popupie, jak sie doda pusty teskt
let todoToEdit // edytowanie Todo
let popupInput // input w popupie
let popupAddBtn // przycisk "zatwierdź" w popupie
let popupCloseBtn // przycisk "anuluj" w popupie

const main = () => {
	prapareDOMElements()
	prepareDOMEvents()
}


const prapareDOMElements = () => {
	//pobieramy wszystkie elementy
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}


const prepareDOMEvents = () => {
	//nadajemy nasłuchiwanie
	addBtn.addEventListener('click', addNewTask)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closeEdit)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
}


/*
1. tworzy nowy element (li)
2. dodawać nowy elemant do ul listy
3. funkcja odpalania na click w przycisk ADD
4. przechwytuje treść z inputa i umieszcza go w nowo utworzonym LI
5. funkcja nie doda do listy pustego "todosa"
*/


const addNewTask = () => {
	if(todoInput.value !== ''){
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		createToolsArea()

		ulList.append(newTodo)

		todoInput.value = ''
		errorInfo.textContent = ''
	} else{
		errorInfo.textContent = 'Wpisz tekst zadania!'
	}
}

const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTodo.append(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if(e.target.matches('.complete')){
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	}	else if(e.target.matches('.edit')){
		editTodo(e)
	}	else if(e.target.matches('.delete')){
		deleteTodo(e)
	}
}

const editTodo = (e) => {
	todoToEdit = e.target.closest('li')

	popupInput.value = todoToEdit.firstChild.textContent
	popup.style.display = 'flex'
}

const closeEdit = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if(popupInput.value !== ''){
		todoToEdit.firstChild.textContent = popupInput.value
		popupInfo.textContent = ''
		closeEdit()
	} else{
		popupInfo.textContent = 'Musisz podać jakąś treść !'
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove()
	closeEdit()

	const allTodos = ulList.querySelectorAll('li')

	if(allTodos.length === 0){
		errorInfo.textContent = 'Brak zadań na liście.'
	}
}


const enterKeyCheck = e => {
	if(e.key === 'Enter'){
		addNewTask()
	}
}

document.addEventListener('DOMContentLoaded', main)