import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashb.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Typography, MenuItem, Button } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

export default function CreatePr() {
    const [projectName, setProjectName] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [endDateError, setEndDateError] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formValues, setFormValues] = useState({
        reason: '',
        type: '',
        division: '',
        category: '',
        priority: '',
        department: '',
        location: ''
    });

    const validateForm = () => {
        let errors = {};
        if (!projectName) errors.projectName = "Project Name is required";
        Object.keys(formValues).forEach(field => {
            if (!formValues[field]) errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        });
        if (!selectedStartDate) errors.startDate = "Start date is required";
        if (!selectedEndDate) errors.endDate = "End date is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
    //         try {
    //             const projectData = {
    //                 projectName,
    //                 ...formValues,
    //                 startDate: selectedStartDate,
    //                 endDate: selectedEndDate,
    //                 status: 'Registered'
    //             };
    //             const response = await axios.post('/api/projects', projectData, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token
    //                 }
    //             });
    //             console.log("Project created successfully:", response.data);
    //             // Reset form on success
    //             setProjectName('');
    //             setFormValues({
    //                 reason: '',
    //                 type: '',
    //                 division: '',
    //                 category: '',
    //                 priority: '',
    //                 department: '',
    //                 location: ''
    //             });
    //             setSelectedStartDate(null);
    //             setSelectedEndDate(null);
    //             setEndDateError(false);
    //             setFormErrors({});
    //         } catch (error) {
    //             console.error("There was an error creating the project:", error);
    //         }
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const projectData = {
                    projectName,
                    ...formValues,
                    status: 'Registered',
                    startDate: selectedStartDate,
                    endDate: selectedEndDate
                    
                };
                const response = await axios.post('/api/projects', projectData, {
                    
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token
                        
                    }
                });
                console.log("Project created successfully:", response.data);
                // Reset form on success
                setProjectName('');
                setFormValues({
                    reason: '',
                    type: '',
                    division: '',
                    category: '',
                    priority: '',
                    department: '',
                    location: ''
                });
                setSelectedStartDate(null);
                setSelectedEndDate(null);
                setEndDateError(false);
                setFormErrors({});
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error("Server responded with error:", error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received from server:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error("Error setting up the request:", error.message);
                }
                console.error("Error creating the project:", error);
            }
        }
    };
    

    const handleStartDateChange = (newValue) => {
        setSelectedStartDate(newValue);
        if (selectedEndDate && newValue && dayjs(newValue).isAfter(selectedEndDate)) {
            setSelectedEndDate(null);
            setEndDateError(true);
        } else {
            setEndDateError(false);
        }
    };

    const handleEndDateChange = (newValue) => {
        if (newValue && selectedStartDate && dayjs(newValue).isBefore(selectedStartDate)) {
            setEndDateError(true);
        } else {
            setSelectedEndDate(newValue);
            setEndDateError(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <div>
            <form className="createProject-form" onSubmit={handleSubmit}>
                <div className="form-group row">
                    <div className="col-md-10">
                        <TextField 
                            className="form-control"
                            style={{ height: '67px', width: 'inherit' }} 
                            id="projectName" 
                            name="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Enter Project Name"
                            error={!!formErrors.projectName}
                            helperText={formErrors.projectName}
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <Button type="submit" className="btn btn-primary" variant="contained" color="primary">Save Project</Button>
                    </div>
                </div>
                 <div className="form-group row">
                     <div className="col-md-4">
                         <TextField
                            select
                            id="inputState1"
                            name="reason"
                            label="Reason"
                            value={formValues.reason}
                            onChange={handleInputChange}
                            error={!!formErrors.reason}
                            helperText={formErrors.reason}
                            fullWidth
                        >
                            <MenuItem value="">Choose...</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Dealership">Dealership</MenuItem>
                            <MenuItem value="Transport">Transport</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-4">
                        <TextField
                            select
                            id="inputState2"
                            name="type"
                            label="Type"
                            value={formValues.type}
                            onChange={handleInputChange}
                            error={!!formErrors.type}
                            helperText={formErrors.type}
                            fullWidth
                        >
                            <MenuItem value="">Choose...</MenuItem>
                            <MenuItem value="Internal">Internal</MenuItem>
                            <MenuItem value="External">External</MenuItem>
                            <MenuItem value="Vendor">Vendor</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-4">
                        <TextField
                            select
                            id="inputState3"
                            name="division"
                            label="Division"
                            value={formValues.division}
                            onChange={handleInputChange}
                            error={!!formErrors.division}
                            helperText={formErrors.division}
                            fullWidth
                        >
                            <MenuItem value="">Choose...</MenuItem>
                            <MenuItem value="Compressor">Compressor</MenuItem>
                            <MenuItem value="Filters">Filters</MenuItem>
                            <MenuItem value="Pumps">Pumps</MenuItem>
                            <MenuItem value="Water Heater">Water Heater</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-4">
                        <TextField
                            select
                            id="inputState"
                            name="category"
                            label="Category"
                            value={formValues.category}
                            onChange={handleInputChange}
                            error={!!formErrors.category}
                            helperText={formErrors.category}
                            fullWidth
                        >
                            <MenuItem value="">Choose...</MenuItem>
                            <MenuItem value="Quality A">Quality A</MenuItem>
                            <MenuItem value="Quality B">Quality B</MenuItem>
                            <MenuItem value="Quality C">Quality C</MenuItem>
                            <MenuItem value="Quality D">Quality D</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-4">
                        <TextField
                            select
                            id="inputState4"
                            name="priority"
                            label="Priority"
                            value={formValues.priority}
                            onChange={handleInputChange}
                            error={!!formErrors.priority}
                            helperText={formErrors.priority}
                            fullWidth
                        >
                            <MenuItem value="">Choose...</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-4">
                        <TextField
                            select
                            id="inputState5"
                            name="department"
                            label="Department"
                            value={formValues.department}
                            onChange={handleInputChange}
                            error={!!formErrors.department}
                            helperText={formErrors.department}
                            fullWidth
                        >
                            <MenuItem value="">Choose...</MenuItem>
                            <MenuItem value="Strategy">Strategy</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Quality">Quality</MenuItem>
                            <MenuItem value="Maintenance">Maintenance</MenuItem>
                            <MenuItem value="Stores">Stores</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-4">
                        <label>Start Date as per Project Plan</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={selectedStartDate}
                                onChange={handleStartDateChange}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        fullWidth 
                                        error={!!formErrors.startDate}
                                        helperText={formErrors.startDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-md-4">
                        <label>End Date as per Project Plan</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={selectedEndDate}
                                onChange={handleEndDateChange}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        fullWidth 
                                        error={endDateError || !!formErrors.endDate}
                                        helperText={endDateError ? "End date should be after the start date" : formErrors.endDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-md-4">
                        <TextField
                            select
                            id="inputState6"
                            name="location"
                            label="Location"
                            value={formValues.location}
                            onChange={handleInputChange}
                            error={!!formErrors.location}
                            helperText={formErrors.location}
                            fullWidth
                        >
                            <MenuItem value="">Choose...</MenuItem>
                            <MenuItem value="Pune">Pune</MenuItem>
                            <MenuItem value="Mumbai">Mumbai</MenuItem>
                            <MenuItem value="Delhi">Delhi</MenuItem>
                        </TextField>
                    </div>
                    
                    {/* <div className="col-md-12 mt-3" style={{ textAlign: 'center' }}>Status: <b>Registered</b></div> */}
                    
                 </div> 
            </form>
        </div>
    );
}




// ....................................... 
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Typography, MenuItem, Button } from '@mui/material';
// import dayjs from 'dayjs';
// import axios from 'axios';

// export default function CreatePr() {
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
//                 // await axios.post('http://localhost:8080/api/projects', {
//                 await axios.post('/api/projects', {
//                     projectName,
//                     ...formValues,
//                     startDate: selectedStartDate,
//                     endDate: selectedEndDate,
//                     status: 'Registered'
//                 }, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token
//                     }
//                 });
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
//                 console.error("There was an error creating the project!", error);
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
//         <div>
//             <form className="createProject-form" onSubmit={handleSubmit}>
//                 <div className="form-group row">
//                     <div className="col-md-10">
//                         <TextField 
//                             className="form-control"
//                             style={{ height: '67px', width: 'inherit' }} 
//                             id="projectName" 
//                             name="projectName"
//                             value={projectName}
//                             onChange={(e) => setProjectName(e.target.value)}
//                             placeholder="Enter Project Name"
//                             error={!!formErrors.projectName}
//                             helperText={formErrors.projectName}
//                         />
//                     </div>
//                     <div className="col-md-2 d-flex align-items-end">
//                         <Button type="submit" className="btn btn-primary" variant="contained" color="primary">Save Project</Button>
//                     </div>
//                 </div>
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState1"
//                             name="reason"
//                             label="Reason"
//                             value={formValues.reason}
//                             onChange={handleInputChange}
//                             error={!!formErrors.reason}
//                             helperText={formErrors.reason}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Business">Business</MenuItem>
//                             <MenuItem value="Dealership">Dealership</MenuItem>
//                             <MenuItem value="Transport">Transport</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState2"
//                             name="type"
//                             label="Type"
//                             value={formValues.type}
//                             onChange={handleInputChange}
//                             error={!!formErrors.type}
//                             helperText={formErrors.type}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Internal">Internal</MenuItem>
//                             <MenuItem value="External">External</MenuItem>
//                             <MenuItem value="Vendor">Vendor</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState3"
//                             name="division"
//                             label="Division"
//                             value={formValues.division}
//                             onChange={handleInputChange}
//                             error={!!formErrors.division}
//                             helperText={formErrors.division}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Compressor">Compressor</MenuItem>
//                             <MenuItem value="Filters">Filters</MenuItem>
//                             <MenuItem value="Pumps">Pumps</MenuItem>
//                             <MenuItem value="Water Heater">Water Heater</MenuItem>
//                         </TextField>
//                     </div>
//                 </div>
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState"
//                             name="category"
//                             label="Category"
//                             value={formValues.category}
//                             onChange={handleInputChange}
//                             error={!!formErrors.category}
//                             helperText={formErrors.category}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Quality A">Quality A</MenuItem>
//                             <MenuItem value="Quality B">Quality B</MenuItem>
//                             <MenuItem value="Quality C">Quality C</MenuItem>
//                             <MenuItem value="Quality D">Quality D</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState4"
//                             name="priority"
//                             label="Priority"
//                             value={formValues.priority}
//                             onChange={handleInputChange}
//                             error={!!formErrors.priority}
//                             helperText={formErrors.priority}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="High">High</MenuItem>
//                             <MenuItem value="Low">Low</MenuItem>
//                             <MenuItem value="Medium">Medium</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState5"
//                             name="department"
//                             label="Department"
//                             value={formValues.department}
//                             onChange={handleInputChange}
//                             error={!!formErrors.department}
//                             helperText={formErrors.department}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Strategy">Strategy</MenuItem>
//                             <MenuItem value="Finance">Finance</MenuItem>
//                             <MenuItem value="Quality">Quality</MenuItem>
//                             <MenuItem value="Maintenance">Maintenance</MenuItem>
//                             <MenuItem value="Stores">Stores</MenuItem>
//                         </TextField>
//                     </div>
//                 </div>
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label>Start Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedStartDate}
//                                 onChange={handleStartDateChange}
//                                 renderInput={(params) => (
//                                     <TextField 
//                                         {...params} 
//                                         fullWidth 
//                                         error={!!formErrors.startDate}
//                                         helperText={formErrors.startDate}
//                                     />
//                                 )}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label>End Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedEndDate}
//                                 onChange={handleEndDateChange}
//                                 renderInput={(params) => (
//                                     <TextField 
//                                         {...params} 
//                                         fullWidth 
//                                         error={endDateError || !!formErrors.endDate}
//                                         helperText={endDateError ? "End date should be after the start date" : formErrors.endDate}
//                                     />
//                                 )}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState6"
//                             name="location"
//                             label="Location"
//                             value={formValues.location}
//                             onChange={handleInputChange}
//                             error={!!formErrors.location}
//                             helperText={formErrors.location}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Pune">Pune</MenuItem>
//                             <MenuItem value="Mumbai">Mumbai</MenuItem>
//                             <MenuItem value="Delhi">Delhi</MenuItem>
//                         </TextField>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
// .......................................... 


// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Typography, MenuItem, Button } from '@mui/material';
// import dayjs from 'dayjs';
// import axios from 'axios';


// export default function CreatePr() {
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
//                 // await axios.post('http://localhost:8080/api/projects', {
//                 await axios.post('/api/projects', {
//                     projectName,
//                     ...formValues,
//                     startDate: selectedStartDate,
//                     endDate: selectedEndDate,
//                     status: 'Registered'
//                 });
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
//                 console.error("There was an error creating the project!", error);
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
//         <div>
//             <form className="createProject-form" onSubmit={handleSubmit}>
//                 {/* First Row */}
//                 <div className="form-group row">
//                     <div className="col-md-10">
//                         <TextField 
//                             className="form-control"
//                             style={{ height: '67px', width: 'inherit' }} 
//                             id="projectName" 
//                             name="projectName"
//                             value={projectName}
//                             onChange={(e) => setProjectName(e.target.value)}
//                             placeholder="Enter Project Name"
//                             error={!!formErrors.projectName}
//                             helperText={formErrors.projectName}
//                         />
//                     </div>
//                     <div className="col-md-2 d-flex align-items-end">
//                         <Button type="submit" className="btn btn-primary" variant="contained"
//                                color="primary">Save Project</Button>
//                     </div>
//                 </div>

//                 {/* Second Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState1"
//                             name="reason"
//                             label="Reason"
//                             value={formValues.reason}
//                             onChange={handleInputChange}
//                             error={!!formErrors.reason}
//                             helperText={formErrors.reason}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Business">Business</MenuItem>
//                             <MenuItem value="Dealership">Dealership</MenuItem>
//                             <MenuItem value="Transport">Transport</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState2"
//                             name="type"
//                             label="Type"
//                             value={formValues.type}
//                             onChange={handleInputChange}
//                             error={!!formErrors.type}
//                             helperText={formErrors.type}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Internal">Internal</MenuItem>
//                             <MenuItem value="External">External</MenuItem>
//                             <MenuItem value="Vendor">Vendor</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState3"
//                             name="division"
//                             label="Division"
//                             value={formValues.division}
//                             onChange={handleInputChange}
//                             error={!!formErrors.division}
//                             helperText={formErrors.division}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Compressor">Compressor</MenuItem>
//                             <MenuItem value="Filters">Filters</MenuItem>
//                             <MenuItem value="Pumps">Pumps</MenuItem>
//                             <MenuItem value="Water Heater">Water Heater</MenuItem>
//                         </TextField>
//                     </div>
//                 </div>

//                 {/* Third Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState"
//                             name="category"
//                             label="Category"
//                             value={formValues.category}
//                             onChange={handleInputChange}
//                             error={!!formErrors.category}
//                             helperText={formErrors.category}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Quality A">Quality A</MenuItem>
//                             <MenuItem value="Quality B">Quality B</MenuItem>
//                             <MenuItem value="Quality C">Quality C</MenuItem>
//                             <MenuItem value="Quality D">Quality D</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState4"
//                             name="priority"
//                             label="Priority"
//                             value={formValues.priority}
//                             onChange={handleInputChange}
//                             error={!!formErrors.priority}
//                             helperText={formErrors.priority}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="High">High</MenuItem>
//                             <MenuItem value="Low">Low</MenuItem>
//                             <MenuItem value="Medium">Medium</MenuItem>
//                         </TextField>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState5"
//                             name="department"
//                             label="Department"
//                             value={formValues.department}
//                             onChange={handleInputChange}
//                             error={!!formErrors.department}
//                             helperText={formErrors.department}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Strategy">Strategy</MenuItem>
//                             <MenuItem value="Finance">Finance</MenuItem>
//                             <MenuItem value="Quality">Quality</MenuItem>
//                             <MenuItem value="Maintenance">Maintenance</MenuItem>
//                             <MenuItem value="Stores">Stores</MenuItem>
//                         </TextField>
//                     </div>
//                 </div>

//                 {/* Fourth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label>Start Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedStartDate}
//                                 onChange={handleStartDateChange}
//                                 renderInput={(params) => (
//                                     <TextField 
//                                         {...params} 
//                                         fullWidth 
//                                         error={!!formErrors.startDate}
//                                         helperText={formErrors.startDate}
//                                     />
//                                 )}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label>End Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedEndDate}
//                                 onChange={handleEndDateChange}
//                                 renderInput={(params) => (
//                                     <TextField 
//                                         {...params} 
//                                         fullWidth 
//                                         error={endDateError || !!formErrors.endDate}
//                                         helperText={endDateError ? "End date cannot be earlier than start date" : formErrors.endDate}
//                                     />
//                                 )}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <TextField
//                             select
//                             id="inputState6"
//                             name="location"
//                             label="Location"
//                             value={formValues.location}
//                             onChange={handleInputChange}
//                             error={!!formErrors.location}
//                             helperText={formErrors.location}
//                             fullWidth
//                         >
//                             <MenuItem value="">Choose...</MenuItem>
//                             <MenuItem value="Pune">Pune</MenuItem>
//                             <MenuItem value="Delhi">Delhi</MenuItem>
//                             <MenuItem value="Mumbai">Mumbai</MenuItem>
//                         </TextField>
//                     </div>
//                 </div>

//                 {/* Fifth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-12" style={{ textAlign: 'center' }}>
//                         <Typography variant="body2">Status: Registered</Typography>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
// ................................................



// import React, { useState } from "react";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Typography } from '@mui/material';
// import dayjs from 'dayjs';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';

// export default function CreatePr() {
//     const [selectedStartDate, setSelectedStartDate] = useState(null);
//     const [selectedEndDate, setSelectedEndDate] = useState(null);
//     const [endDateError, setEndDateError] = useState(false);


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

//     return (
//         <div>
//             <form className="createProject-form">
//                 {/* First Row */}
//                 <div className="form-group row">
//                     <div className="col-md-10">
//                         <TextField className="form-control" style={{ height: '67px', width: 'inherit' }} id="projectTheme" rows="3" placeholder="Enter Project Theme"></TextField>
//                     </div>
//                     <div className="col-md-2 d-flex align-items-end">
//                         <button type="submit" className="btn btn-primary">Save Project</button>
//                     </div>
//                 </div>

//                 {/* Second Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label htmlFor="inputState1">Reason</label>
//                         <select id="inputState1" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Business</option>
//                             <option>Dealership</option>
//                             <option>Transport</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState2">Type</label>
//                         <select id="inputState2" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Internal</option>
//                             <option>External</option>
//                             <option>Vendor</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState3">Division</label>
//                         <select id="inputState3" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Compressor</option>
//                             <option>Filters</option>
//                             <option>Pumps</option>
//                             <option>Water Heater</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Third Row */}
//                 <div className="form-group row">
//                     <div class="col-md-4">
//                         <label for="inputState">Category</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>Quality A</option>
//                             <option>Quality B</option>
//                             <option>Quality C</option>
//                             <option>Quality D</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState4">Priority</label>
//                         <select id="inputState4" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>High</option>
//                             <option>Low</option>
//                             <option>Medium</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState5">Department</label>
//                         <select id="inputState5" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Strategy</option>
//                             <option>Finance</option>
//                             <option>Quality</option>
//                             <option>Maintenance</option>
//                             <option>Stores</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Fourth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label>Start Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedStartDate}
//                                 onChange={handleStartDateChange}
//                                 format="DD/MM/YYYY"
//                                 renderInput={(params) => <TextField {...params} />}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label>End Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedEndDate}
//                                 onChange={handleEndDateChange}
//                                 format="DD/MM/YYYY"
//                                 renderInput={(params) => <TextField {...params} error={endDateError} helperText={endDateError ? "End date cannot be earlier than start date" : ""} />}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState6">Location</label>
//                         <select id="inputState6" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Pune</option>
//                             <option>Delhi</option>
//                             <option>Mumbai</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Fifth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-12" style={{ textAlign: 'center' }}>
//                         <Typography variant="body2">Status: Registered</Typography>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
// ................................................ 


// import React, { useState } from "react";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Typography } from '@mui/material';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function CreatePr() {
//     const [selectedStartDate, setSelectedStartDate] = useState(null);
//     const [selectedEndDate, setSelectedEndDate] = useState(null);
//     const [endDateError, setEndDateError] = useState(false);

//     const handleStartDateChange = (newValue) => {
//         setSelectedStartDate(newValue);
//         if (selectedEndDate && newValue && newValue.isAfter(selectedEndDate)) {
//             setSelectedEndDate(null);
//             setEndDateError(true);
//         } else {
//             setEndDateError(false);
//         }
//     };

//     const handleEndDateChange = (newValue) => {
//         if (newValue && selectedStartDate && newValue.isBefore(selectedStartDate)) {
//             setEndDateError(true);
//         } else {
//             setSelectedEndDate(newValue);
//             setEndDateError(false);
//         }
//     };

//     return (
//         <div>
//             <form className="createProject-form">
//                 {/* First Row */}
//                 <div className="form-group row">
//                     <div className="col-md-10">
//                         <TextField className="form-control" style={{ height: '67px', width: 'inherit' }} id="projectTheme" rows="3" placeholder="Enter Project Theme"></TextField>
//                     </div>
//                     <div className="col-md-2 d-flex align-items-end">
//                         <button type="submit" className="btn btn-primary">Save Project</button>
//                     </div>
//                 </div>

//                 {/* Second Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label htmlFor="inputState1">Reason</label>
//                         <select id="inputState1" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Business</option>
//                             <option>Dealership</option>
//                             <option>Transport</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState2">Type</label>
//                         <select id="inputState2" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Internal</option>
//                             <option>External</option>
//                             <option>Vendor</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState3">Division</label>
//                         <select id="inputState3" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Compressor</option>
//                             <option>Filters</option>
//                             <option>Pumps</option>
//                             <option>Water Heater</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Third Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label htmlFor="createTypography">Create Typography</label>
//                         <input type="text" className="form-control" id="createTypography" placeholder="Create Typography" />
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState4">Priority</label>
//                         <select id="inputState4" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>High</option>
//                             <option>Low</option>
//                             <option>Medium</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState5">Department</label>
//                         <select id="inputState5" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Strategy</option>
//                             <option>Finance</option>
//                             <option>Quality</option>
//                             <option>Maintenance</option>
//                             <option>Stores</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Fourth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label>Start Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedStartDate}
//                                 onChange={handleStartDateChange}
//                                 format="DD/MM/YYYY"
//                                 renderInput={(params) => <TextField {...params} error={false} />}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label>End Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedEndDate}
//                                 onChange={handleEndDateChange}
//                                 format="DD/MM/YYYY"
//                                 renderInput={(params) => <TextField {...params} error={endDateError} helperText={endDateError ? "End date cannot be earlier than start date" : ""} />}
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState6">Location</label>
//                         <select id="inputState6" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Pune</option>
//                             <option>Delhi</option>
//                             <option>Mumbai</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Fifth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-12" style={{ textAlign: 'center' }}>
//                         <Typography variant="body2">Status: Registered</Typography>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }



// import React, { useState } from "react";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Typography } from '@mui/material';
// import 'react-datepicker/dist/react-datepicker.css';

// export default function CreatePr() {
//     const [selectedStartDate, setSelectedStartDate] = useState(null);
//     const [selectedEndDate, setSelectedEndDate] = useState(null);

//     const handleStartDateChange = (newValue) => {
//         setSelectedStartDate(newValue);
//     };

//     const handleEndDateChange = (newValue) => {
//         setSelectedEndDate(newValue);
//     };

//     return (
//         <div>
//             <form className="createProject-form">
//                 {/* First Row */}
//                 <div className="form-group row">
//                     <div className="col-md-10">
//                         {/* <label htmlFor="projectTheme">Project Theme</label> */}
//                         <TextField className="form-control" style={{height: '67px', width: 'inherit'}} id="projectTheme" rows="3" placeholder="Enter Project Theme"></TextField>
//                     </div>
//                     <div className="col-md-2 d-flex align-items-end">
//                         <button type="submit" className="btn btn-primary">Save Project</button>
//                     </div>
//                 </div>

//                 {/* Second Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label htmlFor="inputState1">Reason</label>
//                         <select id="inputState1" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Business</option>
//                             <option>Dealership</option>
//                             <option>Transport</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState2">Type</label>
//                         <select id="inputState2" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Internal</option>
//                             <option>External</option>
//                             <option>Vendor</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState3">Division</label>
//                         <select id="inputState3" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Compressor</option>
//                             <option>Filters</option>
//                             <option>Pumps</option>
//                             <option>Water Heater</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Third Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label htmlFor="createTypography">Create Typography</label>
//                         <input type="text" className="form-control" id="createTypography" placeholder="Create Typography" />
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState4">Priority</label>
//                         <select id="inputState4" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>High</option>
//                             <option>Low</option>
//                             <option>Medium</option>
//                         </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState5">Department</label>
//                         <select id="inputState5" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Strategy</option>
//                             <option>Finance</option>
//                             <option>Quality</option>
//                             <option>Maintenance</option>
//                             <option>Stores</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Fourth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-4">
//                         <label>Start Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedStartDate}
//                                 onChange={handleStartDateChange}
//                                 format="DD/MM/YYYY"
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label>End Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedEndDate}
//                                 onChange={handleEndDateChange}
//                                 format="DD/MM/YYYY"
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div className="col-md-4">
//                         <label htmlFor="inputState6">Location</label>
//                         <select id="inputState6" className="form-control">
//                             <option defaultValue>Choose...</option>
//                             <option>Pune</option>
//                             <option>Delhi</option>
//                             <option>Mumbai</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Fifth Row */}
//                 <div className="form-group row">
//                     <div className="col-md-12" style={{textAlign :'center'}}>
//                         <Typography variant="body2">Status: Registered</Typography>
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 {/* <div className="form-group row">
//                     <div className="col-md-12">
//                         <button type="submit" className="btn btn-primary">Save Project</button>
//                     </div>
//                 </div> */}
//             </form>
//         </div>
//     );
// }

