import { TextRange } from '@src/text-range'

describe('TextRange', () => {
  test('len', () => {
    const range = new TextRange(0, 6)

    const result = range.len()

    expect(result).toBe(6)
  })

  describe('extract', () => {
    test('string', () => {
      const range = new TextRange(0, 6)

      const result = range.extract('你好世界')

      expect(result).toBe('你好')
    })

    test('buffer', () => {
      const range = new TextRange(0, 6)
      const buffer = Buffer.from('你好世界', 'utf-8')

      const result = range.extract(buffer)

      expect(result).toBe('你好')
    })
  })
})
