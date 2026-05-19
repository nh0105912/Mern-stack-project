import {useState,useEffect } from "react";
import { useParams } from "react-router-dom";


const UpdateTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const {id}=useParams() 
  useEffect(()=>{
    getTask(id)
  },[])
  const getTask=async(id)=>{
    let task = await fetch(`http://localhost:3000/task/`+id);
    task=await task.json()
    if(task.result){
      setTaskData(task.result)
    }
  }
  
 
  return (
    <div className="flex flex-col justify-center items-center gap-4  h-screen  w-full">
      <div className="w-1/2 bg-white shadow-2xl rounded-lg flex flex-col justify-center items-center ">
        <h1 className="text-3xl capitalize font-sans font-bold leading-tight text-black pt-6 ">
          update New Task{" "}
        </h1>
        <div className="p-6 flex flex-col  w-full ">
          <label htmlFor="" className="text-xl font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            id=""
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            placeholder="Enter title "
            className="bg-transparent border border-black rounded-md px-2 py-2 mb-1 outline-none focus:outline-blue-400 focus:border-none w-full"
          />
          <label htmlFor="" className="text-xl font-semibold my-2">
            Description
          </label>
          <textarea
        
            rows={6}
            value={taskData.description}
            name="description"
            id=""
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
            placeholder="Enter description"
            className="p-1 bg-transparent border px-2 border-black rounded-md  outline-none focus:outline-blue-400 focus:border-none resize-none "
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-semibold transition-all text-lg rounded text-white p-2 my-4"
            onClick={getTask}
          >
            UpdateTask
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
