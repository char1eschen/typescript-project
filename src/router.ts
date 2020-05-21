import { getResponseData } from "./utils/util";
import { Router, Request, Response, NextFunction } from "express";
import Crowller from "./utils/crowller";
import Analyzer from "./utils/analyzer";
import fs from "fs";
import path from "path";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "please login"));
  }
};

const router = Router();
router.get("/", (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href='/getData'>get data</a>
          <a href='/showData'>show data</a>
          <a href='/logout'>logout</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password">
            <button>login</button>
          </form>
        </body>
      </html>
    `);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(true));
});

router.post("/login", (req: BodyRequest, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    res.json(getResponseData(false, "already login"));
  } else {
    if (password === "123" && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, "login falied"));
    }
  }
});

router.get("/getData", checkLogin, (req: BodyRequest, res: Response) => {
  const url = "https://lovetodream.com.au/stage-1-swaddling/";
  const anaylzer = Analyzer.getInstance();
  new Crowller(url, anaylzer);
  res.json(getResponseData(true));
});

router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const position = path.resolve(__dirname, "../data/product.json");
    const result = fs.readFileSync(position, "utf-8");
    res.json(getResponseData(JSON.parse(result));
  } catch (e) {
    res.json(getResponseData(false, "no data"));
  }
});

export default router;
