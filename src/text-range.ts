import { Jsonable } from 'justypes'

export class TextRange implements Jsonable<{
  startIndex: number
  endIndex: number
}> {
  /**
   * @param startIndex byte index
   * @param endIndex byte index
   */
  constructor(
    private startIndex: number
  , private endIndex: number
  ) {}

  toJSON(): {
    startIndex: number
    endIndex: number
  } {
    return {
      startIndex: this.startIndex
    , endIndex: this.endIndex
    }
  }

  /**
   * @returns byte index
   */
  getStartIndex(): number {
    return this.startIndex
  }

  /**
   * @returns byte index
   */
  getEndIndex(): number {
    return this.endIndex
  }

  /**
   * @returns byte length
   */
  len(): number {
    return this.endIndex - this.startIndex
  }

  extract(text: string): string {
    return Buffer.from(text, 'utf-8')
      .slice(this.startIndex, this.endIndex)
      .toString()
  }
}
