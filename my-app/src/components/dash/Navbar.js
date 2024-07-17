import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import dashboardLogo from './Dashboard.svg';
import dashboardLogoActive from './Dashboard-active.svg';
import projectListingLogo from './Project-list.svg';
import projectListingLogoActive from './Project-list-active.svg';
import addProjectLogo from './create-project.svg';
import addProjectLogoActive from './create-project-active.svg';
import logoutLogo from './Logout.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ handleLogout }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav style={{ width: '85px', padding: '20px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '20px 0', paddingTop: '172px' }}>
          <Link to="/dashboard">
            <img 
                //  src={dashboardLogoActive}
                 src={currentPath === '/dashboard' ? dashboardLogoActive : dashboardLogo}
                 alt="Dashboard" style={{ width: '30px', height: '30px' }} />

          </Link>
        </li>
        <li style={{ margin: '20px 0' }}>
          <Link to="/projects">
            <img 
                  // src={projectListingLogoActive} 
                  src={currentPath === '/projects' ? projectListingLogoActive : projectListingLogo}
                  alt="Project Listing" style={{ width: '30px', height: '30px' }} />
          </Link>
        </li>
        <li style={{ margin: '20px 0' }}>
          <Link to="/add-project">
            <img 
                //  src={addProjectLogoActive}
                 src={currentPath === '/add-project' ? addProjectLogoActive : addProjectLogo}
                 alt="Add Project" style={{ width: '30px', height: '30px' }} />
          </Link>
        </li>
        <li style={{ margin: '20px -22px', paddingTop: '174px' }}>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={logoutLogo} alt="Logout" style={{ width: '30px', height: '30px' }} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import dashboardLogo from './assets/Dashboard-active.svg';
// import projectListingLogo from './assets/Project-list-active.svg';
// import addProjectLogo from './assets/create-project-active.svg';
// import logoutLogo from './assets/Logout.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Navbar = ({ handleLogout }) => {
//   return (
//     <>
//     <nav>
//       <ul style={{ display: 'flex', listStyle: 'none', padding: 0 , flexDirection:'column'}}>
//         <li style={{ margin: '0 10px' }}>
//           <Link to="/dashboard">
//             <img src={dashboardLogo} alt="Dashboard" style={{ width: '30px', height: '30px' }} />
//           </Link>
//         </li>
//         <li style={{ margin: '0 10px' }}>
//           <Link to="/projects">
//             <img src={projectListingLogo} alt="Project Listing" style={{ width: '30px', height: '30px' }} />
//           </Link>
//         </li>
//         <li style={{ margin: '0 10px' }}>
//           <Link to="/add-project">
//             <img src={addProjectLogo} alt="Add Project" style={{ width: '30px', height: '30px' }} />
//           </Link>
//         </li>
//         <li style={{ margin: '0 10px' }}>
//           <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//             <img src={logoutLogo} alt="Logout" style={{ width: '30px', height: '30px' }} />
//           </button>
//         </li>
//       </ul>
//     </nav>
    
//     </>
//   );
// };

// export default Navbar;
