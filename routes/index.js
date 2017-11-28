const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {res.send('Tracified Ecoomerce Home page');});

router.get('/about', (req, res) => { res.send('Tracified Ecoomerce About page');});
router.get('/contact', (req, res) => { res.send("Tracified Contact Details");});

module.exports = router;