const path = require(`path`);

module.exports = {
  entry: `./source/js/index.js`,
  output: {
    filename: `purchase-messages.js`,
    path: path.join(__dirname, `build/assets/features/purchase-messages`),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`]
          }
        },
      },
    ],
  },
  devtool: `source-map`,
};
