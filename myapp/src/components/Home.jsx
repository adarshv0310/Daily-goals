import React,{useState} from "react";
import "./Home.css";
import Task from "./Task";




const Home=()=>{

    const[tasks ,seTasks]=useState([]);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");

         
    const submitHandler= (e)=> {
       e.preventDefault();
    };



  
    return (
      <div className="container">
           <h1>DAILY GOALS</h1>
             <form  onSubmit={submitHandler}>
               <input type="text" 
               placeholder="Title"
                value={title}
               onChange={(e)=>setTitle(e.target.value)}/>

                 <textarea placeholder="Description"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                 >

                 </textarea>

                  <button type="submit">Add</button>
             </form>
           {
                tasks.map(()=>(
                 <Task/>
                ))
            }

      </div>
   );
};

export default Home;