import { ForwardDictionary } from '@src/forward-dictionary'
import { getError } from 'return-style'

describe('ForwardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      const err = getError(() => ForwardDictionary.create(patterns))

      expect(err).not.toBeUndefined()
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      ForwardDictionary.create(patterns)
    })
  })

  describe('createWithTfIdf', () => {
    test('create with empty patterns with tf-idf', () => {
      const patterns: Array<[string, number]> = []

      const err = getError(() => ForwardDictionary.createWithTfIdf(patterns))

      expect(err).not.toBeUndefined()
    })

    test('create with patterns with tf-idf', () => {
      const patterns: Array<[string, number]> = [['foo', 1], ['bar', 2]]

      ForwardDictionary.createWithTfIdf(patterns)
    })
  })
})
