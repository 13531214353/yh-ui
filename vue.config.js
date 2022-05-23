const { defineConfig } = require("@vue/cli-service");
const path = require("path");

console.log(path.resolve(__dirname, "./packages/button/index.ts"));

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  lintOnSave: true,
  productionSourceMap: false,
  outputDir: "lib",
  // configureWebpack: {
  //   entry: {
  //     button: path.resolve(__dirname, "./packages/button/index.ts"),
  //     image: path.resolve(__dirname, "./packages/image/index.ts"),
  //   },
  //   output: {
  //     filename: "[name]/index.js",
  //   },
  // },
  pages: {
    button: {
      entry: path.resolve(__dirname, "./packages/button/index.ts"),
      template: "public/index.html",
      filename: "index.html",
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("js")
      .include.add("/packages")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        return options;
      });
  },
});
