import { BackwardDictionary } from '@daachorse/backward-dictionary'
import { getError } from 'return-style'

describe('BackwardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      const err = getError(() => BackwardDictionary.create(patterns))

      expect(err).not.toBeUndefined()
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      BackwardDictionary.create(patterns)
    })
  })

  describe('createWithValues', () => {
    test('create with empty patterns with values', () => {
      const patterns: Array<[string, number]> = []

      const err = getError(() => BackwardDictionary.createWithValues(patterns))

      expect(err).not.toBeUndefined()
    })

    test('create with patterns with values', () => {
      const patterns: Array<[string, number]> = [['foo', 1], ['bar', 2]]

      BackwardDictionary.createWithValues(patterns)
    })
  })
})
