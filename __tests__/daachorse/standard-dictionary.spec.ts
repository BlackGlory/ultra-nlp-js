import { StandardDictionary } from '@daachorse/standard-dictionary'
import { getError } from 'return-style'

describe('StandardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      const err = getError(() => new StandardDictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('same patterns', () => {
      const patterns = ['foo', 'foo']

      const err = getError(() => new StandardDictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      new StandardDictionary(patterns)
    })
  })
})
