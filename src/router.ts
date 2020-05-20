import { Router, Request, Response } from "express";
import Crowller from "./crowller";
import ProductAnalyzer from "./productAnalyzer";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password">
          <button>login</button>
        </form>
      </body>
    </html>
  `);
});

// router.get("/login", (req: Request, res: Response) => {
//   res.send("hello word@");
// });

router.post("/getData", (req: Request, res: Response) => {
  if (req.body.password === "123") {
    const url = "https://lovetodream.com.au/stage-1-swaddling/";
    const anaylzer = ProductAnalyzer.getInstance();
    new Crowller(url, anaylzer);
    res.send("get Data successfully");
  } else {
    res.send("password incorrect!");
  }
});

export default router;
