import { TextRange } from './text-range'

export class Match {
  constructor(
    private range: TextRange
  , private tfIdf: number | null
  ) {}

  getRange(): TextRange {
    return this.range
  }

  getTfIdf(): number | null {
    return this.tfIdf
  }
}
