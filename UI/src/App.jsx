
import Navbar from './components/Navbar'
import AddTask from './components/AddTask'
import { Routes, Route } from 'react-router-dom'
import List from './components/List'
import UpdateTask from './components/UpdateTask'
import SignUp from './components/SignUp'
import Login from './components/Login'

const App = () => {
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path="/" element={<List/>} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/update/:id" element={<UpdateTask/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App