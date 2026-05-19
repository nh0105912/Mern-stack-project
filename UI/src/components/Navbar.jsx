
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="px-20 py-4 flex items-center justify-between gap-x-6 bg-gray-800">
      <h1 className="text-white text-2xl font-bold">TODO APP</h1>
      <ul className="flex justify-between items-center gap-x-8">
        <li className="text-white text-xl font-bold">
          <Link to="/">List</Link>
        </li>
        <li className="text-white text-xl font-bold ">
          <Link to="/add-task">Add Task</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar