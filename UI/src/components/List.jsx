import { Fragment } from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"


const List = () => {
  const [taskData, setTaskData] = useState();
  const[selected,setSelected]=useState([])


  const getListData = async () => {
    let apiUrl = await fetch("http://localhost:3000/tasks",{
      credentials:'include'
    });
    let data = await apiUrl.json();
    console.log(data)
    if(data.success){
      setTaskData(data.result)
    }
  };
  const delTask = async (id) => {
    let url = await fetch(`http://localhost:3000/delete/`+id,{
      credentials:'include',
      method:'delete'
    });
    let data = await url.json();

    if(data.success){
      getListData();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getListData();
    };

    fetchData();
  }, []);
  const selectAll=(e)=>{
    
    if(e.target.checked){
      let items=taskData.map((item)=>item._id)
      setSelected(items)
    }else{
      setSelected([])
    }

  }
console.log(selected)
  const selectSingle=(id)=>{
    if(selected.includes(id)){
      let item=selected.filter((item)=>item!=id)
      setSelected([item])
    }else{
      setSelected([id,...selected])
    }

  }

  const deleteAll= async()=>{
    console.log(selected)
     let url = await fetch(`http://localhost:3000/delete-all/`, {
       credentials: "include",
       method: "delete",
       body: JSON.stringify(selected),
       headers: {
         "Content-type": "Application/json",
       },
     });
    url=await url.json()
    if(url.success){
      getListData();
    }
    
  }
  return (
    <div className=" mx-2 lg:mx-10">
      <h1 className="font-bold my-4 text-3xl text-center text-gray-800">
        Todo List Tasks
      </h1>

      <button className="bg-red-600 hover:bg-red-700 px-4 py-1 lg:ms-20 rounded-sm text-white">
        Delete
      </button>

      <div className="overflow-x-auto lg:ms-10 w-full my-10">
        <ul className="min-w-[900px] grid grid-cols-[80px_80px_1fr_2fr_190px] gap-2 w-full px-4 lg:px-10">
          <li className="font-bold border p-2 bg-gradient-to-r from-blue-900 to-teal-600">
            <input onChange={selectAll} type="checkbox" />
          </li>

          <li className="font-bold border p-2 bg-gradient-to-r from-blue-900 to-teal-600">S.NO</li>
          <li className="font-bold border p-2 bg-gradient-to-r from-blue-900 to-teal-600">Title</li>
          <li className="font-bold border p-2 bg-gradient-to-r from-blue-900 to-teal-600">Description</li>
          <li className="font-bold border p-2 bg-gradient-to-r from-blue-900 to-teal-600">Action</li>

          {taskData &&
            taskData.map((item, index) => {
              return (
                <Fragment key={item._id}>
                  <li className="font-bold border p-2">
                    <input
                      type="checkbox"
                      onChange={() => selectSingle(item._id)}
                      checked={selected.includes(item._id)}
                    />
                  </li>

                  <li className="border p-2">{index + 1}</li>
                  <li className="border p-2">{item.title}</li>
                  <li className="border p-2">{item.description}</li>

                  <li className="border p-2 flex gap-2">
                    <button
                      className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-white"
                      onClick={() => delTask(item._id)}
                    >
                      Delete
                    </button>

                    <Link
                      to={"update/" + item._id}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md text-white ml-2"
                    >
                      Update
                    </Link>
                  </li>
                </Fragment>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default List;
