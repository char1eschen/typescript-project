module.exports = {
  devServer: {
    port: 8080,
    proxy: "http://localhost:7001",
  },
  transpileDependencies: ["vue-echarts", "resize-detector"],
};
