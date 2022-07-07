import { extractKeywords } from '@src/extract-keywords'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('extractKeywords', () => {
  test('matches more than top', () => {
    const matches = [
      new Match(new TextRange(0, 6), 0.5)
    , new Match(new TextRange(6, 12), 1.5)
    ]

    const result = extractKeywords(matches, 1)

    expect(result).toEqual([
      new Match(new TextRange(6, 12), 1.5)
    ])
  })

  test('matches less than top', () => {
    const matches = [
      new Match(new TextRange(0, 6), 0.5)
    , new Match(new TextRange(6, 12), 1.5)
    ]

    const result = extractKeywords(matches, 3)

    expect(result).toEqual([
      new Match(new TextRange(6, 12), 1.5)
    , new Match(new TextRange(0, 6), 0.5)
    ])
  })
})
