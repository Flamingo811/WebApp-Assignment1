const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../models/User');

mongoose.connect('mongodb+srv://stephencencol:Kw811822@cluster0.x5e3n7s.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
