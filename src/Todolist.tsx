import React, { ChangeEvent, KeyboardEvent } from "react"
import { FilterValuesType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton } from "@mui/material";
import Button from '@mui/material/Button';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type PropsType = {
    id: string, 
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void,
    filter: FilterValuesType,
    changeToDoListTitle: (id: string, newTitle: string) => void,
    removeToDoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

  const onAllClickFilter = () => {
    props.changeFilter('all', props.id)
  }
  const onActiveClickFilter = () => {
    props.changeFilter('active', props.id)
  }
  const onCompletedClicckFilter = () => {
    props.changeFilter('completed', props.id) 
  }
  const removeToDoList = () => {
    props.removeToDoList(props.id)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const changeToDoListTitle = (newTitle: string) => {
    props.changeToDoListTitle(props.id, newTitle)
  }
    return(
    <div>
      <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/> <IconButton onClick={removeToDoList} aria-label="delete"><DeleteIcon /></IconButton></h3>
      <AddItemForm addItem={addTask} />
      <div>
        {
          props.tasks.map( task => {
            const onRemoveHandler = () => {
             props.removeTask(task.id, props.id)
            }
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
              console.log(task.id + e.currentTarget.checked)
            }
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, newValue, props.id) 
            }
            return(   
            <div key={task.id} className={task.isDone === false ? "is-done" : ''}><Checkbox onChange={onChangeStatusHandler} checked={task.isDone} />
              <EditableSpan title={task.title} 
                onChange={onChangeTitleHandler} />
              <IconButton aria-label="delete" onClick={ onRemoveHandler }><DeleteIcon /></IconButton>
            </div>
          )} )
        }
      </div>
              <div>
                <Button variant={props.filter === 'all' ? "contained" : 'text'} onClick={ onAllClickFilter }>All</Button>
                <Button color="primary" variant={props.filter === 'active' ? "contained" : 'text'} onClick={ onActiveClickFilter }>Active</Button>
                <Button color="secondary" variant={props.filter === 'completed' ? "contained" : 'text'} onClick={ onCompletedClicckFilter }>Completed</Button>
              </div>
    </div>
)}
