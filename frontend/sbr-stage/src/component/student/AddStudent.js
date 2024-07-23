import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link

const AddStudent = () => {
    let navigate=useNavigate();
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  const { firstName, lastName, email, department } = student;
  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await axios.post("http://localhost:9192/students", student);
    // Add any logic for handling success or failure of the API call
    navigate("/view-students");
  };

  return (
    <div className='col-sm-8 py-2 px-5'>
        <h2 className='mt-5'>  Ajoute des  Stagiaires</h2>
      <form onSubmit={(e)=>saveStudent(e)}>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='firstName'>Prenom</label>
          <input 
            className="form-control col-sm-6"
            type="text"
            name="firstName"
            id='firstName'
            required
            value={firstName}
            onChange={handleInputChange} 
          />
        </div>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='lastName'>nom</label>
          <input 
            className="form-control col-sm-6"
            type="text"
            name="lastName"
            id='lastName'
            required
            value={lastName}
            onChange={handleInputChange} 
          />
        </div>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='email'>Email</label>
          <input 
            className="form-control col-sm-6"
            type="email"
            name="email"
            id='email'
            required
            value={email}
            onChange={handleInputChange} 
          />
        </div>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='department'>Department</label>
          <input 
            className="form-control col-sm-6"
            type="text"
            name="department"
            id='department'
            required
            value={department}
            onChange={handleInputChange} 
          />
        </div>
        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>
          <div className="col-sm-2">
            <Link
              to={"/view-students"}
              className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
