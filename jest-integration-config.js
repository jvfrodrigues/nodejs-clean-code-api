const config = require('./jest.config') // Serve para definir que para testes de integracao so queremos testar os arquivos com .test
config.testMatch = ['**/*.test.ts']
module.exports = config
