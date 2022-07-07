import { segmentBidirectionalLongest } from '@src/segment-bidirectional-longest'
import { ForwardDictionary } from '@src/forward-dictionary'
import { BackwardDictionary } from '@src/backward-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentBidirectionalLongest', () => {
  test('dictionary', () => {
    const patterns = ['你好', '世界']
    const forwardDict = ForwardDictionary.create(patterns)
    const backwardDict = BackwardDictionary.create(patterns)

    const result = segmentBidirectionalLongest(
      '你好世界'
    , forwardDict
    , backwardDict
    , BehaviorForUnmatched.Ignore
    )

    expect(result).toEqual([
      new Match(new TextRange(0, 6), null)
    , new Match(new TextRange(6, 12), null)
    ])
  })

  test('dictionary with tf-idf', () => {
    const patternsWithTfIdf: Array<[string, number]>= [['你好', 0.5], ['世界', 1.5]]
    const forwardDict = ForwardDictionary.createWithTfIdf(patternsWithTfIdf)
    const backwardDict = BackwardDictionary.createWithTfIdf(patternsWithTfIdf)

    const result = segmentBidirectionalLongest(
      '你好世界'
    , forwardDict
    , backwardDict
    , BehaviorForUnmatched.Ignore
    )

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0.5)
    , new Match(new TextRange(6, 12), 1.5)
    ])
  })
})
