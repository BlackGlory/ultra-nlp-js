import { BehaviorForUnmatched } from '@src/types'
import { addon } from '@src/addon'
import { Match } from '@src/match'
import { convertIMatchToMatch } from '@src/utils'
import { Dictionary } from './dictionary'

export function segmentBackwardLongest(
  text: string
, dict: Dictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.hashmapSegmentBackwardLongest(
    text
  , dict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
