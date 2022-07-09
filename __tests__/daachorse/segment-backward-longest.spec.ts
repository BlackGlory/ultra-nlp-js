import { segmentBackwardLongest } from '@daachorse/segment-backward-longest'
import { BackwardDictionary } from '@daachorse/backward-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentBackwardLongest', () => {
  test('dictionary', () => {
    const dict = BackwardDictionary.create(['你好', '世界'])

    const result = segmentBackwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), null)
    , new Match(new TextRange(6, 12), null)
    ])
  })

  test('dictionary with tf-idf', () => {
    const dict = BackwardDictionary.createWithTfIdf([['你好', 0.5], ['世界', 1.5]])

    const result = segmentBackwardLongest('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0.5)
    , new Match(new TextRange(6, 12), 1.5)
    ])
  })
})
