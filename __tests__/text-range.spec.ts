import { TextRange } from '@src/text-range'

describe('TextRange', () => {
  test('len', () => {
    const range = new TextRange(0, 6)

    const result = range.len()

    expect(result).toBe(6)
  })

  test('text', () => {
    const range = new TextRange(0, 6)

    const result = range.extract('你好世界')

    expect(result).toBe('你好')
  })
})
