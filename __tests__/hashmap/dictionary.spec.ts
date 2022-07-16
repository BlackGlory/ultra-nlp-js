import { Dictionary } from '@hashmap/dictionary'
import { getError } from 'return-style'

describe('Dictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      const err = getError(() => new Dictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('same patterns', () => {
      const patterns = ['foo', 'foo']

      const err = getError(() => new Dictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      new Dictionary(patterns)
    })
  })
})
