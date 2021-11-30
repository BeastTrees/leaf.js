const path = require("path");

const WebpackShellPluginNext = require("webpack-shell-plugin-next");
var plugins = [];

/*plugins.push(new WebpackShellPluginNext({
    onBuildStart: {
        scripts: ['echo "===> Starting packing with WEBPACK 5"'],
        blocking: true,
        parallel: false
    },
    onBuildEnd: {
        scripts: ['node build/server.js'],
        blocking: false,
        parallel: true
    }
}));*/

module.exports = {
  mode: "none",
  entry: "./.leafjs/static/js/leafjs.js",
  resolve: {
    extensions: [".js", ".jsx", ".ljs", ".json", ".wasm"],
  },
  output: {
    path: __dirname + "/build/.leaf_dist",
    filename: "bundle.js",
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    contentBase: path.join(__dirname, "/build/.leaf_dist"),
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.ljs$/i,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
