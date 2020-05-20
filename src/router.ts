import { Router, Request, Response } from "express";
import Crowller from "./crowller";
import ProductAnalyzer from "./productAnalyzer";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("hello word@");
});

router.get("/getData", (req: Request, res: Response) => {
  const url = "https://lovetodream.com.au/stage-1-swaddling/";
  const anaylzer = ProductAnalyzer.getInstance();
  new Crowller(url, anaylzer);
  res.send("get Data successfully");
});

export default router;
