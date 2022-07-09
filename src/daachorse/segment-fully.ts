import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { convertIMatchToMatch } from '@src/utils'
import { StandardDictionary } from './standard-dictionary'
import { addon } from '@src/addon'

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
