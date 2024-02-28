import { TextRange } from './text-range.js'
import { isntNull } from '@blackglory/prelude'
import { JSONSerializable } from 'justypes'

export class Match implements JSONSerializable<{
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
