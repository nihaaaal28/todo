import { useState,useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0)
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

     useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  }, [])

  useEffect(() => {
      if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]); 


  

  const saveToLS=(params) => {
      localStorage.setItem("todos",JSON.stringify(todos))
    
  }
    useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  }, [])
  

  const handleChange=(e)=>{
    settodo(e.target.value)
  }
  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
    console.log(todos)
    saveToLS()
  }

  const handleCheckbox =(e) => {
    let id=e.target.name;
    let index=todos.findIndex (item => {
      return item.id===id;
    })
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos)
    
      
  }
  const handleDelete = (e,id) => { 
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    
    settodos(newtodos)
    saveToLS()
    
  }

  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
     let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    
    settodos(newtodos)  
    saveToLS()

  }

  const togglefinished= (e) => {
    setshowfinished(!showfinished)
  }
  
  
  
  

  return (
    <>
    <Navbar/>
    
    <div className="md:container bg-red-200 rounded-xl mx-3 md:mx-auto my-10 p-5 min-h-[80vh] md:w-1/2">
      <div className="addtodo ">
        <h2 className='text-lg font-bold my-5'>Add a Todo</h2>
        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" className='bg-white w-full rounded-full p-3' />
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-red-300 disabled:bg-red-300 disabled:cursor-default rounded-xl p-3 mx-2  hover:bg-red-400 cursor-pointer text-sm font-bold'>Save</button>
      </div>
      
      </div>
      
      <input onClick={togglefinished} type="checkbox" checked={showfinished} className='my-8' /> <span className='mx-2'>Show finsihed</span>
      <div className="bg-black h-[1px] opacity-15 mx-auto w-[80%] my-1"></div>

      <div className= "font-bold text-lg my-6">Your Todos</div>
      <div className="todos ">
        {todos.length === 0 && <div className='p-5'>No Todos to display</div> }
        {todos.map(item=>{

           return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
            <div className='flex gap-5'>
              <input name={item.id}  onChange={handleCheckbox}  type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-red-300 rounded-md p-2 py-1 mx-1 hover:bg-red-400 cursor-pointer text-sm font-bold'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className= 'bg-red-300 rounded-md p-2 py-1 mx-1 hover:bg-red-400 cursor-pointer text-sm font-bold'><MdDelete /></button>
            </div>
        </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App
