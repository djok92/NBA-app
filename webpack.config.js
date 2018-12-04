const glob = require("glob");
const webpack = require("webpack");

module.exports = {
  entry: {
    js: glob.sync("./scripts/**/*.js")
  },
  output: {
    path: __dirname + "/dist/js",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jquery"
    })
  ]
};
