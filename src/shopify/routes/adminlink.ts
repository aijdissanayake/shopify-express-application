import { Request, Response, Router } from "express";
const router = Router();

//shopify admin-links has to be decided and implemented. this is only a test route
router.get("/order-trace", (req, res) => {
    res.send({
        "Order id": req.query.id,
        "Shop": req.query.shop,
        "Data": "No Tracified Data Found"
      });
});

export { router };
