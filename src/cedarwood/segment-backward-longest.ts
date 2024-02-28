import { BehaviorForUnmatched } from '@src/types.js'
import { addon } from '@src/addon.js'
import { Match } from '@src/match.js'
import { convertIMatchToMatch } from '@src/utils.js'
import { BackwardDictionary } from './backward-dictionary.js'

export function segmentBackwardLongest(
  text: string
, dict: BackwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.cedarwoodSegmentBackwardLongest(
    text
  , dict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
