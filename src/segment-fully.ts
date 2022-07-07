import { IAddon, BehaviorForUnmatched } from './types'
import { Match } from './match'
import { convertIMatchToMatch } from './utils'
import { StandardDictionary } from './standard-dictionary'

const addon: IAddon = require('../native')

export function segmentFull(
  text: string
, dict: StandardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[] {
  const results = addon.segmentFully(
    text
  , dict.instance
  , behaviorForUnmatched
  )

  return results.map(convertIMatchToMatch)
}
