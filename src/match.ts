import { TextRange } from './text-range'

export class Match {
  constructor(
    private range: TextRange
  , private value: number | null
  ) {}

  getRange(): TextRange {
    return this.range
  }

  getValue(): number | null {
    return this.value
  }
}
