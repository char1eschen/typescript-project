import fs from "fs";
import cheerio from "cheerio";
import { Analyzer } from "./crowller";

interface Pruduct {
  itemTitle: string;
  itemPrice: number;
}

interface ProductResult {
  time: number;
  data: Pruduct[];
}

interface Content {
  [propName: number]: Pruduct[];
}

export default class ProductAnalyzer implements Analyzer {
  private static instance: ProductAnalyzer;

  static getInstance() {
    if (!ProductAnalyzer.instance) {
      ProductAnalyzer.instance = new ProductAnalyzer();
    }
    return ProductAnalyzer.instance;
  }

  private getProductInfo(html: string) {
    const $ = cheerio.load(html);
    const productItems = $(".product");
    const pruductInfos: Pruduct[] = [];
    productItems.map((index, element) => {
      const title = $(element).find(".card-title");
      const title1 = $(title).find(".card-title-1").text();
      const title2 = $(title).find(".card-title-2").text();
      const title3 = $(title).find(".card-title-3").text();
      const itemTitle = `${title1} ${title2} ${title3}`;
      const body = $(element).find(".card-body");
      const itemPrice = Number($(body).find(".price").text().replace("$", ""));
      pruductInfos.push({
        itemTitle,
        itemPrice,
      });
    });
    return {
      time: new Date().getTime(),
      data: pruductInfos,
    };
  }

  private generateJsonContent(productInfo: ProductResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[productInfo.time] = productInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const productInfo = this.getProductInfo(html);
    const fileContent = this.generateJsonContent(productInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
