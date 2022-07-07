import { IAddon, BehaviorForUnmatched } from './types'
import { Match } from './match'
import { convertIMatchToMatch } from './utils'
import { BackwardDictionary } from './backward-dictionary'

const addon: IAddon = require('../native')

export function segmentBackwardLongest(
  text: string
, dict: BackwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.segmentBackwardLongest(
    text
  , dict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
