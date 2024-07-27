const sequelize = require('../db');

// Add a new user
const addUser = (userData) => {
    const query = `INSERT INTO Users (firstName, lastName, loginId, password, dob, gender, role) VALUES 
                   (:firstName, :lastName, :loginId, :password, :dob, :gender, :role)`;
    return sequelize.query(query, {
        replacements: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            loginId: userData.loginId,
            password: userData.password,
            dob: userData.dob,
            gender: userData.gender,
            role: userData.role
        }
    })
    .then(([result]) => ({ user: result, message: 'Data added successfully' }))
    .catch(error => { throw new Error(error.message); });
};

// Update a user
const updateUser = (userId, updateData) => {
    const query = `UPDATE Users SET firstName = :firstName, lastName = :lastName, loginId = :loginId, 
                   password = :password, dob = :dob, gender = :gender, role = :role WHERE id = :id`;
    return sequelize.query(query, {
        replacements: {
            id: userId,
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            loginId: updateData.loginId,
            password: updateData.password,
            dob: updateData.dob,
            gender: updateData.gender,
            role: updateData.role
        }
    })
    .then(([result]) => {
        if (result.affectedRows === 0) throw new Error('User not found');
        return getUserById(userId);
    })
    .catch(error => { throw new Error(error.message); });
};

// Delete a user
const deleteUser = (userId) => {
    const query = `DELETE FROM Users WHERE id = :id`;
    return sequelize.query(query, {
        replacements: { id: userId }
    })
    .then(([result]) => {
        if (result.affectedRows === 0) throw new Error('User not found');
        return { message: 'User deleted successfully' };
    })
    .catch(error => { throw new Error(error.message); });
};

// Get user by ID
const getUserById = (userId) => {
    const query = `SELECT * FROM Users WHERE id = :id`;
    return sequelize.query(query, {
        replacements: { id: userId },
        type: sequelize.QueryTypes.SELECT
    })
    .then((result) => {
        if (result.length === 0) throw new Error('User not found');
        return result[0];
    })
    .catch(error => { throw new Error(error.message); });
};

// Search users
const searchUsers = (query) => {
    const searchQuery = `SELECT * FROM Users WHERE firstName LIKE :firstName OR lastName LIKE :lastName`;
    return sequelize.query(searchQuery, {
        replacements: {
            firstName: `%${query.firstName || ''}%`,
            lastName: `%${query.lastName || ''}%`
        },
        type: sequelize.QueryTypes.SELECT
    })
    .then((results) => results)
    .catch(error => { throw new Error(error.message); });
};

// Authenticate user
const authenticateUser = (loginId, password) => {
    const query = `SELECT * FROM Users WHERE loginId = :loginId AND password = :password`;
    return sequelize.query(query, {
        replacements: {
            loginId: loginId,
            password: password
        },
        type: sequelize.QueryTypes.SELECT
    })
    .then((result) => {
        if (!result || result.length === 0) throw new Error('Invalid credentials');
        return { message: 'Authentication successful', user: result[0] };
    })
    .catch(error => { throw new Error(error.message); });
};

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
    authenticateUser
};
