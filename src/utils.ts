import { IMatch } from './addon'
import { TextRange } from './text-range'
import { Match } from './match'

export function convertIMatchToMatch(match: IMatch): Match {
  return new Match(
    new TextRange(match.range.startIndex, match.range.endIndex)
  , match.tfIdf
  )
}
