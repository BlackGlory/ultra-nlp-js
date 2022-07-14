import { TextRange } from './text-range'
import { isntNull } from '@blackglory/prelude'

export class Match {
  constructor(
    private range: TextRange
  , private indexOfPatterns: number | null
  ) {}

  getRange(): TextRange {
    return this.range
  }

  getIndexOfPatterns(): number | null {
    return this.indexOfPatterns
  }

  getValueFrom<T>(map: Record<number, T>): T | null {
    if (isntNull(this.indexOfPatterns)) {
      if (this.indexOfPatterns in map) return map[this.indexOfPatterns]
    }
    return null
  }
}
