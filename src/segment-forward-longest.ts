import { IAddon, BehaviorForUnmatched } from './types'
import { Match } from './match'
import { convertIMatchToMatch } from './utils'
import { ForwardDictionary } from './forward-dictionary'

const addon: IAddon = require('../native')

export function segmentForwardLongest(
  text: string
, dict: ForwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.segmentForwardLongest(
    text
  , dict.instance
  , behaviorForUnmatched
  )
  
  return results.map(convertIMatchToMatch)
}
