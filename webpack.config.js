loaders: [{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
      
      {
        loader: 'file-loader',
        options: {
            hash: 'sha512',
            digest: 'hex',
            name:'[hash], [ext]'       
        },
      },
       {
        loader: 'image-webpack-loader',
        options: {
            bypassOnDebug : true ,

       },
     },
    ]
  }]