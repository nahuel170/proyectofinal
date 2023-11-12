const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const hbs = require('hbs');
const app = express();  
const userRoutes = require('./routes/userRoutes');
const turnosRoutes = require('./routes/turnosRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/user', userRoutes);
app.use('/turnos', turnosRoutes);

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res) => {
    res.render('registro');
});

module.exports = app;
