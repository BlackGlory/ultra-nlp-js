import { lazy } from 'extra-lazy'

const getEncoder = lazy(() => new TextEncoder())
const getDecoder = lazy(() => new TextDecoder())

export class TextRange {
  /**
   * @param startIndex byte index
   * @param endIndex byte index
   */
  constructor(
    private startIndex: number
  , private endIndex: number
  ) {}

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
