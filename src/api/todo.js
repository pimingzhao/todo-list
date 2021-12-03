import { addData, putData, searchTodoList, delData } from '@/utils'

export const addTodo = async (todos) => {
  const todo = {
    start_time: Date.now(),
    done: false,
    namespace: 0,
    ...todos
  }
  await addData(todo, 'todo')
}

export const editTodo = todo => putData(todo, 'todo')

export const getTodoList = (param) => searchTodoList(param)

export const delTodo = (id) => delData(id, 'todo')
