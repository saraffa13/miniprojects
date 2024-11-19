import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Form from "./Form";

const ListPage = () => {

    const [name, setName] = useState("");
    const [editMode, setEditMode] = useState({status:false, id:""});
    const [taskList, setTaskList] = useState([]);
   

    const deleteHandler = ( id ) => { 
        setTaskList(prev=>{
            return prev.filter(task=>task.id!==id)
        })
    }
    const editHandler = ( id, name ) => { 
        setEditMode({status:true, id});
        setName(name)
    }
    const statusChangeHandler = ( id ) => { 
        setTaskList(prev=>{
            return prev.map(task=>{
                if(task.id === id){
                    return {
                        ...task,
                        completed:!task.completed
                    }
                }else{
                    return task
                }
            })
        })
    }
    
    return <div className="flex flex-col gap-4">
        <Form name={name} setName={setName} setEditMode={setEditMode} editMode={editMode} setTaskList={setTaskList}/>
        {taskList && <ul className="">
            {taskList.map((task)=>{
                return <li key={task.id} className="flex gap-8 border border-black w-fit">
                    <input type="checkbox" checked={task.completed} onClick={()=>statusChangeHandler(task.id)}></input>
                    <div className={`${task.completed?'line-through':''}`}>{task.name}</div>
                    <div>{task.completed ? "Done": "Pending"}</div>
                    <button onClick={()=>{editHandler(task.id, task.name)}}>Edit</button>
                    <button onClick={()=>{deleteHandler(task.id)}}>
                        <MdDelete />
                    </button>
                </li>
            })}
        </ul>}
    </div>
}   

export default ListPage;        