import { segmentFull } from '@daachorse/segment-fully'
import { StandardDictionary } from '@daachorse/standard-dictionary'
import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('segmentFull', () => {
  test('dictionary', () => {
    const dict = StandardDictionary.create(['你好', '世界'])
  
    const result = segmentFull('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), null)
    , new Match(new TextRange(6, 12), null)
    ])
  })

  test('dictionary with values', () => {
    const dict = StandardDictionary.createWithValues([['你好', 0.5], ['世界', 1.5]])

    const result = segmentFull('你好世界', dict, BehaviorForUnmatched.Ignore)

    expect(result).toEqual([
      new Match(new TextRange(0, 6), 0.5)
    , new Match(new TextRange(6, 12), 1.5)
    ])
  })
})
