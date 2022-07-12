import { StandardDictionary } from '@daachorse/standard-dictionary'
import { getError } from 'return-style'

describe('StandardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      const err = getError(() => StandardDictionary.create(patterns))

      expect(err).not.toBeUndefined()
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      StandardDictionary.create(patterns)
    })
  })

  describe('createWithValues', () => {
    test('create with empty patterns with values', () => {
      const patterns: Array<[string, number]> = []

      const err = getError(() => StandardDictionary.createWithValues(patterns))

      expect(err).not.toBeUndefined()
    })

    test('create with patterns with values', () => {
      const patterns: Array<[string, number]> = [['foo', 1], ['bar', 2]]

      StandardDictionary.createWithValues(patterns)
    })
  })
})
