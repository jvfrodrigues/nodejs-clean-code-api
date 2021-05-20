const config = require('./jest.config') // Serve para definir que para testes unitarios so queremos testar os arquivos com .spec
config.testMatch = ['**/*.spec.ts']
module.exports = config
