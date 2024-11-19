import React from 'react'

const Form = ({name, setName, editMode, setEditMode, setTaskList}) => {

    const formSubmissionHandler = (e) => { 
        e.preventDefault();

        if(editMode.status){
            setTaskList(prev=>{
                return prev.map(task=>{
                    if(task.id === editMode.id){
                        return {
                            ...task,
                            name,
                        }
                    }else{
                        return task
                    }
                })
            })
        }else{
            setTaskList(prev=>{
                return [...prev, {
                    id:Date.now(),
                    name:name,
                    completed:false,
                }]
            })
        }

        setEditMode({status:false, id:""})
        setName("");
    }

    return (
        <form onSubmit={formSubmissionHandler} className="flex gap-4">
            <input
                className="border border-black"
                type="text"
                value={name}
                onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                }}
            />
            <button className="border border-black" type="button" onClick={() => { setName("") }}>Clear</button>
            <button disabled={name.length === 0} className="border border-black">{editMode.status ? 'Edit' : 'Add'}</button>
        </form>
    )
}

export default Form