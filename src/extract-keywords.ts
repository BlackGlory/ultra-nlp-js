import { Match } from './match'

export function extractKeywords(matches: Match[], top: number): Match[] {
  const results = matches.sort((a, b) => {
    return (b.getValue() ?? Number.MIN_VALUE)
         - (a.getValue() ?? Number.MIN_VALUE)
  }).slice(0, top)

  return results
}
