declare namespace responseResult {
  interface ProductItem {
    itemTitle: string;
    itemPrice: number;
  }

  interface DataStructure {
    [key: string]: ProductItem[];
  }
  type isLogin = boolean;
  type login = boolean;
  type logout = boolean;
  type getData = boolean;
  type showData = boolean | DataStructure;
}
