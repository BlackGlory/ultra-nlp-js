import { TextRange } from './text-range'
import { isntNull } from '@blackglory/prelude'
import { Jsonable } from 'justypes'

export class Match implements Jsonable<{
  range: TextRange
  indexOfPatterns: number | null
}> {
  constructor(
    private range: TextRange
  , private indexOfPatterns: number | null
  ) {}

  toJSON(): {
    range: TextRange
    indexOfPatterns: number | null
  } {
    return {
      range: this.range
    , indexOfPatterns: this.indexOfPatterns
    }
  }

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
