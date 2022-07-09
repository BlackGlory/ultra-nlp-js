import { ForwardDictionary } from '@cedarwood/forward-dictionary'

describe('ForwardDictionary', () => {
  describe('create', () => {
    test('empty patterns', () => {
      const patterns: string[] = []

      ForwardDictionary.create(patterns)
    })

    test('patterns', () => {
      const patterns = ['foo', 'bar']

      ForwardDictionary.create(patterns)
    })
  })

  describe('createWithTfIdf', () => {
    test('create with empty patterns with tf-idf', () => {
      const patterns: Array<[string, number]> = []

      ForwardDictionary.createWithTfIdf(patterns)
    })

    test('create with patterns with tf-idf', () => {
      const patterns: Array<[string, number]> = [['foo', 1], ['bar', 2]]

      ForwardDictionary.createWithTfIdf(patterns)
    })
  })
})
