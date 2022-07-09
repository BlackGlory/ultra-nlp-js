import { BehaviorForUnmatched } from '@src/types'
import { Match } from '@src/match'
import { convertIMatchToMatch } from '@src/utils'
import { ForwardDictionary } from './forward-dictionary'
import { addon } from '@src/addon'

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
