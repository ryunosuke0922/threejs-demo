const path = require("path");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  mode: "development",

  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 2048,
              name: "./images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: outputPath,
  },
};
