"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
function use(middlewear) {
    return function (target, key) {
        var originMiddlewares = Reflect.getMetadata("middlewears", target, key) || [];
        originMiddlewares.push(middlewear);
        Reflect.defineMetadata("middlewears", originMiddlewares, target, key);
    };
}
exports.use = use;
