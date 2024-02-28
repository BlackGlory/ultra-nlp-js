import { BehaviorForUnmatched } from '@src/types.js'
import { Match } from '@src/match.js'
import { convertIMatchToMatch } from '@src/utils.js'
import { StandardDictionary } from './standard-dictionary.js'
import { addon } from '@src/addon.js'

export function segmentFull(
  text: string
, dict: StandardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.daachorseSegmentFully(
    text
  , dict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
