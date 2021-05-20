import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({ // NAO IMPORTA PARA A GENTE O FUNCIONAMENTO REAL DA LIB MAS QUEREMOS QUE QUANDO DE TRUE DE BOM E QUANDO DER FALSE DER RUIM SO ISSO POR ISSO PODEMOS MOCKAR A FUNCAO
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => { // O utils que olha para a presentation, invertendo as dependencias
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid-email@mail.com')
    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any-email@mail.com')
    expect(isEmailSpy).toBeCalledWith('any-email@mail.com')
  })
})
