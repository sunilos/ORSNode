import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { environment } from '../environment.ts';
import Footer from './Footer.js';

const MeritMarksheetList = () => {
  const [marksheets, setMarksheets] = useState([]);

  const apiUrl = environment.apiUrl;

  const fetchMarksheets = () => {
    fetch(`${apiUrl}/api/marksheet/getMeritList`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setMarksheets(data);
      })
      .catch(error => {
        console.error('Error fetching marksheets:', error);
      });
  };
  useEffect(() => {
    fetchMarksheets();
  }, []);


  return (
    <div
      style={{
        backgroundImage: `url('./image/welcome.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '85px'
      }}
    >
      <h1 align="center" style={{ color: 'black' }} > MeritMarksheet List</h1>
      <table border="1px" style={{ borderColor: 'khaki' }} width="100%" align="center" className="table table-hover table-dark table-bordered">
        <thead align="center">
          <tr>
            <th style={{ color: 'skyblue' }}>S.No</th>
            <th style={{ color: 'skyblue' }}>Name</th>
            <th style={{ color: 'skyblue' }}>Roll No</th>
            <th style={{ color: 'skyblue' }}>Physics</th>
            <th style={{ color: 'skyblue' }}>Chemistry</th>
            <th style={{ color: 'skyblue' }}>Maths</th>
          </tr>
        </thead>
        <tbody align="center">
          {marksheets.map((marksheet, index) => (
            <tr key={marksheet._id}>
              <td>{index + 1}</td>
              <td>{marksheet.name}</td>
              <td>{marksheet.rollNo}</td>
              <td>{marksheet.physics}</td>
              <td>{marksheet.chemistry}</td>
              <td>{marksheet.maths}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default MeritMarksheetList;
