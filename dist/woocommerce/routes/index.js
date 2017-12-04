"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
/**
 * sample route
 */
router.get("/", (req, res) => {
    res.send("woocommerce plugin!");
});
//# sourceMappingURL=index.js.map