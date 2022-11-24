import { lazy } from 'extra-lazy'
import { Jsonable } from 'justypes'

const getEncoder = lazy(() => new TextEncoder())
const getDecoder = lazy(() => new TextDecoder())

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
    const utf8Array = getEncoder().encode(text).slice(0, 6)
    return getDecoder().decode(utf8Array)
  }
}
