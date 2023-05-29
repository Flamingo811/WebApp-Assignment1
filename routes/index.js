var express = require('express');
var router = express.Router();

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

module.exports = router;
