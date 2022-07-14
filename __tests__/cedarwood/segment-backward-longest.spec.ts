import { segmentBackwardLongest } from '@cedarwood/segment-backward-longest'
import { BackwardDictionary } from '@cedarwood/backward-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentBackwardLongest', () => {
  test('dictionary', () => {
    const dict = new BackwardDictionary(['你好', '世界'])

    const result = segmentBackwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0)
    , new Match(new TextRange(6, 12), 1)
    ])
  })
})
