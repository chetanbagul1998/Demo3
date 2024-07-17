
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import Logo from './Logo.svg';



function ProjectTable() {
  const [pr_details, setPrDetails] = useState([]);
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  

  // const fetchProjects = async () => {
  //   try {
  //     console.log(localStorage.getItem('token'));
  //     const response = await axios.get('http://localhost:8080/api/projects', {
  //     // const response = await axios.get('api/projects', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          
  //       },
  //     });
  //     setPrDetails(response.data);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //   }
  // };
  // console.log(localStorage.getItem('token'));

  const fetchProjects = async () => {
    try {
      // console.log(localStorage.getItem('token'));
      // const response = await axios.get('http://localhost:8080/api/projects', {
      const response = await axios.get('/api/projects', {
            
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
        },
      });
      setPrDetails(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code outside the range of 2xx
        console.error('Error fetching projects:', error.response.data);
        switch (error.response.status) {
          case 401:
            console.error('Unauthorized: Invalid or expired token.');
            // Handle token expiration or invalid token scenario
            break;
          case 403:
            console.error('Forbidden: You do not have permission to access this resource.');
            // Handle forbidden access scenario
            break;
          case 404:
            console.error('Not Found: The requested resource was not found.');
            // Handle resource not found scenario
            break;
          default:
            console.error('Server error:', error.response.status);
          // Handle other server errors
        }
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up request:', error.message);
      }
    }
  };
  

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      await axios.put(
        // `http://localhost:8080/api/projects/${projectId}`,
        `/api/projects/${projectId}`,
        // '/api/projects/${projectId}',
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        }
      );
      setPrDetails((prevDetails) =>
        prevDetails.map((project) =>
          project.id === projectId ? { ...project, status: newStatus } : project
        )
      );
      fetchProjects(); // Refresh project list after update
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  // Other functions for sorting, pagination, and filtering remain as before
  const handleSort = (column) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortColumn(column);
    
        const sortedDetails = [...pr_details].sort((a, b) => {
          if (a[column] < b[column]) {
            return order === 'asc' ? -1 : 1;
          }
          if (a[column] > b[column]) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });
    
        setPrDetails(sortedDetails);
      };

      const getSortLabel = (column) => {
            switch (column) {
              case 'project_name':
                return 'Project Name';
              case 'reason':
                return 'Reason';
              case 'type':
                return 'Type';
              case 'division':
                return 'Division';
              case 'category':
                return 'Category';
              case 'priority':
                return 'Priority';
              case 'dept':
                return 'Department';
              case 'location':
                return 'Location';
              case 'status':
                return 'Status';
              default:
                return 'Project Name';
            }
          };

            const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const handleStatusUpdate = async (projectId, newStatus) => {
  //   try {
  //     await axios.put(`http://localhost:8080/api/projects/${projectId}`, { status: newStatus });
  //     // Optionally update local state or fetch projects again after successful update
  //     fetchProjects();
  //   } catch (error) {
  //     console.error('Error updating project status:', error);
  //   }
  // };

  const filteredDetails = pr_details.filter((item) =>
    search.toLowerCase() === ''
      ? item
      : item.project_name.toLowerCase().includes(search) ||
        item.reason.toLowerCase().includes(search) ||
        item.type.toLowerCase().includes(search) ||
        item.division.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.priority.toLowerCase().includes(search) ||
        item.dept.toLowerCase().includes(search) ||
        item.location.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search)
  );

  const indexOfLastDetail = currentPage * contactsPerPage;
  const indexOfFirstDetail = indexOfLastDetail - contactsPerPage;
  const currentDetail = filteredDetails.slice(indexOfFirstDetail, indexOfLastDetail);

  const totalPages = Math.ceil(filteredDetails.length / contactsPerPage);



  return (
    <div>   
      <img src={Logo} alt="Logo" className="logo" />   
    <div style={{ backgroundColor: 'white', marginTop: '-41%', marginLeft: '8%', marginRight: '1%', borderRadius: '18px' }}>      
       {/* <Container-project style={{ backgroundColor: 'white', marginTop: '-41%', marginLeft: '8%' }}> */}
       {/* <Container-project style={{ backgroundColor: 'white', marginTop: '-41%', marginLeft: '8%' }}> */}
         <Form>
           <InputGroup className='my-3'>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
            />
            <Dropdown className='ml-3'>
              <h7 style={{ display: 'flex', alignItems: 'center' }}>Sort By : </h7>
              <Dropdown.Toggle variant='secondary-outline' id='dropdown-basic'>
                {getSortLabel(sortColumn)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSort('project_name')}>
                  Project Name
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('reason')}>
                  Reason
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('type')}>
                  Type
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('division')}>
                  Division
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('category')}>
                  Category
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('priority')}>
                  Priority
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('dept')}>
                  Department
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('location')}>
                  Location
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('status')}>
                  Status
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Form>
        <Table className='project-table'>
          <thead className='table-primary'>
            <tr>
              <th>Project Name</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Division</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              
              {/* <th>Date</th> */}
            </tr>
          </thead>
          <tbody>
            {currentDetail.map((item, index) => (
              <tr key={index}>
                {/* <td>{item.project_name} {item.startDate} {item.endDate}</td> */}
                <td>
                  {item.project_name}{""}<br/>
                  {format(new Date(item.startDate), 'MMM-dd, yyyy')}{" to "}
                  {format(new Date(item.endDate), 'MMM-dd, yyyy')}
                </td>

                <td>{item.reason}</td>
                <td>{item.type}</td>
                <td>{item.division}</td>
                <td>{item.category}</td>
                <td>{item.priority}</td>
                <td>{item.dept}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>                           

                {/* <td>{item.date}</td> */}
                <td>
                  <Button variant="primary" onClick={() => handleStatusUpdate(item.id, 'Running')} >
                    Start
                  </Button>
                </td>
                <td>
                  <Button variant="outline-primary" onClick={() => handleStatusUpdate(item.id, 'Closed')}>
                    Close
                  </Button>
                </td>
                <td>
                  <Button variant="outline-primary" onClick={() => handleStatusUpdate(item.id, 'Cancelled')} >
                    Cancel
                  </Button>
                </td>
                {/* <td>{item.startDate}</td>
                <td>{item.endDate}</td>  */}
              </tr>
            ))}
          </tbody>
      {/* </Container-project> */}
        </Table>
        <Pagination className='page-item' style={{padding: '32%', paddingBottom: '7px'}}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
    </div>
    </div>
    
  );
}

