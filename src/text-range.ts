import { Jsonable } from 'justypes'
import { isString } from '@blackglory/prelude'

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

  extract(bufferUTF8: Buffer): string
  extract(text: string): string
  extract(val: Buffer | string): string {
    const buffer = isString(val)
                 ? Buffer.from(val, 'utf-8')
                 : val

    return buffer
      .slice(this.startIndex, this.endIndex)
      .toString('utf-8')
  }
}
