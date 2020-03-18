const router = require('express').Router();

const controller = require('../controllers/contacts')

router.get('/', (req, res) => { controller.getContacts(req, res); });
router.get('/add', (req, res) => { controller.addContacts(req, res); });
router.get('/update', (req, res) => { controller.updateContacts(req, res); });

router.post('/delete', (req, res) => {controller.deleteContact(req, res)});

exports.Router = router;