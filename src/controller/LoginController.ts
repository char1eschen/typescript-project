import "reflect-metadata";
import { Request, Response } from "express";
import { controller, get, post } from "./decorator";
import { getResponseData } from "../utils/util";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller
class LoginController {
  @post("/login")
  login(req: BodyRequest, res: Response) {
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
  }

  @get("/logout")
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }

  @get("/")
  home(req: BodyRequest, res: Response) {
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
  }
}