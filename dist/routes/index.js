"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
router.get("/", (req, res) => { res.send("Tracified Ecoomerce Home page"); });
router.get("/about", (req, res) => { res.send("Tracified Ecoomerce About page"); });
router.get("/contact", (req, res) => { res.send("Tracified Contact Details"); });
//# sourceMappingURL=index.js.map