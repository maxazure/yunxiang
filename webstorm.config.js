/**
 * 配置webstorm、idea识别webpack中的@等alias符号，以便ctrl+鼠标左键跳转及重构等
 */
'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
      // '@views': resolve('src/views'),
      // '@comp': resolve('src/components'),
      // '@core': resolve('src/core'),
      // '@utils': resolve('src/utils')
    }
  }
}
