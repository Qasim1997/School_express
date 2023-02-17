module.exports = {
    entry: './app/app.js', // Path to your entry file
    output: {
      filename: 'bundle.js', // Name of the output file
      path: `${__dirname}/dist`, // Path to the output directory
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Transpile all JavaScript files
          exclude: /node_modules/, // Ignore the node_modules directory
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Use the @babel/preset-env preset
            },
          },
        },
      ],
    },
    mode: 'development', // Set the mode to development to enable source maps
    devtool: 'source-map', // Generate source maps for easier debugging
    watch: true, // Watch for file changes
  };
s  