import { BackwardDictionary } from '@cedarwood/backward-dictionary'
import { getError } from 'return-style'

describe('BackwardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      const err = getError(() => new BackwardDictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('same patterns', () => {
      const patterns = ['foo', 'foo']

      const err = getError(() => new BackwardDictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      new BackwardDictionary(patterns)
    })
  })
})
