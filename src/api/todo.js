import { addData, putData, searchTodoList } from '@/utils'

export const addTodo = async (todos) => {
  const todo = {
    start_time: Date.now(),
    done: false,
    ...todos
  }
  await addData(todo, 'todo')
}

export const editTodo = todo => putData(todo, 'todo')

export const getTodoList = async (param) => searchTodoList(param)
