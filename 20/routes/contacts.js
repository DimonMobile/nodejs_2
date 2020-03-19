const router = require('express').Router();

const controller = require('../controllers/contacts')

router.get('/', (req, res) => { controller.getContacts(req, res); });
router.get('/add', (req, res) => { controller.addContacts(req, res); });
router.get('/update', (req, res) => { controller.updateContacts(req, res); });

router.post('/delete', (req, res) => {controller.deleteContact(req, res)});
router.post('/add', (req, res) => {controller.addContact(req, res)});
router.post('/update', (req, res) => {controller.updateContact(req, res)});

exports.Router = router;