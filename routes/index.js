const express = require('express');
const router = express.Router();

//index route
router.get('/', (req, res) => {
    res.send('Tracified - Shopify- modularized');
});

//test route
app.get('/trace', function (req, res) {
    res.send({
      'Order id': req.query.id,
      'Shop': req.query.shop,
      'Data': 'No Tracified Data Found'
    });
  });
//end of test routes

module.exports = router;