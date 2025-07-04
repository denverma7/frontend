
// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Signup from './Signup';
// // import { response } from "express";

// export default function App(){
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [tasks, setTasks] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterPriority, setFilterPriority] = useState("all");

//   //Fetching the task
//   const fetchTask = async(token) => {
//     try{
//     const response = await fetch("https://to-do-backend-8b0f2x0hl-denverma7-gmailcoms-projects.vercel.app/tasks",
//     {
//       headers: {Authorization: `Bearer ${token}`},
//     });
//     if(!response.ok){
//       throw new Error( `Failed to fetch tasks: ${response.status} ${response.statusText}`);
//     }  
//     const data = await response.json();
//     console.log("Fetched tasks:", data);
//     setTasks(Array.isArray(data)?data:data.tasks || []);
//   } catch(error){
//     console.error("Error fetching tasks:", error.message);
//     setTasks([]) // Optionally clear tasks on error
//   }
// };
//   useEffect(() => {
//     if(token) fetchTask(token);
//   }, [token]);

//   //logout
//   const logout=()=>{
//     setToken("");
//     localStorage.removeItem('token'),
//     setTasks([])
//   };

//   // Adding new task for the user
//   const addTasks=async(text)=>{
//     try {
//       const response=await fetch("https://to-do-backend-8b0f2x0hl-denverma7-gmailcoms-projects.vercel.app/tasks",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           },
//           body: JSON.stringify({ text, status: "pending", priority: "medium"}),
//         }
//       );
//       if(!response.ok){
//         throw new Error( `Failed to add task: ${response.statusText}` );
//       }
//       const newTask = await response.json();
//       setTasks([...tasks, newTask]);
//     } catch(error){
//       console.error("Error adding task:", error.message)
//     }
//   };

//   //Delete task
//   const deleteTask = async (id) => {
//     if(! window.confirm("Are you sure you want to delete this task?"))
//       return;

//     try{
//       await fetch(`http://localhost:8080/tasks/${id}`, 
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTasks(tasks.filter((task) => task._id != id));
//     }catch(error){
//       console.error("Error deleting task:", error.message);
//     }
//   };

//   //Updation of status
//   const updateTaskStatus = async(id, currentStatus) => {
//     const newStatus = currentStatus === "pending" ? "completed" : "pending";
//     try{
//       const response = await fetch(`http://localhost:8080/tasks/${id}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );
//       if(!response.ok){
//         throw new Error(`Failed to update status: ${response.statusText}`);
//       }
//       const updatedTask = await response.json();
//       setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
//     }catch(error){
//       console.error("Error updating task status:", error.message);
//     }
//   };

//   //Updation of Priority
//   const updateTaskPriority = async (id, newPriority) => {
//     try{
//       const response = await fetch(`http://localhost:8080/tasks/${id}/priority`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type" : "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ priority: newPriority}),
//         }
//       );
//       if(!response.ok){
//         throw new Error(`Failed to update priority: ${response.statusText}`)
//       }
//       const updatedTask = await response.json();
//       setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
//     }catch(error){
//       console.error("Error updating task priority:", error.message);
//     }
//   };

//   //Filtering task
//   const filterTasks = tasks.filter(
//     (task) =>
//     (filterStatus === "all" || task.status === filterStatus) &&
//     (filterPriority === "all" || task.priority === filterPriority)
//   );
//   console.log("Fileted Tasks:", filterTasks);

//   const MainApp = () => (
//     <div className="min-h-screen bg-orange-50 flex flex-col">
//       <nav className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
//         <ul className="flex space-x-4">
//           <li>
//             <a 
//               href="#"
//               className="px-4 py-2 rounded-full font-semibold transition-colors duration-200 hover:bg-orange-600 hover:text-white focus:bg-orange-700 focus:outline-none bg-orange-100 text-orange-700 shadow-sm"
//             >
//               Home
//             </a>
//           </li>
//         </ul>
//         <button 
//           onClick={logout}
//             className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow transition-colors duration-200"
//           >
//             Logout
//           </button>
//       </nav>
//       <main className="flex-1 p-8">
//         <h1 
//           className="text-4xl font-extrabold text-center mb-8 text-orange-600 drop-shadow"
//         >
//           MERN To-Do App
//         </h1>
//         <form 
//           onSubmit={(e) => {
//             e.preventDefault();
//             addTasks(e.target[0].value);
//             e.target[0].value = "";
//           }}
//           className="mb-6 flex gap-2 justify-center"
//         >
//           <input 
//             type="text"
//             className="p-3 border-2 border-orange-300 rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-orange-400"
//             placeholder="Add a task"
//           />
//           <button
//             type="submit"
//             className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors duration-200"
//           >
//             Add
//           </button>
//         </form>
//         <div className="mb-6 flex gap-4 justify-center">
//           <select 
//             onChange={(e) => setFilterStatus(e.target.value)                                                                    }
//             className="p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//             value={filterStatus}
//           >
//             <option value="all">All status</option>
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//           </select>
//           <select 
//             onChange={(e) => setFilterPriority(e.target.value)}
//             className="p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//             value={filterPriority}
//           >
//             <option value="all">All priority</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>
//         {/* Task after Filtering */}
//         <ul className="space-y-4">
//           {filterTasks.map((task) => (
//             <li 
//               key={task._id} 
//               className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-center gap-4 hover:bg-orange-100 hover:shadow-lg transition duration-300"
//             >
//               <div className="flex-1">
//                 <span className="text-lg text-orange-800">{task.text}</span>
//                 <span className="ml-2 text-sm text-gray-500">
//                   ({task.status}, {task.priority})
//                 </span>
//               </div>
//               <div className="flex gap-2 items-center">
//                 <button onClick={() => updateTaskStatus(task._id, task.status)}
//                   className={`px-3 py-1 rounded-full font-semibold transition-colors duration-200 ${
//                     task.status==="pending"
//                       ?"bg-yellow-400 text-yellow-900 hover:text-yellow-500"
//                       :"bg-green-400 text-green-900 hover:text-green-500" 
//                   }`}
//                 >
//                   {task.status === "pending" ? "Mark Complete" : "Mark Pending"}
//                 </button>
//                 <select
//                   value={task.priority} 
//                   onChange={(e) => updateTaskPriority(task._id, e.target.value)}
//                   className="p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"                  
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//                 <button
//                   onClick={() => deleteTask(task._id)}
//                   className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200 ml-2"
//                   title="Delete Task"
//                 >
//                   <i className="fas fa-trash" /> Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//       <footer 
//         className="bg-orange-500 text-white px-4 mt-auto text-center shadow-inner"
//       >
//         © 2025 Your To-Do App
//       </footer>
//     </div>
//   )

