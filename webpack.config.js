const LicensePlugin = require("webpack-license-plugin");

module.exports = {
  entry: "./client.js",
  mode: "production",
  output: {
    filename: "dist.js",
  },
  plugins: [new LicensePlugin({})],
};
