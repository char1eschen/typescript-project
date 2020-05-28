"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var ProductAnalyzer = /** @class */ (function () {
    function ProductAnalyzer() {
    }
    ProductAnalyzer.getInstance = function () {
        if (!ProductAnalyzer.instance) {
            ProductAnalyzer.instance = new ProductAnalyzer();
        }
        return ProductAnalyzer.instance;
    };
    ProductAnalyzer.prototype.getProductInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var productItems = $(".product");
        var pruductInfos = [];
        productItems.map(function (index, element) {
            var title = $(element).find(".card-title");
            var title2 = $(title).find(".card-title-2").text();
            var title3 = $(title).find(".card-title-3").text();
            var itemTitle = title2 + " " + title3;
            var body = $(element).find(".card-body");
            var tempPrice = (Number($(body).find(".price--withTax").text().replace("$", "")) * Math.random()).toFixed(2);
            var itemPrice = Number(tempPrice);
            pruductInfos.push({
                itemTitle: itemTitle,
                itemPrice: itemPrice,
            });
        });
        console.log(pruductInfos);
        return {
            time: new Date().getTime(),
            data: pruductInfos.slice(0, 3),
        };
    };
    ProductAnalyzer.prototype.generateJsonContent = function (productInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[productInfo.time] = productInfo.data;
        return fileContent;
    };
    ProductAnalyzer.prototype.analyze = function (html, filePath) {
        var productInfo = this.getProductInfo(html);
        var fileContent = this.generateJsonContent(productInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return ProductAnalyzer;
}());
exports.default = ProductAnalyzer;
