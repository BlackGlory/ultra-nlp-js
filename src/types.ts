export type NativeStandardDictionary = unknown
export type NativeForwardDictionary = unknown
export type NativeBackwardDictionary = unknown

export enum BehaviorForUnmatched {
  Ignore
, KeepAsWords
, KeepAsChars
}

export interface IMatch {
  range: ITextRange
  tfIdf: number | null
}

export interface ITextRange {
  startIndex: number
  endIndex: number
}

export interface IAddon {
  BehaviorForUnmatched: {
    Ignore: number
    KeepAsWords: number
    KeepAsChars: number
  }

  createStandardDictionary(patterns: string[]): NativeStandardDictionary
  createStandardDictionaryWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): NativeStandardDictionary

  createForwardDictionary(patterns: string[]): NativeForwardDictionary
  createForwardDictionaryWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): NativeForwardDictionary

  createBackwardDictionary(patterns: string[]): NativeBackwardDictionary
  createBackwardDictionaryWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): NativeBackwardDictionary

  segmentFully(
    text: string
  , dict: NativeStandardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  segmentForwardLongest(
    text: string
  , dict: NativeForwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  segmentBackwardLongest(
    text: string
  , dict: NativeBackwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  segmentBidirectionalLongest(
    text: string
  , forwardDict: NativeForwardDictionary
  , backwardDict: NativeBackwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  extractKeywords(matches: IMatch[], top: number): IMatch[]
}
