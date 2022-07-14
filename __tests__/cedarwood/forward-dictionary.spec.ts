import { ForwardDictionary } from '@cedarwood/forward-dictionary'
import { getError } from 'return-style'

describe('ForwardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      const err = getError(() => new ForwardDictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('same patterns', () => {
      const patterns = ['foo', 'foo']

      const err = getError(() => new ForwardDictionary(patterns))

      expect(err).not.toBeUndefined()
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      new ForwardDictionary(patterns)
    })
  })
})
