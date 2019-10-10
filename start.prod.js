const moduleAlias = require('module-alias')
const {resolve} = require('path')
moduleAlias.addAlias('~', resolve(__dirname, 'dist/src'))
