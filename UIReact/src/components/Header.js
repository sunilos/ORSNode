import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                background: 'linear-gradient(to bottom right, grey, black)',
            }}
        >
            {/* Left-side image */}
            <Link className="navbar-brand" to="/">
                <img
                    src="https://www.raystec.com/assets/img/rays/customLogoOuterglow.png"
                    alt="Logo"
                    style={{ height: '40px' }}
                />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav flex-grow-1">
                    {user ? (
                        <>
                            {/* User Management Dropdown */}
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle btn"
                                    id="userDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    User Management
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                    {user.role === 'admin' && (
                                        <>
                                            <Link className="dropdown-item" to="/adduser">
                                                Add User
                                            </Link>
                                            <Link className="dropdown-item" to="/UserList">
                                                User List
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </li>

                            {/* Marksheet Management Dropdown */}
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle btn"
                                    id="marksheetDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Marksheet Management
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="marksheetDropdown">
                                    {user.role === 'admin' && (
                                        <>
                                            <Link className="dropdown-item" to="/addMarksheet">
                                                Add Marksheet
                                            </Link>
                                            <Link className="dropdown-item" to="/MarksheetList">
                                                Marksheet List
                                            </Link>
                                            <Link className="dropdown-item" to="/MeritMarksheetList">
                                                Merit Marksheet List
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </li>

                            {/* Student Management Dropdown */}
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle btn"
                                    id="studentDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Student Management
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="studentDropdown">
                                    {user.role === 'admin' && (
                                        <>
                                            <Link className="dropdown-item" to="/addStudent">
                                                Add Student
                                            </Link>
                                            <Link className="dropdown-item" to="/studentList">
                                                Student List
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </li>
                        </>
                    ) : (
                        <div style={{ color: 'white' }} className="navbar-nav ms-auto">

                            Hii, Guest

                        </div>
                    )}
                </ul>

                {user && (
                    <div className="nav-item dropdown" style={{ marginLeft: 'auto' }}>
                        <button
                            className="nav-link dropdown-toggle btn"
                            id="userGreeting"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ color: 'white' }}
                        >
                            Hii, {user.firstName}
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userGreeting">
                            <button className="dropdown-item" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
