const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

router.get('/order-trace', (req, res) => {
    res.send({
        'Order id': req.query.id,
        'Shop': req.query.shop,
        'Data': 'No Tracified Data Found'
      });
});

module.exports = router;