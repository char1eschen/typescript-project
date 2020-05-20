"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var productAnalyzer_1 = __importDefault(require("./productAnalyzer"));
var router = express_1.Router();
router.get("/", function (req, res) {
    res.send("hello word@");
});
router.get("/getData", function (req, res) {
    var url = "https://lovetodream.com.au/stage-1-swaddling/";
    var anaylzer = productAnalyzer_1.default.getInstance();
    new crowller_1.default(url, anaylzer);
    res.send("get Data successfully");
});
exports.default = router;
