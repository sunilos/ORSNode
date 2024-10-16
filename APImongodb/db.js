const mongoose = require('mongoose');

// Connect to MongoDB using 127.0.0.1 instead of localhost
mongoose.connect('mongodb://127.0.0.1:27017/testexpress', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Connection error: ', err);
});

module.exports = mongoose;