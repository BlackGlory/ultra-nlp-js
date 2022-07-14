import { segmentForwardLongest } from '@daachorse/segment-forward-longest'
import { ForwardDictionary } from '@daachorse/forward-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentForwardLongest', () => {
  test('dictionary', () => {
    const dict = new ForwardDictionary(['你好', '世界'])

    const result = segmentForwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0)
    , new Match(new TextRange(6, 12), 1)
    ])
  })
})
