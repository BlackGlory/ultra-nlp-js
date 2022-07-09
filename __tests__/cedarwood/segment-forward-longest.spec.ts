import { segmentForwardLongest } from '@cedarwood/segment-forward-longest'
import { ForwardDictionary } from '@cedarwood/forward-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentForwardLongest', () => {
  test('dictionary', () => {
    const dict = ForwardDictionary.create(['你好', '世界'])

    const result = segmentForwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), null)
    , new Match(new TextRange(6, 12), null)
    ])
  })

  test('dictionary with tf-idf', () => {
    const dict = ForwardDictionary.createWithTfIdf([['你好', 0.5], ['世界', 1.5]])

    const result = segmentForwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0.5)
    , new Match(new TextRange(6, 12), 1.5)
    ])
  })
})
