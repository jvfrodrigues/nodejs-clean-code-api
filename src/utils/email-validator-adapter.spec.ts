import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({ // NAO IMPORTA PARA A GENTE O FUNCIONAMENTO REAL DA LIB MAS QUEREMOS QUE QUANDO DE TRUE DE BOM E QUANDO DER FALSE DER RUIM SO ISSO POR ISSO PODEMOS MOCKAR A FUNCAO
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => { // O utils que olha para a presentation, invertendo as dependencias
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid-email@mail.com')
    expect(isValid).toBe(true)
  })
})
