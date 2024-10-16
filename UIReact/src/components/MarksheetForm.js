import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { environment } from '../environment.ts';
import Footer from './Footer.js';

const MarksheetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    physics: '',
    chemistry: '',
    maths: ''
  });
  const [studentNames, setStudentNames] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const apiUrl = environment.apiUrl;

  useEffect(() => {

    fetch(`${apiUrl}/api/student/prelod`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStudentNames(data.students.map(student => student.name));
      })
      .catch(error => console.error('Error fetching student names:', error));

    if (id) {
      fetch(`${apiUrl}/api/marksheet/getMarksheet/${id}`, { credentials: 'include' })
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
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    if (!formData.name) {
      validationErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.rollNo) {
      validationErrors.rollNo = 'Roll No is required.';
      isValid = false;
    }

    if (!formData.physics || isNaN(formData.physics)) {
      validationErrors.physics = 'Valid Physics marks are required.';
      isValid = false;
    }

    if (!formData.chemistry || isNaN(formData.chemistry)) {
      validationErrors.chemistry = 'Valid Chemistry marks are required.';
      isValid = false;
    }

    if (!formData.maths || isNaN(formData.maths)) {
      validationErrors.maths = 'Valid Maths marks are required.';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const url = id ? `${apiUrl}/api/marksheet/updateMarksheet/${id}` : `${apiUrl}/api/marksheet/addMarksheet`;
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
          throw new Error('Network response was not ok.');
        }
      })
      .then((data) => {
        setFormData({
          name: '',
          rollNo: '',
          physics: '',
          chemistry: '',
          maths: ''
        });
        setMessage(data.message);
        navigate('/MarksheetList');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        setMessage(error.message);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/stylish-cover-dark-colors-theme-websites-website-development-logos-posts-more-socia_343960-112437.jpg?w=1380')`,
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
            <div className="card" style={{ background: 'linear-gradient(to right, rgba(0, 198, 255, 0.8), rgba(0, 114, 255, 0.8))' }}>
              <div className="card-body">
                <h2 className="card-title text-center">{id ? 'Update Marksheet' : 'Add Marksheet'}</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <select
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    >
                      <option value="">-------Select Name-------</option>
                      {studentNames.length > 0 ? (
                        studentNames.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No students found</option>
                      )}
                    </select>
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label>RollNo</label>
                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      placeholder="Enter RollNo"
                      className={`form-control ${errors.rollNo ? 'is-invalid' : ''}`}
                    />
                    {errors.rollNo && <div className="invalid-feedback">{errors.rollNo}</div>}
                  </div>
                  <div className="form-group">
                    <label>Physics</label>
                    <input
                      type="text"
                      name="physics"
                      value={formData.physics}
                      onChange={handleChange}
                      placeholder="Enter Physics Marks"
                      className={`form-control ${errors.physics ? 'is-invalid' : ''}`}
                    />
                    {errors.physics && <div className="invalid-feedback">{errors.physics}</div>}
                  </div>
                  <div className="form-group">
                    <label>Chemistry</label>
                    <input
                      type="text"
                      name="chemistry"
                      value={formData.chemistry}
                      onChange={handleChange}
                      placeholder="Enter Chemistry Marks"
                      className={`form-control ${errors.chemistry ? 'is-invalid' : ''}`}
                    />
                    {errors.chemistry && <div className="invalid-feedback">{errors.chemistry}</div>}
                  </div>
                  <div className="form-group">
                    <label>Maths</label>
                    <input
                      type="text"
                      name="maths"
                      value={formData.maths}
                      onChange={handleChange}
                      placeholder="Enter Maths Marks"
                      className={`form-control ${errors.maths ? 'is-invalid' : ''}`}
                    />
                    {errors.maths && <div className="invalid-feedback">{errors.maths}</div>}
                  </div>
                  <div className="text-center">
                    <button type="button" onClick={handleSubmit} style={{ padding: '5px' }} className="btn btn-warning">Submit</button>
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

export default MarksheetForm;