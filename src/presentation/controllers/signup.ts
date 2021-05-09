import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
// Vai colocando o minimo possivel para poder fazer rodar os testes, quantos mais teste forem feitos, mais será visivel a necessidade de adicionar novas condiçoes, verificaçoes, refatorando o codigo ate o funcionamento total
// Deve primeiro comitar a classe de produção antes dos testes, para nao dar errado por arquivo nao existir

export class SignUpController implements Controller { // Uma classe implementa uma interface
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'))
    }

    return {
      statusCode: 200,
      body: { ok: 'Ok' }
    }
  }
}
