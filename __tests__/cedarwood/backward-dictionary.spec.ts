import { BackwardDictionary } from '@cedarwood/backward-dictionary'

describe('BackwardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      BackwardDictionary.create(patterns)
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      BackwardDictionary.create(patterns)
    })
  })

  describe('createWithValues', () => {
    test('create with empty patterns with values', () => {
      const patterns: Array<[string, number]> = []

      BackwardDictionary.createWithValues(patterns)
    })

    test('create with patterns with values', () => {
      const patterns: Array<[string, number]> = [['foo', 1], ['bar', 2]]

      BackwardDictionary.createWithValues(patterns)
    })
  })
})
