import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  
  // GET SINGLE TASK
  const getTask = async () => {
    let task = await fetch(`http://localhost:3000/task/${id}`);
    task = await task.json();
    
    if (task.result) {
      setTaskData(task.result);
    }
  };
  
  useEffect(() => {
    getTask();
  }, []);
  // UPDATE TASK
  const updateTask = async () => {
    let result = await fetch(`http://localhost:3000/task/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result) {
      alert("Task Updated Successfully");
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen w-full">
      <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-3xl capitalize font-sans font-bold leading-tight text-black pt-6">
          Update Task
        </h1>

        <div className="p-6 flex flex-col w-full">
          <label className="text-xl font-semibold mb-2">Title</label>

          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                title: e.target.value,
              })
            }
            placeholder="Enter title"
            className="bg-transparent border border-black rounded-md px-2 py-2 mb-1 outline-none focus:outline-blue-400 w-full"
          />

          <label className="text-xl font-semibold my-2">Description</label>

          <textarea
            rows={6}
            value={taskData.description}
            name="description"
            onChange={(e) =>
              setTaskData({
                ...taskData,
                description: e.target.value,
              })
            }
            placeholder="Enter description"
            className="p-1 bg-transparent border px-2 border-black rounded-md outline-none focus:outline-blue-400 resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-semibold transition-all text-lg rounded text-white p-2 my-4"
            onClick={updateTask}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
