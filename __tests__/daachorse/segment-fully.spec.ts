import { describe, test, expect } from 'vitest'
import { segmentFull } from '@daachorse/segment-fully.js'
import { StandardDictionary } from '@daachorse/standard-dictionary.js'
import { BehaviorForUnmatched } from '@src/types.js'
import { Match } from '@src/match.js'
import { TextRange } from '@src/text-range.js'

describe('segmentFull', () => {
  test('dictionary', () => {
    const dict = new StandardDictionary(['你好', '世界'])
  
    const result = segmentFull('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0)
    , new Match(new TextRange(6, 12), 1)
    ])
  })
})
