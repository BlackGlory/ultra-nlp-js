import { BehaviorForUnmatched } from '@src/types.js'
import { addon } from '@src/addon.js'
import { Match } from '@src/match.js'
import { convertIMatchToMatch } from '@src/utils.js'
import { ForwardDictionary } from './forward-dictionary.js'

export function segmentFull(
  text: string
, dict: ForwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.cedarwoodSegmentFully(
    text
  , dict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
