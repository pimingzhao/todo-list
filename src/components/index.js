import Vue from 'vue'

const files = require.context('.', true, /\.vue$/)

files.keys().forEach(filename => {
  Vue.component(filename.replace(/^\.\/([a-zA-Z]+)\.vue$/, '$1'), files(filename).default)
})
