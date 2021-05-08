// Vai colocando o minimo possivel para poder fazer rodar os testes, quantos mais teste forem feitos, mais será visivel a necessidade de adicionar novas condiçoes, verificaçoes, refatorando o codigo ate o funcionamento total
// Deve primeiro comitar a classe de produção antes dos testes, para nao dar errado por arquivo nao existir

export class SignUpController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
