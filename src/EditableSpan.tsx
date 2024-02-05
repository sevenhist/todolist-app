import { useState } from "react"
import React, { ChangeEvent, KeyboardEvent } from "react"
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void 
}
export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false) 
    let [title, setTitle] = useState("")
    const changeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    return(
    editMode
    ? <TextField  value={title} onChange={changeHandlerTitle} onBlur={activateViewMode} autoFocus={true}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
)}