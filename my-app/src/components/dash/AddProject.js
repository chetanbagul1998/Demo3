import React, { useState } from 'react';
import './AddProject.css';
import Logo from './Logo.svg';
import axios from 'axios';

const AddProject = () => {
  const [project, setProject] = useState({
    project_name: '',
    reason: '',
    type: '',
    division: '',
    category: '',
    priority: '',
    department: '',
    location: '',
    startDate: '',
    endDate: '',
    status: 'Registered', // Default status
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate end date should not be before start date
    if (new Date(project.endDate) < new Date(project.startDate)) {
      setError('End date cannot be earlier than start date.');
      return;
    }

    try {
      const response = await axios.post('/api/projects', project, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Project saved successfully:', response.data);
      setProject({
        project_name: '',
        reason: '',
        type: '',
        division: '',
        category: '',
        priority: '',
        dept: '',
        location: '',
        startDate: '',
        endDate: '',
        status: 'Registered',
      });
      setError(null);
    } catch (error) {
      console.error('There was an error saving the project:', error);
      setError('There was an error saving the project. Please try again.');
    }
  };

  return (
    <div className="add-project-page">
      <img src={Logo} alt="Logo" className="logo" />
      <div className="header"></div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col-10">
              <input
                type="text"
                name="project_name"
                placeholder="Enter Project Theme"
                value={project.project_name}
                onChange={handleChange}
                required
                style={{ paddingBlock: '17px' }}
              />
            </div>
            <div className="col-2">
              <button type="submit">Save Project</button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Reason</label>
              <select name="reason" value={project.reason} onChange={handleChange} required>
                <option value="">Select Reason</option>
                <option value="Business">Business</option>
                <option value="Dealership">Dealership</option>
                <option value="Transport">Transport</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={project.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Division</label>
              <select name="division" value={project.division} onChange={handleChange} required>
                <option value="">Select Division</option>
                <option value="Compressor">Compressor</option>
                <option value="Filters">Filters</option>
                <option value="Pumps">Pumps</option>
                <option value="Water Heater">Water Heater</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={project.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Quality A">Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={project.priority} onChange={handleChange} required>
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="dept" value={project.dept} onChange={handleChange} required>
                <option value="">Select Department</option>
                <option value="Strategy">Strategy</option>
                <option value="Finance">Finance</option>
                <option value="Quality">Quality</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stores">Stores</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date as per Project Plan</label>
              <input
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date as per Project Plan</label>
              <input
                type="date"
                name="endDate"
                value={project.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <select name="location" value={project.location} onChange={handleChange} required>
                <option value="">Select Location</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddProject;




// .................................................. 

// import React, { useState } from 'react';
// import './AddProject.css';
// import Logo from './Logo.svg';
// import axios from 'axios';

// const AddProject = () => {
//   const [project, setProject] = useState({
//     project_name: '',
//     reason: '',
//     type: '',
//     division: '',
//     category: '',
//     priority: '',
//     department: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//   });

//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setProject({
//       ...project,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/projects', project, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       console.log('Project saved successfully:', response.data);
//       setProject({
//         project_name: '',
//         reason: '',
//         type: '',
//         division: '',
//         category: '',
//         priority: '',
//         dept: '',
//         location: '',
//         startDate: '',
//         endDate: '',
//       });
//       setError(null);
//     } catch (error) {
//       console.error('There was an error saving the project:', error);
//       setError('There was an error saving the project. Please try again.');
//     }
//   };

//   return (
//     <div className="add-project-page">
//       <img src={Logo} alt="Logo" className="logo" />
//       <div className="header"></div>
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="col-10">
//               <input
//                 type="text"
//                 name="project_name"
//                 placeholder="Enter Project Theme"
//                 value={project.project_name}
//                 onChange={handleChange}
//                 required
//                 style={{ paddingBlock: '17px' }}
//               />
//             </div>
//             <div className="col-2">
//               <button type="submit">Save Project</button>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Reason</label>
//               <select name="reason" value={project.reason} onChange={handleChange} required>
//                 <option value="">Select Reason</option>
//                 <option value="Business">Business</option>
//                 <option value="Personal">Dealership</option>
//                 <option value="Personal">Transport</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Type</label>
//               <select name="type" value={project.type} onChange={handleChange} required>
//                 <option value="">Select Type</option>
//                 <option value="Internal">Internal</option>
//                 <option value="External">External</option>
//                 <option value="Vendor">Vendor</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Division</label>
//               <select name="division" value={project.division} onChange={handleChange} required>
//                 <option value="">Select Division</option>
//                 <option value="Compressor">Compressor</option>
//                 <option value="Filters">Filters</option>
//                 <option value="Pumps">Pumps</option>
//                 <option value="Water Heater">Water Heater</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Category</label>
//               <select name="category" value={project.category} onChange={handleChange} required>
//                 <option value="">Select Category</option>
//                 <option value="Quality A">Quality A</option>
//                 <option value="Quality B">Quality B</option>
//                 <option value="Quality C">Quality C</option>
//                 <option value="Quality D">Quality D</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Priority</label>
//               <select name="priority" value={project.priority} onChange={handleChange} required>
//                 <option value="">Select Priority</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Department</label>
//               <select name="dept" value={project.dept} onChange={handleChange} required>
//                 <option value="">Select Dept</option>
//                 <option value="Strategy">Strategy</option>
//                 <option value="Finance">Finance</option>
//                 <option value="Quality">Quality</option>
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="Stores">Stores</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Start Date as per Project Plan</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={project.startDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>End Date as per Project Plan</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={project.endDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Location</label>
//               <select name="location" value={project.location} onChange={handleChange} required>
//                 <option value="">Select Location</option>
//                 <option value="Pune">Pune</option>
//                 <option value="Mumbai">Mumbai</option>
//                 <option value="Delhi">Delhi</option>
//               </select>
//             </div>
//           </div>
//           {error && <p className="error-message">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProject;

// ......................................... 







// ................................................... 
// import React, { useState } from 'react';
// import './AddProject.css';
// import Logo from './Logo.svg';


// const AddProject = () => {
//   const [project, setProject] = useState({
//     theme: '',
//     reason: '',
//     type: '',
//     division: '',
//     category: '',
//     priority: '',
//     department: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//   });

//   const handleChange = (e) => {
//     setProject({
//       ...project,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(project);
//     // Handle project submission logic here
//   };

//   return (
//     <div className="add-project-page">
//         <img src={Logo} alt="Logo" className="logo" />

//       <div className="header">
//       </div>
//       <div className="form-container">
//         {/* <h2>Create Project</h2> */}
//         <form onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="col-10">
//               {/* <label>Enter Project Theme</label> */}
//               <input
//                 type="text"
//                 name="theme"
//                 placeholder='Enter Project Theme'
//                 value={project.theme}
//                 onChange={handleChange}
//                 required
//                 style={{paddingBlock: '17px'}}
//               />
//             </div>
//             <div className="col-2">
//               <button type="submit">Save Project</button>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Reason</label>
//               <select name="reason" value={project.reason} onChange={handleChange} required>
//                 <option value="">Select Reason</option>
//                 <option value="For Business">Business</option>
//                 <option value="For Personal">Dealership</option>
//                 <option value="For Personal">Transport</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Type</label>
//               <select name="type" value={project.type} onChange={handleChange} required>
//                 <option value="">Select Type</option>
//                 <option value="Internal">Internal</option>
//                 <option value="External">External</option>
//                 <option value="Vendor">Vendor</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Division</label>
//               <select name="division" value={project.division} onChange={handleChange} required>
//                 <option value="">Select Division</option>
//                 <option value="Compressor">Compressor</option>
//                 <option value="Filters">Filters</option>
//                 <option value="Pumps">Pumps</option>
//                 <option value="Water Heater">Water Heater</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Category</label>
//               <select name="category" value={project.category} onChange={handleChange} required>
//                 <option value="">Select Category</option>
//                 <option value="Quality A">Quality A</option>
//                 <option value="Quality B">Quality B</option>
//                 <option value="Quality C">Quality C</option>
//                 <option value="Quality D">Quality D</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Priority</label>
//               <select name="priority" value={project.priority} onChange={handleChange} required>
//                 <option value="">Select Priority</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Department</label>
//               <select name="department" value={project.department} onChange={handleChange} required>
//                 <option value="">Select Department</option>
//                 <option value="Strategy">Strategy</option>
//                 <option value="Finance">Finance</option>
//                 <option value="Quality">Quality</option>
//                 <option value="Maintenance">Maintenance</option>
//                 <option value="Stores">Stores</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Start Date as per Project Plan</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={project.startDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>End Date as per Project Plan</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={project.endDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Location</label>
//               <select name="location" value={project.location} onChange={handleChange} required>
//                 <option value="">Select Location</option>
//                 <option value="Pune">Pune</option>
//                 <option value="Mumbai">Mumbai</option>
//                 <option value="Delhi">Delhi</option>
//               </select>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProject;




// ............................................. 




// import React, { useState } from 'react';
// import './AddProject.css';

// const AddProject = () => {
//   const [project, setProject] = useState({
//     theme: '',
//     reason: '',
//     type: '',
//     division: '',
//     category: '',
//     priority: '',
//     department: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//   });

//   const handleChange = (e) => {
//     setProject({
//       ...project,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(project);
//     // Handle project submission logic here
//   };

//   return (
//     <div className="add-project-page">
//       <div className="header">
//         {/* <img src={require('./assets/Header-bg.svg').default} alt="Header" className="header-image" /> */}
//       </div>
//       <div className="form-container">
//         {/* <h2>Create Project</h2> */}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             {/* <label>Enter Project Theme</label> */}
//             <input
//               type="text"
//               name="theme"
//               placeholder='Enter Project Theme'
//               value={project.theme}
//               onChange={handleChange}
//               required
//             />
//           <button type="submit">Save Project</button>
//           </div>
         

//           <div className="form-group">
//             <label>Reason</label>
//             <select name="reason" value={project.reason} onChange={handleChange} required>
//               <option value="">Select Reason</option>
//               <option value="For Business">For Business</option>
//               <option value="For Personal">For Personal</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Type</label>
//             <select name="type" value={project.type} onChange={handleChange} required>
//               <option value="">Select Type</option>
//               <option value="Internal">Internal</option>
//               <option value="External">External</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Division</label>
//             <select name="division" value={project.division} onChange={handleChange} required>
//               <option value="">Select Division</option>
//               <option value="Filters">Filters</option>
//               <option value="Chemicals">Chemicals</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Category</label>
//             <select name="category" value={project.category} onChange={handleChange} required>
//               <option value="">Select Category</option>
//               <option value="Quality A">Quality A</option>
//               <option value="Quality B">Quality B</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Priority</label>
//             <select name="priority" value={project.priority} onChange={handleChange} required>
//               <option value="">Select Priority</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Department</label>
//             <select name="department" value={project.department} onChange={handleChange} required>
//               <option value="">Select Department</option>
//               <option value="Strategy">Strategy</option>
//               <option value="Finance">Finance</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Location</label>
//             <select name="location" value={project.location} onChange={handleChange} required>
//               <option value="">Select Location</option>
//               <option value="Pune">Pune</option>
//               <option value="Mumbai">Mumbai</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Start Date as per Project Plan</label>
//             <input
//               type="date"
//               name="startDate"
//               value={project.startDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>End Date as per Project Plan</label>
//             <input
//               type="date"
//               name="endDate"
//               value={project.endDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProject;






// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Dashb.css';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Typography, MenuItem, Button } from '@mui/material';
// import dayjs from 'dayjs';
// import axios from 'axios';

// function Add()
// {
//     const [projectName, setProjectName] = useState('');
//     const [selectedStartDate, setSelectedStartDate] = useState(null);
//     const [selectedEndDate, setSelectedEndDate] = useState(null);
//     const [endDateError, setEndDateError] = useState(false);
//     const [formErrors, setFormErrors] = useState({});
//     const [formValues, setFormValues] = useState({
//         reason: '',
//         type: '',
//         division: '',
//         category: '',
//         priority: '',
//         department: '',
//         location: ''
//     });

//     const validateForm = () => {
//         let errors = {};
//         if (!projectName) errors.projectName = "Project Name is required";
//         Object.keys(formValues).forEach(field => {
//             if (!formValues[field]) errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//         });
//         if (!selectedStartDate) errors.startDate = "Start date is required";
//         if (!selectedEndDate) errors.endDate = "End date is required";
//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const projectData = {
//                     projectName,
//                     ...formValues,
//                     status: 'Registered',
//                     startDate: selectedStartDate,
//                     endDate: selectedEndDate
                    
//                 };
//                 const response = await axios.post('/api/projects', projectData, {
                    
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token
                        
//                     }
//                 });
//                 console.log("Project created successfully:", response.data);
//                 // Reset form on success
//                 setProjectName('');
//                 setFormValues({
//                     reason: '',
//                     type: '',
//                     division: '',
//                     category: '',
//                     priority: '',
//                     department: '',
//                     location: ''
//                 });
//                 setSelectedStartDate(null);
//                 setSelectedEndDate(null);
//                 setEndDateError(false);
//                 setFormErrors({});
//             } catch (error) {
//                 if (error.response) {
//                     // The request was made and the server responded with a status code
//                     console.error("Server responded with error:", error.response.data);
//                 } else if (error.request) {
//                     // The request was made but no response was received
//                     console.error("No response received from server:", error.request);
//                 } else {
//                     // Something happened in setting up the request that triggered an error
//                     console.error("Error setting up the request:", error.message);
//                 }
//                 console.error("Error creating the project:", error);
//             }
//         }
//     };
    

//     const handleStartDateChange = (newValue) => {
//         setSelectedStartDate(newValue);
//         if (selectedEndDate && newValue && dayjs(newValue).isAfter(selectedEndDate)) {
//             setSelectedEndDate(null);
//             setEndDateError(true);
//         } else {
//             setEndDateError(false);
//         }
//     };

//     const handleEndDateChange = (newValue) => {
//         if (newValue && selectedStartDate && dayjs(newValue).isBefore(selectedStartDate)) {
//             setEndDateError(true);
//         } else {
//             setSelectedEndDate(newValue);
//             setEndDateError(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({
//             ...formValues,
//             [name]: value
//         });
//     };




//     return (

//         <div className='addProject'>
//             hello
//         </div>
        
//     );

// };

// export default Add;