import { BehaviorForUnmatched } from '@src/types'
import { addon } from '@src/addon'
import { Match } from '@src/match'
import { convertIMatchToMatch } from '@src/utils'
import { BackwardDictionary } from './backward-dictionary'

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
