import { addData, putData, getDataList } from '@/utils'

export const addTodo = async (todos) => {
  const todo = {
    start_time: Date.now(),
    done: false,
    ...todos
  }
  await addData(todo, 'todo')
}

export const editTodo = todo => putData(todo, 'todo')

export const getTodoList = async ({ start_time }) => {
  const todos = await getDataList('todo')
  return todos.filter(item => item.start_time >= start_time)
}
