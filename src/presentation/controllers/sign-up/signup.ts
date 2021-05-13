// O projeto começa na criação do controller de SignUp para lidarmos com a chegada de informação das requicições, para depois irmos para lidar com os casos de uso da aplicação
import { AddAccount, Controller, EmailValidator, HttpRequest, HttpResponse } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
// Vai colocando o minimo possivel para poder fazer rodar os testes, quantos mais teste forem feitos, mais será visivel a necessidade de adicionar novas condiçoes, verificaçoes, refatorando o codigo ate o funcionamento total
// Deve primeiro comitar a classe de produção antes dos testes, para nao dar errado por arquivo nao existir

export class SignUpController implements Controller { // Uma classe implementa uma interface
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({ name, email, password })

      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      return serverError()
    }
  }
}
