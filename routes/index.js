const express = require('express');
const router = express.Router();

//index route
router.get('/', (req, res) => {
    //res.send('Tracified - Shopify- modularized');
    const shop = req.query.shop;
    if (shop) {
        Shop.findOne({ 'name': shop }, 'name access_token', function (err, dbshop) {
            if (err) return handleError(err);
            if (dbshop && dbshop.access_token) {
                res.status(200).send("Your shop has been authorized and token has been saved. Admin API can be accessed using the token ");
            }
            else {
               return res.redirect(`/install/?${query}`);
            }
        });
    } else {
        return res.status(200).send('App Details and Tracified Details goes here');
    }
});

//test route
router.get('/trace', function (req, res) {
    res.send({
      'Order id': req.query.id,
      'Shop': req.query.shop,
      'Data': 'No Tracified Data Found'
    });
  });
//end of test routes

module.exports = router;