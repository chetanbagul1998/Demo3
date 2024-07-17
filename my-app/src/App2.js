// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Demo4/Login4';
// import Dashboard from './Demo4/Dashboard';
// import ProjectForm from './Demo4/ProjectForm';
// import ProjectList from './Demo4/ProjectList';
// import Menu from './Demo4/Menu';
// import PrivateRoute from './Demo4/PrivateRoute';

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Demo4/Login4';
// import Dashboard from './Demo4/Dashboard';
// import ProjectForm from './Demo4/ProjectForm';
// import ProjectList from './Demo4/ProjectList';
// import Menu from './Demo4/Menu';
// import PrivateRoute from './Demo4/PrivateRoute';
// // import App2 from './App2';

// function App() {
//   return (
//     <div>
//         {/* <h1>hello</h1> */}
//     <Router>
//       <Menu />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//         <Route path="/projects" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
//         <Route path="/projects/new" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
//       </Routes>
//     </Router>
//     </div>
//   );
// }

// export default App;

// src/App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route, Switch, Redirect} from 'react-router-dom';
// import Login from './Demo4/Login4';
// import Dashboard from './Demo4/Dashboard';

// function App() {
//   return (
//     // <Router>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={Login} />
//         <Route path="/dashboard" element={Dashboard} />
//         <Route from="/" to="/login" />
//       </Routes>
//       </BrowserRouter>
//     // </Router>
//   );
// }

// export default App;








// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import ProjectListing from './pages/ProjectListing';
// import InsertProject from './pages/InsertProject';
// import Login3 from './pages/Login3';
// import './pages/Login3.css';
// import Navbar from './pages/Navbar';


// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//        <div>
//         {isAuthenticated && <Navbar handleLogout={handleLogout} />}
//         <Routes>
//           <Route path="/login" element={<Login3 setIsAuthenticated={setIsAuthenticated} />} />
//           <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//           <Route path="/projects" element={isAuthenticated ? <ProjectListing /> : <Navigate to="/login" />} />
//           <Route path="/add-project" element={isAuthenticated ? <InsertProject /> : <Navigate to="/login" />} />
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectListing from './pages/ProjectListing';
import InsertProject from './pages/InsertProject';
import Login3 from './pages/Login3';
import './pages/Login3.css';
import Navbar from './pages/Navbar';
import './App2.css';
// import './pages/Login3';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
        <div className="app-container">
        {isAuthenticated && <Navbar handleLogout={handleLogout} />}
        <div className="main-content">
          <header className="header">
            {/* <img src='./pages/assets/Header-bg.svg' alt="Header" className="header-image" />  */}
            {/* <img src={require('./pages/assets/Header-bg.svg').default} alt="Header" className="header-image" /> */}
            <img src={require('./pages/assets/Logo.svg').default} alt="Header" className='logo' />
          </header>

        <div className="content-container">
          <Routes>
            <Route path="/login" element={<Login3 setIsAuthenticated={setIsAuthenticated} />}/>           
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/projects" element={isAuthenticated ? <ProjectListing /> : <Navigate to="/login" />} />
            <Route path="/add-project" element={isAuthenticated ? <InsertProject /> : <Navigate to="/login" />} />
            {/* <Route path="/" element={<Navigate to="/login" />} />             */}
          </Routes>
        </div>
      </div>
      </div>
    </Router>
  );
};

export default App;
