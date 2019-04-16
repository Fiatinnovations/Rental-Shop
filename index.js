const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const http = require('http');
const config = require('config');
const mongoose = require('mongoose');
const genre = require('./Routes/genre');
const customer = require('./Routes/customer');
const movie = require('./Routes/movie');
const rental = require('./Routes/rental');
const user = require('./Routes/user');
const auth = require('./Routes/auth');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR!!! JwtPrivateKey is not set');
    process.exit(1);
}




const app = express();
app.use(helmet());

mongoose
    .connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => console.log('connected to the database successfully'))
    .catch(error => console.log(error));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/genres', genre);
app.use('/api/customers', customer);
app.use('/api/movies', movie);
app.use('/api/rentals', rental);
app.use('/api/users', user);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, () => {
    console.log(`Server listening on ${port}`);
});
