import { segmentForwardLongest } from '@hashmap/segment-forward-longest'
import { Dictionary } from '@hashmap/dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentForwardLongest', () => {
  test('dictionary', () => {
    const dict = new Dictionary(['你好', '世界'])

    const result = segmentForwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0)
    , new Match(new TextRange(6, 12), 1)
    ])
  })
})
