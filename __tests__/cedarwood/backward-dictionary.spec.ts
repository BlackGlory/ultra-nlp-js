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

  describe('createWithTfIdf', () => {
    test('create with empty patterns with tf-idf', () => {
      const patterns: Array<[string, number]> = []

      BackwardDictionary.createWithTfIdf(patterns)
    })

    test('create with patterns with tf-idf', () => {
      const patterns: Array<[string, number]> = [['foo', 1], ['bar', 2]]

      BackwardDictionary.createWithTfIdf(patterns)
    })
  })
})
