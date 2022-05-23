const { defineConfig } = require("@vue/cli-service");
const path = require("path");

console.log(path.resolve(__dirname, "./packages/button/index.ts"));

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  lintOnSave: true,
  productionSourceMap: false,
  outputDir: "lib",
  // entry: {
  //   button: path.resolve(__dirname, "./packages/button/index.ts"),
  //   image: path.resolve(__dirname, "./packages/image/index.ts"),
  // },
  // output: {
  //   filename: "[name]/index.js",
  // },
  configureWebpack: {
    entry: {
      button: path.resolve(__dirname, "./packages/button/index.ts"),
      image: path.resolve(__dirname, "./packages/image/index.ts"),
    },
    output: {
      filename: "[name]/index.js",
      libraryTarget: "umd",
    },
  },
  pages: {
    index: {
      entry: path.resolve(__dirname, "./examples/main.ts"),
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
    config.optimization.delete("splitChunks");
    config.plugins.delete("copy");
    config.plugins.delete("html");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugins.delete("hmr");
    config.entryPoints.delete("app");
  },
});
