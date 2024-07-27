import React, { useState } from 'react';

const UserForm = ({ fetchUsers }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/api/user/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
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
        fetchUsers();
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div align="center">
      <h2>Add User</h2>
      {message && <p>{message}</p>}
      <table>
        <tbody>
          <tr>
            <td><label>First Name</label></td>
            <td><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Last Name</label></td>
            <td><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Login ID</label></td>
            <td><input type="text" name="loginId" value={formData.loginId} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Password</label></td>
            <td><input type="password" name="password" value={formData.password} onChange={handleChange}/></td>
          </tr>
          <tr>
            <td><label>Date of Birth</label></td>
            <td><input type="date" name="dob" value={formData.dob} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td><label>Gender</label></td>
            <td>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label>Role</label></td>
            <td><input type="text" name="role" value={formData.role} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              <button type="button" onClick={handleSubmit}>Add User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserForm;
