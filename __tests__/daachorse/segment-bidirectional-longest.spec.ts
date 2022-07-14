import { segmentBidirectionalLongest } from '@daachorse/segment-bidirectional-longest'
import { ForwardDictionary } from '@daachorse/forward-dictionary'
import { BackwardDictionary } from '@daachorse/backward-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentBidirectionalLongest', () => {
  test('dictionary', () => {
    const patterns = ['你好', '世界']
    const forwardDict = new ForwardDictionary(patterns)
    const backwardDict = new BackwardDictionary(patterns)

    const result = segmentBidirectionalLongest(
      '你好世界'
    , forwardDict
    , backwardDict
    , BehaviorForUnmatched.Ignore
    )

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0)
    , new Match(new TextRange(6, 12), 1)
    ])
  })
})
