import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleAddtask = async () => {

    try {
      let res = await fetch("http://localhost:3000/add-task", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await res.json();

      if (data.success || data.result) {
        navigate("/");
      } else {
        alert("Task not added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen w-full">
      <div className=" w-full lg:w-1/2 bg-white shadow-2xl rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-3xl capitalize font-sans font-bold leading-tight text-black pt-6">
          Add New Task
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
            name="description"
            value={taskData.description}
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
            onClick={handleAddtask}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
