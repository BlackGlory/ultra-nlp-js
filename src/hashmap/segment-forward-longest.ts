import { BehaviorForUnmatched } from '@src/types.js'
import { addon } from '@src/addon.js'
import { Match } from '@src/match.js'
import { convertIMatchToMatch } from '@src/utils.js'
import { Dictionary } from './dictionary.js'

export function segmentForwardLongest(
  text: string
, dict: Dictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.hashmapSegmentForwardLongest(
    text
  , dict.instance
  , behaviorForUnmatched
  )
  
  return results.map(convertIMatchToMatch)
}
