import { Request, Response, Router } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => { res.send("Tracified Ecoomerce Home page"); });
router.get("/about", (req: Request, res: Response) => { res.send("Tracified Ecoomerce About page"); });
router.get("/contact", (req: Request, res: Response) => { res.send("Tracified Contact Details"); });

export { router };
