"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./utils/util");
var express_1 = require("express");
var crowller_1 = __importDefault(require("./utils/crowller"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, "please login"));
    }
};
var router = express_1.Router();
router.get("/", function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n      <html>\n        <body>\n          <a href='/getData'>get data</a>\n          <a href='/showData'>show data</a>\n          <a href='/logout'>logout</a>\n        </body>\n      </html>\n    ");
    }
    else {
        res.send("\n      <html>\n        <body>\n          <form method=\"post\" action=\"/login\">\n            <input type=\"password\" name=\"password\">\n            <button>login</button>\n          </form>\n        </body>\n      </html>\n    ");
    }
});
router.get("/logout", function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json(util_1.getResponseData(true));
});
router.post("/login", function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json(util_1.getResponseData(false, "already login"));
    }
    else {
        if (password === "123" && req.session) {
            req.session.login = true;
            res.json(util_1.getResponseData(true));
        }
        else {
            res.json(util_1.getResponseData(false, "login falied"));
        }
    }
});
router.get("/getData", checkLogin, function (req, res) {
    var url = "https://lovetodream.com.au/stage-1-swaddling/";
    var anaylzer = analyzer_1.default.getInstance();
    new crowller_1.default(url, anaylzer);
    res.json(util_1.getResponseData(true));
});
router.get("/showData", checkLogin, function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, "../data/product.json");
        var result = fs_1.default.readFileSync(position, "utf-8");
        res.json(util_1.getResponseData(JSON.parse(result)));
    }
    catch (e) {
        res.json(util_1.getResponseData(false, "no data"));
    }
});
exports.default = router;
