"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.send('woocommerce plugin!');
});
//# sourceMappingURL=index.js.map