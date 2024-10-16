import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { environment } from '../environment.ts'; // Import your environment variables
import Footer from './Footer.js';
import 'font-awesome/css/font-awesome.min.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState({ name: '', subject: '', mobileNo: '' });
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [recordNotFound, setRecordNotFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const apiUrl = environment.apiUrl;

    const fetchStudents = (query = {}, page = 1) => {
        const filteredQuery = {};
        Object.keys(query).forEach(key => {
            if (query[key]) {
                filteredQuery[key] = query[key];
            }
        });

        const queryString = new URLSearchParams(filteredQuery).toString();

        fetch(`${apiUrl}/api/student/searchstudent?${queryString}&page=${page}`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setTotalPages(data.totalPages);
                if (data.students.length === 0) {
                    setRecordNotFound(true);
                } else {
                    setRecordNotFound(false);
                }
                setStudents(data.students);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    };

    useEffect(() => {
        // Only fetch students when the component mounts or currentPage changes
        fetchStudents({}, currentPage);
    }, [currentPage]);

    const handleDeleteClick = (studentId) => {
        setSelectedStudentId(studentId);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedStudentId) {
            fetch(`${apiUrl}/api/student/deletestudent/${selectedStudentId}`, {
                method: 'POST',
                credentials: 'include',
            })
                .then(response => {
                    if (response.ok) {
                        fetchStudents(searchQuery, currentPage);
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                })
                .finally(() => {
                    setShowModal(false);
                    setSelectedStudentId(null);
                });
        }
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        setSearchQuery(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchClick = () => {
        setCurrentPage(1); // Reset to the first page on new search
        fetchStudents(searchQuery, 1); // Fetch students based on the search query
    };

    const handleResetClick = () => {
        setSearchQuery({ name: '', subject: '', mobileNo: '' }); // Reset the search query
        fetchStudents({}, 1); // Fetch all students
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/image10/Serene-beach-with-smooth-rocks-gentle-waves-colorful-sunset-1080p-HD-Wallpapers.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                height: '100vh',
                paddingTop: '85px'
            }}
        >
            <h2 align="center">Student List</h2>
            <div align="center" style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Search by Student name..."
                    value={searchQuery.name}
                    onChange={handleSearchChange} // Handle input change
                    style={{ marginRight: '10px', padding: '3px' }}
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Search by Subject..."
                    value={searchQuery.subject}
                    onChange={handleSearchChange} // Handle input change
                    style={{ marginRight: '10px', padding: '3px' }}
                />
                <input
                    type="text"
                    name="mobileNo"
                    placeholder="Search by Mobile Number..."
                    value={searchQuery.mobileNo}
                    onChange={handleSearchChange} // Handle input change
                    style={{ marginRight: '10px', padding: '3px' }}
                />
                <button onClick={handleSearchClick} className="btn btn-success btn-sm" style={{ padding: '5px', marginRight: '10px' }}>
                    Search
                </button>
                <button onClick={handleResetClick} className="btn btn-warning btn-sm" style={{ padding: '5px', marginRight: '10px' }}>
                    Reset
                </button>
            </div>

            {recordNotFound ? (
                <h1 align="center" style={{ color: 'red' }}>No records found</h1>
            ) : (
                <table border="1px" style={{ borderColor: 'khaki' }} width="100%" align="center" className="table table-hover table-dark table-bordered">
                    <thead align="center">
                        <tr>
                            <th style={{ color: 'skyblue' }}>S.NO</th>
                            <th style={{ color: 'skyblue' }}>Student Name</th>
                            <th style={{ color: 'skyblue' }}>Subject</th>
                            <th style={{ color: 'skyblue' }}>School</th>
                            <th style={{ color: 'skyblue' }}>DOB</th>
                            <th style={{ color: 'skyblue' }}>Mobile No</th>
                            <th style={{ color: 'skyblue' }}>Gender</th>
                            <th style={{ color: 'skyblue' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody align="center">
                        {students.map((student, index) => (
                            <tr key={student._id}>
                                <td>{(currentPage - 1) * 5 + index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.subject}</td>
                                <td>{student.school}</td>
                                <td>{new Date(student.dob).toLocaleDateString()}</td>
                                <td>{student.mobileNo}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <Link to={`/editstudent/${student._id}`}>
                                        <button className="btn btn-primary" style={{ marginRight: '10px', padding: '5px' }}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(student._id)} style={{ marginRight: '10px', padding: '5px' }}><i className="fa fa-trash" aria-hidden="true"></i></button>
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

export default StudentList;