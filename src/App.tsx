import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type FilterValuesType = 'all' | 'completed' | 'active'
type ToDoLists = {
  id: string,
  title: string,
  filter: FilterValuesType
}

export function Counter() {
  let array = useState(5)
  let data = array[0] // читаем 5 из масива тоесть перввий елемент 
  let setData = array[1]
  return <div onClick={() => setData(data+1)}>{data}</div>
}
type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let array = useState() // достает из useState масив в котором 
  let tasks2 = array[0] // осталось 4 таски, потому что беру первый елемент 0
  let setTasks2 = array[1] // меняет state которий вишел из useState

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObject[todoListId]
    let task = tasks.find((t) => {
      if (t.id === taskId) {
       return true
      } 
      else {
        return false
      }
    })
    if (task) {
      task.isDone = isDone;
    }
    let copy = {...tasksObject}
    setTasks(copy)
  }
  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasks = tasksObject[todoListId]
    let task = tasks.find((t) => {
      if (t.id === taskId) {
       return true
      } 
      else {
        return false
      }
    })
    if (task) {
      task.title = newTitle;
    }
    let copy = {...tasksObject}
    setTasks(copy)
  }
  function changeToDoListTitle(id: string, newTitle: string) {
    const todolist = toDoLists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title  = newTitle
      setToDoLists([...toDoLists])
    }
  }
  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObject[todoListId] // достаем из обьекта tasksObject массив todoListId, который к нам прийдет 
    let filteredTasks = tasks.filter( task => task.id !== id)
    tasksObject[todoListId] = filteredTasks 
    setTasks({...tasksObject})
  }
  function addTask(title: string, todoListId: string) {
    let newTask = {id: v1(), title: title, isDone: false}
    let tasks = tasksObject[todoListId]
    let newTasks = [newTask, ...tasks]
    tasksObject[todoListId] = newTasks
    setTasks({...tasksObject})
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = toDoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setToDoLists([...toDoLists])
    }
  }

  let toDoList1 = v1()
  let toDoList2 = v1()
  let [toDoLists, setToDoLists] = useState<Array<ToDoLists>>([
    {id: toDoList1, title: 'What to learn' , filter: "all"},
    {id: toDoList2, title: 'What to buy' , filter: "all"}
  ]) 
  let [tasksObject, setTasks] = useState<TasksStateType>({
    [toDoList1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: true },
      { id: v1(), title: 'Hooks', isDone: true },
      { id: v1(), title: 'JS', isDone: false }],
    [toDoList2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: true }]
  })
  let removeToDoList = (todoListId: string) => {
    let filteredTasks = toDoLists.filter( tl => tl.id !== todoListId)
    setToDoLists(filteredTasks) 
    delete tasksObject[todoListId]
    setTasks({...tasksObject})
  }
  function addToDoList(title: string) {
    let toDoList: ToDoLists = {
      id: v1(),
      filter: "all",
      title: title
    }
    setToDoLists([toDoList, ...toDoLists])
    setTasks({
      ...tasksObject,
      [toDoList.id]: [] // id це свойство tasksObject, в якому пустий масив 
    })
  }
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addToDoList} />
          <Grid container spacing={5} style={{padding: '20px 0'}}>
            {
              toDoLists.map((tl) => {
                let TaskForToDoList = tasksObject[tl.id]
                if (tl.filter === 'all') {
                  TaskForToDoList = tasksObject[tl.id]
                }
                if (tl.filter === 'completed') {
                  TaskForToDoList = TaskForToDoList.filter(t => t.isDone === true)
                }
                if (tl.filter === 'active') {
                  TaskForToDoList = TaskForToDoList.filter(t => t.isDone === false)
                }
                return (
                  <Grid item>
                    <Paper style={{ padding: ' 10px 20px' }}>
                      <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={TaskForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeToDoList={removeToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeToDoListTitle={changeToDoListTitle}
                      />
                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}


export default App;
