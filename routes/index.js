const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../models/User');
require('dotenv').config();
const mongoose = require('mongoose');

// Create the Express app
const app = express();


// Connect to MongoDB
mongoose.connect('mongodb+srv://stephencencol:Kw811822@cluster0.x5e3n7s.mongodb.net/webapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
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

router.get('/register', (req, res) => {
  res.render('register');
});


router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      // Handle error
      return res.status(500).send('Error registering user');
    }

    // Hash the password with the generated salt
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        // Handle error
        return res.status(500).send('Error registering user');
      }

      const newUser = new User({ username, password: hashedPassword, email });

      // Save the user to the database
      newUser.save()
        .then(() => {
          // User created successfully
          // Redirect the user to the bizcontact page
          res.redirect('/bizcontact');
        })
        .catch((error) => {
          // Handle the error if user creation fails
          res.status(500).send('Error registering user');
        });
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.authenticated = true;
    res.redirect('/bizcontact');
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
  // Retrieve contacts from the database or any other data source
  const contacts = [
    { name: 'John Doe', number: '1234567890' },
    { name: 'Jane Smith', number: '9876543210' },
    // ... add more contacts as needed
  ];

  // Render the bizcontact view and pass the contacts data
  res.render('bizcontact', { contacts });
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
