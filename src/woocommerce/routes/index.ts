import express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('woocommerce plugin!');
});

export { router };