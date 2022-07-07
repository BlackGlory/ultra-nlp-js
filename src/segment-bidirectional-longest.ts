import { IAddon, BehaviorForUnmatched } from './types'
import { Match } from './match'
import { convertIMatchToMatch } from './utils'
import { ForwardDictionary } from './forward-dictionary'
import { BackwardDictionary } from './backward-dictionary'

const addon: IAddon = require('../native')

export function segmentBidirectionalLongest(
  text: string
, forwardDict: ForwardDictionary
, backwardDict: BackwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.segmentBidirectionalLongest(
    text
  , forwardDict.instance
  , backwardDict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
