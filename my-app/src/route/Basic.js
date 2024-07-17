import ReactDOM from "react-dom/client";
import {Routes,Route,Link} from "react-router-dom";
import Home from './Home';
import Aboutus from './Aboutus';
import Contactus from './Contactus';

import Addon from './Addon';
import Login from "../components/login/Login";

export default function Basic2()
{
	return(
		<>
		<nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav 	">
          <li className="nav-item">
            <Link to={"/Home"} className='nav-link'>
             Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Aboutus"} className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Contactus"} className="nav-link">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Addon"} className="nav-link">
             Add On
            </Link>
          </li>

           {/* <li className="nav-item">
            <Link to={"/Login"} className="nav-link">
            Login
            </Link>
          </li>

           <li className="nav-item">
            <Link to={"/Register"} className="nav-link">
            Register
            </Link>
          </li>

           <li className="nav-item">
            <Link to={"/Login1"} className="nav-link">
             Login1
            </Link>
          </li> */}
          </div>
      </nav>

      <Routes> 
			<Route path="Home" element={<Home />} />
 			<Route path="Aboutus" element={<Aboutus />} /> 
			<Route path="Contactus" element={<Contactus />} /> 
      <Route path="Addon" element={<Addon />} /> 
      {/* <Route path="Login" element={<Login />} /> 
      <Route path="Register" element={<Register />} /> 
      <Route path="Login1" element={<Login1 />} />  */}
         </Routes>
		</>
	);
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Basic2 />);