//  1.i want first textarea then save project button in first row 
//  2. in second row Reason, Type, Division 
//  3. in third row createTypography, Priority, Department
//  4. forth row start date as per project plan , End date project plan, location
//  5. last Status: registered



// import React, { useState } from "react";
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// // import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { createDateStrForV7HiddenInputFromSections } from "@mui/x-date-pickers/internals"

// export default function CreatePr()
// {
//     const [selectedDate, setSelectedDate] = useState(null)
//     return (
//         <div>
//             <form>
//                 <div class="form-row">
//                     <div class="col-4">
//                         <label for="inputEmail4"></label>
//                         <input type="email" class="form-control" id="inputEmail4" placeholder="Enter Project Theme" />
//                     </div>
//                     <div className="col-6">
//                     <button type="submit" class="btn btn-primary">Save Project</button>
//                     </div>

//                     <div class="form-group col-md-4">
//                         <label for="inputState">Reason</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>Business</option>
//                             <option>Dealership</option>
//                             <option>Trasport</option>
//                         </select> 
//                     </div>
//                     <div class="form-group col-md-4">
//                         <label for="inputState">Type</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>Internal</option>
//                             <option>External</option>
//                             <option>Vendor</option>
//                         </select> 
//                     </div>
//                     <div class="form-group col-md-4">
//                         <label for="inputState">Divison</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>Compressor</option>
//                             <option>Filters</option>
//                             <option>Pumps</option>
//                             <option>Water Heater</option>
//                         </select> 
//                     </div>
//                     <div class="form-group col-md-4">
//                         <label for="inputState">Category</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>Quality A</option>
//                             <option>Quality B</option>
//                             <option>Quality C</option>
//                             <option>Quality D</option>                            
//                         </select> 
//                     </div>
//                     <div class="form-group col-md-4">
//                         <label for="inputState">Priority</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>High</option>
//                             <option>Low</option>
//                             <option>Medium</option>
//                         </select> 
//                     </div>
//                     <div class="form-group col-md-4">
//                         <label for="inputState">Dipartment</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>Strategy</option>
//                             <option>Finance</option>
//                             <option>Quality</option>
//                             <option>Maintenance</option>
//                             <option>Stores</option>
//                         </select> 
//                     </div>
                    
//                     <div>
//                         <label>Start Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedDate}
//                                 onChange={(newValue) => setSelectedDate(newValue)}
//                                 format="DD/MM/YYYY"
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div>
//                         <label>End Date as per Project Plan</label>
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 value={selectedDate}
//                                 onChange={(newValue) => setSelectedDate(newValue)}
//                                 format="DD/MM/YYYY"
//                             />
//                         </LocalizationProvider>
//                     </div>
//                     <div class="form-group col-md-4">
//                         <label for="inputState">Location</label>
//                         <select id="inputState" class="form-control">
//                             <option selected>Choose...</option>
//                             <option>Pune</option>
//                             <option>Delhi</option>
//                             <option>Mumbai</option>
//                         </select> 
//                     </div>
//                     <h6>Status : Registered</h6>
//                 </div>         
//             </form>
//         </div>
//     )
// }




{/* <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        // filterDate={date => date.getDay() !=5}
        showYearDropdown
        scrollableMonthYearDropdown
/>
 */}