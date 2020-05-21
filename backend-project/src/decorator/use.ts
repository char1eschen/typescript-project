import "reflect-metadata";
import { RequestHandler } from "express";
import { CrowllerController, LoginController } from "../controller";

export function use(middlewear: RequestHandler) {
  return function (target: CrowllerController | LoginController, key: string) {
    const originMiddlewares =
      Reflect.getMetadata("middlewears", target, key) || [];
    originMiddlewares.push(middlewear);
    Reflect.defineMetadata("middlewears", originMiddlewares, target, key);
  };
}
