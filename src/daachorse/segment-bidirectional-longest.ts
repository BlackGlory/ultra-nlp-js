import { BehaviorForUnmatched } from '@src/types.js'
import { addon } from '@src/addon.js'
import { Match } from '@src/match.js'
import { convertIMatchToMatch } from '@src/utils.js'
import { ForwardDictionary } from './forward-dictionary.js'
import { BackwardDictionary } from './backward-dictionary.js'

export function segmentBidirectionalLongest(
  text: string
, forwardDict: ForwardDictionary
, backwardDict: BackwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.daachorseSegmentBidirectionalLongest(
    text
  , forwardDict.instance
  , backwardDict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
