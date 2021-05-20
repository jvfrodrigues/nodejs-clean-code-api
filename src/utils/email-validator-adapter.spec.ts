import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => { // O utils que olha para a presentation, invertendo as dependencias
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid-email@mail.com')
    expect(isValid).toBe(false)
  })
})
