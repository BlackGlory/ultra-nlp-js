import { BehaviorForUnmatched } from '@src/types.js'
import { Match } from '@src/match.js'
import { convertIMatchToMatch } from '@src/utils.js'
import { ForwardDictionary } from './forward-dictionary.js'
import { addon } from '@src/addon.js'

export function segmentForwardLongest(
  text: string
, dict: ForwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.daachorseSegmentForwardLongest(
    text
  , dict.instance
  , behaviorForUnmatched
  )
  
  return results.map(convertIMatchToMatch)
}