//   return(
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Login  />} /> */}
//         <Route path="/login" element={<Login setToken={setToken} />} />
//         <Route path="/signup" element={<Signup />}/>
//         <Route 
//           path="/" 
//           element={ token ? <MainApp /> : <Navigate to='/login' replace />} 
//         />
//       </Routes>
//     </Router>
//   )
// }

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // Fetching the tasks
  const fetchTask = async (token) => {
    try {
      const response = await fetch("https://to-do-backend-8b0f2x0hl-denverma7-gmailcoms-projects.vercel.app/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched tasks:", data);
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setTasks([]);
    }
  };

  useEffect(() => {
    if (token) fetchTask(token);
  }, [token]);

  // Logout
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setTasks([]);
  };

  // Adding new task for the user
  const addTasks = async (text) => {
    try {
      const response = await fetch("https://to-do-backend-8b0f2x0hl-denverma7-gmailcoms-projects.vercel.app/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, status: "pending", priority: "medium" }),
      });
      if (!response.ok) {
        throw new Error(`Failed to add task: ${response.statusText}`);
      }
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`https://to-do-backend-8b0f2x0hl-denverma7-gmailcoms-projects.vercel.app/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  // Update task status
  const updateTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      const response = await fetch(`https://to-do-backend-8b0f2x0hl-denverma7-gmailcoms-projects.vercel.app/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };

  // Update task priority
  const updateTaskPriority = async (id, newPriority) => {
    try {
      const response = await fetch(`https://to-do-backend-8b0f2x0hl-denverma7-gmailcoms-projects.vercel.app/tasks/${id}/priority`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priority: newPriority }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update priority: ${response.statusText}`);
      }
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task priority:", error.message);
    }
  };

  // Filter tasks
  const filterTasks = tasks.filter(
    (task) =>
      (filterStatus === "all" || task.status === filterStatus) &&
      (filterPriority === "all" || task.priority === filterPriority)
  );
  console.log("Filtered Tasks:", filterTasks);

  const MainApp = () => (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <nav className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <ul className="flex space-x-4">
          <li>
            <a
              href="#"
              className="px-4 py-2 rounded-full font-semibold transition-colors duration-200 hover:bg-orange-600 hover:text-white focus:bg-orange-700 focus:outline-none bg-orange-100 text-orange-700 shadow-sm"
            >
              Home
            </a>
          </li>
        </ul>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow transition-colors duration-200"
        >
          Logout
        </button>
      </nav>
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-600 drop-shadow">
          MERN To-Do App
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTasks(e.target[0].value);
            e.target[0].value = "";
          }}
          className="mb-6 flex gap-2 justify-center"
        >
          <input
            type="text"
            className="p-3 border-2 border-orange-300 rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Add a task"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors duration-200"
          >
            Add
          </button>
        </form>
        <div className="mb-6 flex gap-4 justify-center">
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filterStatus}
          >
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            onChange={(e) => setFilterPriority(e.target.value)}
            className="p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filterPriority}
          >
            <option value="all">All priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <ul className="space-y-4">
          {filterTasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-center gap-4 hover:bg-orange-100 hover:shadow-lg transition duration-300"
            >
              <div className="flex-1">
                <span className="text-lg text-orange-800">{task.text}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({task.status}, {task.priority})
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => updateTaskStatus(task._id, task.status)}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors duration-200 ${
                    task.status === "pending"
                      ? "bg-yellow-400 text-yellow-900 hover:text-yellow-500"
                      : "bg-green-400 text-green-900 hover:text-green-500"
                  }`}
                >
                  {task.status === "pending" ? "Mark Complete" : "Mark Pending"}
                </button>
                <select
                  value={task.priority}
                  onChange={(e) => updateTaskPriority(task._id, e.target.value)}
                  className="p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200 ml-2"
                  title="Delete Task"
                >
                  <i className="fas fa-trash" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bg-orange-500 text-white px-4 mt-auto text-center shadow-inner">
        © 2025 Your To-Do App
      </footer>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={token ? <MainApp /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}