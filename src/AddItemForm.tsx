import { Button, IconButton } from "@mui/material";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import TextField from '@mui/material/TextField';
import { AddBox } from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}
  
export function AddItemForm (props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
  
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null)
      if (e.charCode === 13){
        addTask()
      }
    }
    const addTask = () => {
      if (newTaskTitle.trim() !== "") {
        props.addItem(newTaskTitle.trim()) // props.id - id Todolista
        setNewTaskTitle("") 
      } else {
        setError("Title is required")
      }
    }
    return (
      <div>
        <TextField value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          error={!!error}
          helperText={error}
          id="outlined-basic" 
          label="Type Text" 
          variant="outlined" />
        <IconButton  onClick={addTask} color="primary">
          <AddBox />
        </IconButton>
      </div>
  )}