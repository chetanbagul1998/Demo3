import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Login3.css';
import bg from './assets/login-bg-1.svg'; // Background image path
// import logo from './assets/logo.svg'; // Logo image path (you need to provide this)

const Login3 = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication here
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    // <div className="login-page" style={{ backgroundImage: `url(${bg})`}}>
    <div className="login-page" >
      <div className="login-container">      
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        <h2>Login to get started</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="forgot-password">Forgot password?</p>
        {/* <p className="error-message">Invalid credentials</p> Display this conditionally */}
      </div>
    </div>
  );
};

export default Login3;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login3.css';
// import bg from './assets/login-bg-1.svg';

// const Login3 = ({ setIsAuthenticated }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform authentication here
//     setIsAuthenticated(true);
//     navigate('/dashboard');
//   };

//   return (
//     <div className="login-page" style={{ backgroundImage: `url(${bg})` }}>
//       <div className="login-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login3;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login3.css';
// import bg from './assets/login-bg-1.svg';

// const Login3 = ({ setIsAuthenticated }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform authentication here
//     setIsAuthenticated(true);
//     navigate('/dashboard');
//   };

//   return (
   
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
  
//   );
// };

// export default Login3;
