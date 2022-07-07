import { Match } from './match'

export function extractKeywords(matches: Match[], top: number): Match[] {
  const results = matches.sort((a, b) => {
    return (b.getTfIdf() ?? Number.MIN_VALUE)
         - (a.getTfIdf() ?? Number.MIN_VALUE)
  }).slice(0, top)

  return results
}
