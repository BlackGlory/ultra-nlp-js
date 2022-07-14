import { segmentFull } from '@cedarwood/segment-fully'
import { ForwardDictionary } from '@cedarwood/forward-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentFull', () => {
  test('dictionary', () => {
    const dict = new ForwardDictionary(['你好', '世界'])
  
    const result = segmentFull('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0)
    , new Match(new TextRange(6, 12), 1)
    ])
  })
})
