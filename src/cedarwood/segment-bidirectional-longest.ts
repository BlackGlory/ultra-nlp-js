import { BehaviorForUnmatched } from '@src/types'
import { addon } from '@src/addon'
import { Match } from '@src/match'
import { convertIMatchToMatch } from '@src/utils'
import { ForwardDictionary } from './forward-dictionary'
import { BackwardDictionary } from './backward-dictionary'

export function segmentBidirectionalLongest(
  text: string
, forwardDict: ForwardDictionary
, backwardDict: BackwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.cedarwoodSegmentBidirectionalLongest(
    text
  , forwardDict.instance
  , backwardDict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
