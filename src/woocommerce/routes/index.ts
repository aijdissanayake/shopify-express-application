import { Request, Response, Router } from "express";
const router = Router();
/**
 * sample route
 */
router.get("/", (req: Request, res: Response) => {
    res.send("woocommerce plugin!");
});

export { router };
