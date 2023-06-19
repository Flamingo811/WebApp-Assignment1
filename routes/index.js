const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../models/User');
const Contact = require('../models/bizcontact');

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

router.get('/bizcontact', async (req, res) => {
  try {
    // Retrieve contacts from the database
    const contacts = await Contact.find();

    // Render the bizcontact view and pass the contacts data
    res.render('bizcontact', { contacts, showAddButton: true });
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).send('Error retrieving contacts');
  }
});


router.get('/bizcontact/add', (req, res) => {
  res.render('bizcontact_add');
});

router.post('/bizcontact/add', async (req, res) => {
  const { name, number, email } = req.body;

  try {
    // Create a new contact using the Contact model
    const contact = new Contact({ name, number, email });

    // Save the contact to the database
    await contact.save();

    // Redirect to the bizcontact page after successful contact creation
    res.redirect('/bizcontact');
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).send('Error creating contact');
  }
});

router.get('/bizcontact/update/:id', (req, res) => {
  const contactId = req.params.id;
  // Retrieve the contact from the database and render the update view
  res.render('bizcontact_update', { contactId });
});

router.get('/bizcontact/update/:id', async (req, res) => {
  const contactId = req.params.id;
  const { name, number, email } = req.body;

  try {
    // Find the contact by its ID
    const contact = await Contact.findById(contactId);
    res.render('bizcontact_update', { contact });
    // Update the contact's details
    contact.name = name;
    contact.number = number;
    contact.email = email;

    // Save the updated contact to the database
    await contact.save();

    // Redirect to the bizcontact page after successful contact update
    res.redirect('/bizcontact');
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).send('Error updating contact');
  }
});

router.post('/bizcontact/:id/delete', async (req, res) => {
  const contactId = req.params.id;

  try {
    // Find the contact by its ID and delete it
    await Contact.findByIdAndDelete(contactId);

    // Redirect to the bizcontact page after successful contact deletion
    res.redirect('/bizcontact');
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Error deleting contact');
  }
});

module.exports = router;