export default ProjectTable;



// .................................................... 






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Pagination from 'react-bootstrap/Pagination';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function ProjectTable() {
//   const [pr_details, setPrDetails] = useState([]);
//   const [search, setSearch] = useState('');
//   const [sortColumn, setSortColumn] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const contactsPerPage = 10;

//   useEffect(() => {
//     fetchProjects();
//   }, []); // Empty dependency array runs this effect once after initial render

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/projects');
//       setPrDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const handleSort = (column) => {
//     const order = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(order);
//     setSortColumn(column);

//     const sortedDetails = [...pr_details].sort((a, b) => {
//       if (a[column] < b[column]) {
//         return order === 'asc' ? -1 : 1;
//       }
//       if (a[column] > b[column]) {
//         return order === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setPrDetails(sortedDetails);
//   };

//   const getSortLabel = (column) => {
//     switch (column) {
//       case 'project_name':
//         return 'Project Name';
//       case 'reason':
//         return 'Reason';
//       case 'type':
//         return 'Type';
//       case 'division':
//         return 'Division';
//       case 'category':
//         return 'Category';
//       case 'priority':
//         return 'Priority';
//       case 'dept':
//         return 'Department';
//       case 'location':
//         return 'Location';
//       case 'status':
//         return 'Status';
//       default:
//         return 'Project Name';
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleStatusUpdate = async (projectId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:8080/api/projects/${projectId}`, { status: newStatus });
//       // Optionally update local state or fetch projects again after successful update
//       fetchProjects();
//     } catch (error) {
//       console.error('Error updating project status:', error);
//     }
//   };

//   const filteredDetails = pr_details.filter((item) =>
//     search.toLowerCase() === ''
//       ? item
//       : item.project_name.toLowerCase().includes(search) ||
//         item.reason.toLowerCase().includes(search) ||
//         item.type.toLowerCase().includes(search) ||
//         item.division.toLowerCase().includes(search) ||
//         item.category.toLowerCase().includes(search) ||
//         item.priority.toLowerCase().includes(search) ||
//         item.dept.toLowerCase().includes(search) ||
//         item.location.toLowerCase().includes(search) ||
//         item.status.toLowerCase().includes(search)
//   );

//   const indexOfLastDetail = currentPage * contactsPerPage;
//   const indexOfFirstDetail = indexOfLastDetail - contactsPerPage;
//   const currentDetail = filteredDetails.slice(indexOfFirstDetail, indexOfLastDetail);

//   const totalPages = Math.ceil(filteredDetails.length / contactsPerPage);

//   return (
//     <div>
//       <Container style={{ backgroundColor: 'white' }}>
//         <Form>
//           <InputGroup className='my-3'>
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder='Search'
//             />
//             <Dropdown className='ml-3'>
//               <h7 style={{ display: 'flex', alignItems: 'center' }}>Sort By : </h7>
//               <Dropdown.Toggle variant='secondary-outline' id='dropdown-basic'>
//                 {getSortLabel(sortColumn)}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => handleSort('project_name')}>
//                   Project Name
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('reason')}>
//                   Reason
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('type')}>
//                   Type
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('division')}>
//                   Division
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('category')}>
//                   Category
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('priority')}>
//                   Priority
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('dept')}>
//                   Department
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('location')}>
//                   Location
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('status')}>
//                   Status
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </InputGroup>
//         </Form>
//         <Table className='project-table'>
//           <thead className='table-primary'>
//             <tr>
//               <th>Project Name</th>
//               <th>Reason</th>
//               <th>Type</th>
//               <th>Division</th>
//               <th>Category</th>
//               <th>Priority</th>
//               <th>Department</th>
//               <th>Location</th>
//               <th>Status</th>
//               {/* <th>Date</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {currentDetail.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.project_name}</td>
//                 <td>{item.reason}</td>
//                 <td>{item.type}</td>
//                 <td>{item.division}</td>
//                 <td>{item.category}</td>
//                 <td>{item.priority}</td>
//                 <td>{item.dept}</td>
//                 <td>{item.location}</td>
//                 <td>{item.status}</td>
//                 {/* <td>{item.date}</td> */}
//                 <td>
//                   <Button
//                     variant="primary"
//                     onClick={() => handleStatusUpdate(item.id, 'Running')}
//                   >
//                     Start
//                   </Button>
//                 </td>
//                 <td>
//                   <Button
//                     variant="outline-primary"
//                     onClick={() => handleStatusUpdate(item.id, 'Closed')}
//                   >
//                     Closed
//                   </Button>
//                 </td>
//                 <td>
//                   <Button
//                     variant="outline-primary"
//                     onClick={() => handleStatusUpdate(item.id, 'Cancelled')}
//                   >
//                     Cancelled
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <Pagination className='page-item'>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <Pagination.Item
//               key={index + 1}
//               active={index + 1 === currentPage}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           ))}
//         </Pagination>
//       </Container>
//     </div>
//   );
// }

// export default ProjectTable;

// .......................................... run demo


// import React, { useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Pagination from 'react-bootstrap/Pagination';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { data } from './data.js';
// import Button from 'react-bootstrap/Button';


// function ProjectTable() {
//   const [pr_details, setContacts] = useState(data);
//   const [search, setSearch] = useState('');
//   const [sortColumn, setSortColumn] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const contactsPerPage = 10;

//   const handleSort = (column) => {
//     const order = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(order);
//     setSortColumn(column);

//     const sortedDetails = [...pr_details].sort((a, b) => {
//       if (a[column] < b[column]) {
//         return order === 'asc' ? -1 : 1;
//       }
//       if (a[column] > b[column]) {
//         return order === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setContacts(sortedDetails);
//   };

//   const getSortLabel = (column) => {
//     switch (column) {
//       case 'project_name':
//         return 'Project Name';
//       case 'reason':
//         return 'Reason';
//       case 'type':
//         return 'Type';
//       case 'division':
//         return 'Division';
//       case 'category':
//         return 'Category';
//       case 'priority':
//         return 'Priority';
//       case 'dept':
//         return 'Department';
//       case 'location':
//         return 'Location';
//       case 'status':
//         return 'Status';
//       default:
//         return 'Project Name';
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
  
//   const filteredDetails = pr_details.filter((item) => {
//     return search.toLowerCase() === ''
//       ? item
//       : item.project_name.toLowerCase().includes(search) ||
//         item.reason.toLowerCase().includes(search) ||
//         item.type.toLowerCase().includes(search) ||
//         item.division.toLowerCase().includes(search) ||
//         item.category.toLowerCase().includes(search) ||
//         item.priority.toLowerCase().includes(search) ||
//         item.dept.toLowerCase().includes(search) ||
//         item.location.toLowerCase().includes(search) ||
//         item.status.toLowerCase().includes(search);
        
//   });

//   const indexOfLastDetail = currentPage * contactsPerPage;
//   const indexOfFirstDetail = indexOfLastDetail - contactsPerPage;
//   const currentDetail = filteredDetails.slice(indexOfFirstDetail, indexOfLastDetail);

//   const totalPages = Math.ceil(filteredDetails.length / contactsPerPage);

//   return (
//     <div>
//       <Container style={{ backgroundColor: 'white' }}>
//         <Form>
//           <InputGroup className='my-3'>
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder='Search'
//             />
           
//             <Dropdown className='ml-3' >
//               <h7 style={{display: 'flex',alignItems: 'center'}}>Sort By : </h7>
//               <Dropdown.Toggle variant='secondary-outline' id='dropdown-basic'>
//                 {getSortLabel(sortColumn)}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => handleSort('project_name')}>
//                   Project Name
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('reason')}>
//                   Reason
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('type')}>
//                   Type
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('division')}>
//                   Division
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('category')}>
//                   Category
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('priority')}>
//                   Priority
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('dept')}>
//                   Department
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('location')}>
//                   Location
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('status')}>
//                   Status
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </InputGroup>
//         </Form>
//         <Table className='project-table'>
//           <thead className='table-primary'>
//             <tr>
//               <th>Project Name</th>
//               <th>Reason</th>
//               <th>Type</th>
//               <th>Division</th>
//               <th>Category</th>
//               <th>Priority</th>
//               <th>Department</th>
//               <th>Location</th>
//               <th>Status</th>
//               {/* <th>Date</th> */}
//             </tr>
//           </thead>
//           <tbody>
        
//             {currentDetail.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.project_name}</td>
//                 <td>{item.reason}</td>
//                 <td>{item.type}</td>
//                 <td>{item.division}</td>
//                 <td>{item.category}</td>
//                 <td>{item.priority}</td>
//                 <td>{item.dept}</td>
//                 <td>{item.location}</td>
//                 <td>{item.status}</td>
//                 {/* <td>{item.date}</td> */}
//                 <Button type="submit" className="btn btn-primary" variant="contained" color="primary">Start</Button>
//                 <Button type="submit" className="btn outline-primary" >Closed</Button>
//                 <Button type="submit" className="btn outline-primary" >Cancelled</Button>
//                 {/* <Button variant="primary">Start</Button>{' '} */}
//                 {/* <Button variant="outline-primary">Closed</Button>{' '} */}
//                 {/* <Button variant="outline-primary">Cancelled</Button>{' '} */}
                
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <Pagination className='page-item'>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <Pagination.Item
//               key={index + 1}
//               active={index + 1 === currentPage}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           ))}
//         </Pagination>
//       </Container>
//     </div>
//   );
// }

// export default ProjectTable;

// .................................................run demo

// import React, { useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { data } from './data.js';

// function ProjectTable() {
//   const [contacts, setContacts] = useState(data);
//   const [search, setSearch] = useState('');
//   const [sortColumn, setSortColumn] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');

//   const handleSort = (column) => {
//     const order = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(order);
//     setSortColumn(column);

//     const sortedContacts = [...contacts].sort((a, b) => {
//       if (a[column] < b[column]) {
//         return order === 'asc' ? -1 : 1;
//       }
//       if (a[column] > b[column]) {
//         return order === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setContacts(sortedContacts);
//   };

//   const getSortLabel = (column) => {
//     switch (column) {
//       case 'first_name':
//         return 'First Name';
//       case 'last_name':
//         return 'Last Name';
//       case 'email':
//         return 'Email';
//       case 'phone':
//         return 'Phone';
//       default:
//         return 'Sort by';
//     }
//   };

//   return (
//     <div>
//       <Container style={{backgroundColor : 'white'}}>
//         {/* <h1 className='text-center mt-4'>Contact Keeper</h1> */}
//         <Form>
//           <InputGroup className='my-3'>
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder='Search contacts'
//             />
//             <Dropdown className='ml-3'>
//               <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
//                 {getSortLabel(sortColumn)}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => handleSort('first_name')}>
//                   First Name
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('last_name')}>
//                   Last Name
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('email')}>
//                   Email
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('phone')}>
//                   Phone
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </InputGroup>
//         </Form>
//         <Table >
//           <thead >
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts
//               .filter((item) => {
//                 return search.toLowerCase() === ''
//                   ? item
//                   : item.first_name.toLowerCase().includes(search) ||
//                     item.last_name.toLowerCase().includes(search) ||
//                     item.email.toLowerCase().includes(search) ||
//                     item.phone.toLowerCase().includes(search);
//               })
//               .map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.first_name}</td>
//                   <td>{item.last_name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.phone}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// }

// export default ProjectTable;



// import React, { useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { data } from './data.js';

// function ProjectTable() {
//   const [contacts, setContacts] = useState(data);
//   const [search, setSearch] = useState('');
//   const [sortColumn, setSortColumn] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');

//   const handleSort = (column) => {
//     const order = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(order);
//     setSortColumn(column);

//     const sortedContacts = [...contacts].sort((a, b) => {
//       if (a[column] < b[column]) {
//         return order === 'asc' ? -1 : 1;
//       }
//       if (a[column] > b[column]) {
//         return order === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setContacts(sortedContacts);
//   };

//   return (
//     <div>
//       <Container>
//         <h1 className='text-center mt-4'>Contact Keeper</h1>
//         <Form>
//           <InputGroup className='my-3'>
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder='Search contacts'
//             />
//             <Dropdown className='ml-3'>
//               <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
//                 Sort by
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => handleSort('first_name')}>
//                   First Name
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('last_name')}>
//                   Last Name
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('email')}>
//                   Email
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleSort('phone')}>
//                   Phone
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </InputGroup>
//         </Form>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts
//               .filter((item) => {
//                 return search.toLowerCase() === ''
//                   ? item
//                   : item.first_name.toLowerCase().includes(search) ||
//                     item.last_name.toLowerCase().includes(search) ||
//                     item.email.toLowerCase().includes(search) ||
//                     item.phone.toLowerCase().includes(search);
//               })
//               .map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.first_name}</td>
//                   <td>{item.last_name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.phone}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// }

// export default ProjectTable;



// import React, { useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { data } from './data.js';

// function ProjectTable() {
//   const [contacts, setContacts] = useState(data);
//   const [search, setSearch] = useState('');

//   // const sortName = () => {
//   //   setContacts(
//   //     data.sort((a, b) => {
//   //       return a.first_name.toLowerCase() < a.first_name.toLowerCase()
//   //         ? -1
//   //         : a.first_name.toLowerCase() > a.first_name.toLowerCase()
//   //         ? 1
//   //         : 0;
//   //     })
//   //   );
//   // };

//   return (
//     <div>
//       <Container>
//         <h1 className='text-center mt-4'>Contact Keeper</h1>
//         <Form>
//           <InputGroup className='my-3'>

//             {/* onChange for search */}
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder='Search contacts'
//             />
//           </InputGroup>
//         </Form>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data
//               .filter((item) => {
//                 return search.toLowerCase() === ''
//                   ? item
//                   : item.first_name.toLowerCase().includes(search);
//               })
//               .map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.first_name}</td>
//                   <td>{item.last_name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.phone}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// }

// export default ProjectTable;



// import React from 'react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const selectOptions = {
//   0: 'Good',
//   1: 'Bad',
//   2: 'Unknown'
// };

// const products = [
//   { id: 1, name: 'Chetan', quality: 0 },
//   { id: 2, name: 'Ramesh', quality: 1 },
//   { id: 3, name: 'Shubham', quality: 2 },
//   { id: 4, name: 'Prashant', quality: 0 },
//   { id: 5, name: 'Dhananjay', quality: 1 }
// ];

// const columns = [
//   { dataField: 'id', text: 'Product ID' },
//   { dataField: 'name', text: 'Product Name', filter: textFilter() },
//   { dataField: 'quality', text: 'Product Quality', formatter: cell => selectOptions[cell], filter: selectFilter({ options: selectOptions }) }
// ];

// const ProjectTable = () => (
//   <div>
//     {/* <h2>Product Table with Filters</h2> */}

//     <BootstrapTable  keyField='id' data={products} columns={columns} filter={filterFactory()} />
//   <div className="container mt-5">
//   </div>
//   </div>
// );

// export default ProjectTable;




// import React from 'react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const selectOptions = {
//   0: 'Good',
//   1: 'Bad',
//   2: 'Unknown'
// };

// const products = [
//   { id: 1, name: 'Item 1', quality: 0 },
//   { id: 2, name: 'Item 2', quality: 1 },
//   { id: 3, name: 'Item 3', quality: 2 },
//   { id: 4, name: 'Item 4', quality: 0 },
//   { id: 5, name: 'Item 5', quality: 1 }
// ];

// const columns = [
//   { dataField: 'id', text: 'Product ID' },
//   { dataField: 'name', text: 'Product Name' },
//   { dataField: 'quality', text: 'Product Quality', formatter: cell => selectOptions[cell], filter: selectFilter({ options: selectOptions }) }
// ];

// const ProjectTable = () => (
//   <div className="container mt-5">
//     <h2 className="mb-3">Product Table with Filters</h2>
//     <BootstrapTable keyField='id' data={products} columns={columns} filter={filterFactory()} />
//   </div>
// );

// export default ProjectTable;
