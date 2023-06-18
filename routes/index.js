const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../models/User');
const registerRoute = require('./routes/register');
const passport = require('passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

// Router callback for login page
router.get('/login', forwardAuthenticated, controller.login);
router.post('/login', forwardAuthenticated, passport.authenticate('local', {
    successRedirect: '/bizcontact',
    failureRedirect: '/login',
}));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', registerRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


router.use(express.urlencoded({ extended: true }));
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

router.use(express.static('public'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET About Me page. */
router.get('/aboutMe', function(req, res, next) {
  res.render('aboutMe', { title: 'Express' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Express' });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Express' });
});

/* GET contact page. */
router.get('/contactMe', function(req, res, next) {
  res.render('contactMe', { title: 'Express' });
});

// GET register page
router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.authenticated = true;
    res.redirect('/contacts');
  } else {
    res.redirect('/login');
  }
});

// Secure area routes
router.use((req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
});

// Business Contacts List View
router.get('/bizcontact', (req, res) => {
  // Retrieve contacts from the database and render the contacts view
  res.render('bizcontact');
});

// Update View
router.get('/bizcontact/:id/update', (req, res) => {
  const contactId = req.params.id;
  // Retrieve the contact from the database and render the update view
  res.render('update', { contactId });
});

router.post('/bizcontact/:id/update', (req, res) => {
  const contactId = req.params.id;
  // Update the contact details in the database and redirect to the contacts view
  res.redirect('/bizcontact');
});

module.exports = router;
