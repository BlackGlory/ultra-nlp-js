import { IMatch } from './addon.js'
import { TextRange } from './text-range.js'
import { Match } from './match.js'

export function convertIMatchToMatch(match: IMatch): Match {
  return new Match(
    new TextRange(match.range.startIndex, match.range.endIndex)
  , match.indexOfPatterns
  )
}
