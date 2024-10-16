import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { environment } from '../environment.ts';
import Footer from './Footer';
import 'font-awesome/css/font-awesome.min.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ firstName: '', lastName: '', loginId: '' });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiUrl = environment.apiUrl;

  const fetchUsers = (query = {}, page = 1) => {
    const filteredQuery = {};
    Object.keys(query).forEach(key => {
      if (query[key]) {
        filteredQuery[key] = query[key];
      }
    });

    const queryString = new URLSearchParams({ ...filteredQuery, page }).toString();

    fetch(`${apiUrl}/api/user/searchuser?${queryString}`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setNoRecords(data.users.length === 0);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchUsers(searchQuery, currentPage);
  }, []);
  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      fetch(`${apiUrl}/api/user/deleteuser/${selectedUserId}`, {
        method: 'POST',
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            fetchUsers(searchQuery, currentPage);
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        })
        .finally(() => {
          setShowModal(false);
          setSelectedUserId(null);
        });
    }
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchUsers(searchQuery, 1);
  };

  const handleResetClick = () => {
    setSearchQuery({ firstName: '', lastName: '', loginId: '' });
    setCurrentPage(1);
    fetchUsers({}, 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      fetchUsers(searchQuery, currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      fetchUsers(searchQuery, currentPage - 1);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/image10/Serene-beach-with-smooth-rocks-gentle-waves-colorful-sunset-1080p-HD-Wallpapers.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
        paddingTop: '75px',
        paddingBottom: '100px'
      }}
    >
      <h1 align="center" style={{ color: 'black' }}>User List</h1>
      <div align="center" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="firstName"
          placeholder="Search by first name..."
          value={searchQuery.firstName}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding: '3px' }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Search by last name..."
          value={searchQuery.lastName}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding: '3px' }}
        />
        <input
          type="text"
          name="loginId"
          placeholder="Search by login ID..."
          value={searchQuery.loginId}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding: '3px' }}
        />
        <button onClick={handleSearchClick} style={{ padding: '7px', marginRight: '10px' }} className="btn btn-success btn-sm">
          Search
        </button>
        <button onClick={handleResetClick} style={{ padding: '7px', marginRight: '10px' }} className="btn btn-warning btn-sm">
          Reset
        </button>
      </div>

      {noRecords ? (
        <h3 align="center" style={{ color: 'red' }}>No records found</h3>
      ) : (
        <table border="1px" style={{ borderColor: 'khaki' }} width="100%" align="center" className="table table-hover table-dark table-bordered">
          <thead align="center">
            <tr>
              <th style={{ color: 'skyblue' }}>S.No</th>
              <th style={{ color: 'skyblue' }}>First Name</th>
              <th style={{ color: 'skyblue' }}>Last Name</th>
              <th style={{ color: 'skyblue' }}>Login ID</th>
              <th style={{ color: 'skyblue' }}>DOB</th>
              <th style={{ color: 'skyblue' }}>Gender</th>
              <th style={{ color: 'skyblue' }}>Role</th>
              <th style={{ color: 'skyblue' }}>Action</th>
            </tr>
          </thead>
          <tbody align="center">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * 5 + index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.loginId}</td>
                <td>{new Date(user.dob).toLocaleDateString()}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/edituser/${user._id}`} className="btn btn-primary btn-sm" style={{ marginRight: '5px' }}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <button onClick={() => handleDeleteClick(user._id)} className="btn btn-danger btn-sm">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handlePrevious} disabled={currentPage === 1} className="btn btn-warning">Previous</button>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="btn btn-warning">Next</button>
      </div>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this student?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserList;