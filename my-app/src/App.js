import './App.css';
import React,  {useState}from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Router, Route, Navigate } from "react-router-dom";

// import './components/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Basic2 from './route/Basic';
// import Dashboard from './components/dash/Dashboard';
import Navbar from './components/dash/Navbar.js';
import Dashb from './components/dash/Dashboard';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Login from './components/login/Login';
import './components/login/Login.css';
import CreatePr from './components/dash/CreateProject';
import ProjectTable from './components/project_list/ProjectTable';
import Dash1 from './components/dash/Dash1';
import Add from './components/dash/AddProject.js';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  

  return (
    <div>    
     
      <BrowserRouter>
      {isAuthenticated && <Navbar handleLogout={handleLogout} />}   
      <Routes>           
           <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>                      
           <Route path="/dashboard" element={isAuthenticated ? <Dash1 /> : <Navigate to="/login" />} />
           <Route path="/projects" element={isAuthenticated ? <ProjectTable />: <Navigate to="/login" />} /> 
           <Route path="/add-project" element={isAuthenticated ? <Add />: <Navigate to="/login" />} />          
            <Route path="/" element={<Navigate to="/login" />} />                     
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;










// import React from 'react';
// import './App.css';
// // import React from 'react';
// import axios from 'axios';
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Router, Route, Navigate } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";
// // import './components/login/Login';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Basic2 from './route/Basic';
// import Dashb from './components/dash/Dashboard';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import Login from './components/login/Login';
// import './components/login/Login.css';
// import CreatePr from './components/dash/CreateProject';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import Login from './components/login/Login';
// // import Dashb from './components/dash/Dashboard';
// import PrivateRoute from './PrivateRoute'; // Example private route implementation

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <PrivateRoute path="/Dashboard" element={<Dashb />} />
//         {/* Other routes */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;










//  {/* {<Navbar handleLogout={handleLogout} />} */}
//       {/* <img src={require('./pages/assets/Logo.svg').default} alt="Header" className='logo' /> */}

//       {/* <Route path="/" element={<Login />}/>
//            <Route path="Dashboard" element={<Dashb />} />
//            <Route path="ProjectTable" element={<ProjectTable />} /> 
//            <Route path="Dash1" element={<Dash1 />} />
//            <Route path="/CreateProject" element={<CreatePr />} /> */}
           
           
//            {/* <Route path="/" element={<Login />}/> */}

//            {/* <Route path="/login" element={<Login/>}/>            */}

//            {/* <Route path="Dashboard" element={<Dashb />} /> */}