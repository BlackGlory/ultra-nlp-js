import { describe, test, expect } from 'vitest'
import { segmentBackwardLongest } from '@hashmap/segment-backward-longest.js'
import { Dictionary } from '@hashmap/dictionary.js'
import { BehaviorForUnmatched } from '@src/types.js'
import { Match } from '@src/match.js'
import { TextRange } from '@src/text-range.js'

describe('segmentBackwardLongest', () => {
  test('dictionary', () => {
    const dict = new Dictionary(['你好', '世界'])

    const result = segmentBackwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0)
    , new Match(new TextRange(6, 12), 1)
    ])
  })
})
