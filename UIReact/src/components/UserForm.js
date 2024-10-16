import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { environment } from '../environment.ts';
import Footer from './Footer';


const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    dob: '',
    gender: '',
    role: ''
  });
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(true);
  const [validationMessages, setValidationMessages] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    dob: '',
    gender: '',
    role: ''
  });

  const apiUrl = environment.apiUrl;

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/api/user/getuser/${id}`, { credentials: 'include' })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          data.dob = new Date(data.dob).toISOString().split('T')[0];
          setFormData(data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setValidationMessages({
      ...validationMessages,
      [name]: ''
    });
  };

  const handleSubmit = () => {
    let valid = true;
    let messages = {};

    if (!formData.firstName) {
      valid = false;
      messages.firstName = 'First Name is required';

    }
    if (!formData.lastName) {
      valid = false;
      messages.lastName = 'Last Name is required';
    }
    if (!formData.loginId) {
      valid = false;
      messages.loginId = 'Login ID is required';
    } else if (!formData.loginId.endsWith('@gmail.com')) {
      valid = false;
      messages.loginId = 'Login ID is not in valid Form';
    }
    if (!formData.password) {
      valid = false;
      messages.password = 'Password is required';
    }
    if (!formData.dob) {
      valid = false;
      messages.dob = 'Date of Birth is required';
    }
    if (!formData.gender) {
      valid = false;
      messages.gender = 'Gender is required';
    }
    if (!formData.role) {
      valid = false;
      messages.role = 'Role is required';
    }

    setValidationMessages(messages);

    if (valid) {
      const url = id ? `${apiUrl}/api/user/updateuser/${id}` : `${apiUrl}/api/user/adduser`;
      const method = 'POST';

      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Login Id already exists');
          }
        })
        .then((data) => {
          setFormData({
            firstName: '',
            lastName: '',
            loginId: '',
            password: '',
            dob: '',
            gender: '',
            role: ''
          });
          setMessage(data.message);
          setShowMessage(true);
          navigate('/UserList');
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          setMessage(error.message);
          setShowMessage(true);
        });
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    < div
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/global-business-internet-network-connection-iot-internet-things-business-intelligence-concept-busines-global-network-futuristic-technology-background-ai-generative_1258-176818.jpg?semt=ais_hybrid')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card" style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
              <div className="card-body">
                <h2 className="card-title text-center">{id ? 'Update User' : 'Add User'}</h2>
                {showMessage && message && (
                  <div className="alert alert-info alert-dismissible fade show" role="alert">
                    {message}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseMessage}></button>
                  </div>
                )}
                <form>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      className="form-control"
                    />
                    {validationMessages.firstName && (
                      <div className="text-danger">{validationMessages.firstName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                      className="form-control"
                    />
                    {validationMessages.lastName && (
                      <div className="text-danger">{validationMessages.lastName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Login ID</label>
                    <input
                      type="text"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleChange}
                      placeholder="Enter Login ID"
                      className="form-control"
                    />
                    {validationMessages.loginId && (
                      <div className="text-danger">{validationMessages.loginId}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      className="form-control"
                    />
                    {validationMessages.password && (
                      <div className="text-danger">{validationMessages.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {validationMessages.dob && (
                      <div className="text-danger">{validationMessages.dob}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {validationMessages.gender && (
                      <div className="text-danger">{validationMessages.gender}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">admin</option>
                      <option value="student">student</option>
                    </select>
                    {validationMessages.role && (
                      <div className="text-danger">{validationMessages.role}</div>
                    )}
                  </div>
                  &nbsp;
                  <div className="text-center">
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">
                      Submit
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserForm;
