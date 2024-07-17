import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setIsAuthenticated }) {
// export default function Login() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    // setIsAuthenticated(true);
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/login', { email, password });
      // Save the token in local storage or state
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      setIsAuthenticated(true);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className='login-bg'>
      <div className="Auth-form-container">
        <div className='head-line'>
          <h5>Online Project Management</h5>
        </div>
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h6 className="Auth-form-title">Login to get started</h6>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              {/* <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              
              <input
                type={showPassword ? "text" : "password"}
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaRegEyeSlash className='icon' onClick={togglePasswordVisibility} />
              {/* <FaRegEyeSlash className='icon' /> */}
            </div>
            <p className="forgot-password text-end mt-2">
              <a href="#">Forgot password?</a>
            </p>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            {error && <div style={{color:'red', textAlign: 'center'}}>{error}</div>}

          </div>
        </form>
      </div>
      {/* {error && <div style={{color:'red', textAlign: 'center'}}>{error}</div>} */}
    </div>
  );
}






// import React, { useState } from 'react';
// import './Login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaRegEyeSlash } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();
 
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(data);
//     // Add your login logic here
//     navigate('/Dashboard');
//   };
  

//   return (
//     <div className='login-bg'>
//     <div className="Auth-form-container">
//       <div className='head-line'>
//         <h5>Online Project Management</h5>
//       </div>
//       <form className="Auth-form" onSubmit={handleSubmit}>
//         <div className="Auth-form-content">
//           <h6 className="Auth-form-title">Login to get started</h6>
//           <div className="form-group mt-3">
//             <label>Email</label>
//             <input
//               type="email"
//               className="form-control mt-1"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control mt-1"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaRegEyeSlash className='icon' />
//           </div>
//           <p className="forgot-password text-end mt-2">
//             <a href="#">Forgot password?</a>
//           </p>
//           <div className="d-grid gap-2 col-6 mx-auto">
//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';
// import './Logo.svg';
// import { FaRegEyeSlash } from "react-icons/fa";
// import Home from '../../route/Home';
// import { Route, Routes, Link } from 'react-router-dom';


// export default function Login(props)
//  {

  


//     return (
//         <div>
//             {/* <div className='logo'>
//             <img src={'Logo.svg'} alt='Logo' className='right'/> */}

//          {/* <h3> Lets go for a <FaBeer />? </h3> */}
//         <div className="Auth-form-container"> 
//             <div className='head-line'>
//                 <h5>Online Project Mangement</h5>
//             </div>
//             <form className="Auth-form">
//                 <div className="Auth-form-content">
//                     <h6 className="Auth-form-title">Login to get started</h6>
//                     <div className="form-group mt-3" >
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             className="form-control mt-1"
//                             placeholder="Enter email"
//                         />
//                     </div>
//                     <div className="form-group mt-3">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             className="form-control mt-1"
//                             placeholder="Enter password"
//                         />
//                         <FaRegEyeSlash className='icon' />
                        
//                        {/* <button className='icon'><i className="fa fa-eye-slash"></i></button> */}
//                         {/* <button class="btn"><i class="fa fa-home"></i></button> */}

//                     </div>
//                     <p className="forgot-password text-end mt-2">
//                         <a href="#">Forgot password?</a>
//                     </p>
//                     <div className="d-grid gap-2 col-6 mx-auto">
//                         <button type="submit" className="btn btn-primary" onSubmit={'/Home'}>
//                             Login
//                         </button>
                       
//                     </div>
//                 </div>
//             </form>
//         </div>
//         </div>
//     );
// }





/*

import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email) || !password) {
            setError('Invalid email format or empty fields');
            return;
        }

        if (email === 'user@example.com' && password === 'password') {
            alert('Login successful!');
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        // <div className="login-container">
        //     <form className="login-form" onSubmit={handleSubmit}>
        //         <h2 className="text-center">Login to get started</h2>
        //         <div className="form-group">
        //             <label>Email</label>
        //             <input
        //                 type="email"
        //                 className="form-control"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div className="form-group">
        //             <label>Password</label>
        //             <input
        //                 type="password"
        //                 className="form-control"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         {error && <p className="text-danger text-center">{error}</p>}
        //         <button type="submit" className="btn btn-primary btn-block">Login</button>
        //     </form>
        // </div>
        // <!-- Section: Design Block -->
 
};

export default Login;


/* import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email) || !password) {
            setError('Invalid email format or empty fields');
            return;
        }

        try {
            const response = await axios.post('https://your-backend-url.com/api/auth/login', {
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                history.push('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="text-center">Login to get started</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger text-center">{error}</p>}
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        </div>
    );
};

export default Login;*/
