const path = require("path");

// 引入插件,得到构造函数
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 图片的大小如果小于指定的大小就会转成base64，否则就是路径
const maxImageSize = 2 * 1024;

// 创建插件的实例对象
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "./src/index.html"), // 源文件
  filename: "./index.html",
});

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const cleanPlugin = new CleanWebpackPlugin();

module.exports = {
  mode: "development",
  // eval-source-map 仅限于开发环境使用
  devtool: "eval-source-map",
  entry: path.join(__dirname, "./src/index.js"),
  // 表示输出的文件存放路径
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 8085,
  },
  module: {
    rules: [
      //文件后缀名的匹配规则
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      //   {
      //     test: /\.jpg|png|gif$/,
      //     use: `url-loader?limit=${maxImageSize}`, //图片的大小如果小于指定的大小就会转成base64，
      //   },
      {
        test: /\.jpg|png|gif$/,
        use: {
          loader: "url-loader",
          options: {
            limit: maxImageSize,
            outputPath: "images",
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [htmlPlugin, cleanPlugin], // 挂载插件实例对象
};
