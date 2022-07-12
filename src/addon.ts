export type NativeCedarwoodForwardDictionary = unknown
export type NativeCedarwoodBackwardDictionary = unknown

export type NativeDaachorseStandardDictionary = unknown
export type NativeDaachorseForwardDictionary = unknown
export type NativeDaachorseBackwardDictionary = unknown

export interface IMatch {
  range: ITextRange
  value: number | null
}

interface ITextRange {
  startIndex: number
  endIndex: number
}

interface IAddon {
  BehaviorForUnmatched: {
    Ignore: number
    KeepAsWords: number
    KeepAsChars: number
  }

  // extractKeywords(matches: IMatch[], top: number): IMatch[]

  cedarwoodCreateForwardDictionary(patterns: string[]): NativeCedarwoodForwardDictionary
  cedarwoodCreateForwardDictionaryWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): NativeCedarwoodForwardDictionary

  cedarwoodCreateBackwardDictionary(patterns: string[]): NativeCedarwoodBackwardDictionary
  cedarwoodCreateBackwardDictionaryWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): NativeCedarwoodBackwardDictionary

  cedarwoodSegmentFully(
    text: string
  , dict: NativeCedarwoodForwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  cedarwoodSegmentForwardLongest(
    text: string
  , dict: NativeCedarwoodForwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  cedarwoodSegmentBackwardLongest(
    text: string
  , dict: NativeCedarwoodBackwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  cedarwoodSegmentBidirectionalLongest(
    text: string
  , forwardDict: NativeCedarwoodForwardDictionary
  , backwardDict: NativeCedarwoodBackwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  daachorseCreateStandardDictionary(patterns: string[]): NativeDaachorseStandardDictionary
  daachorseCreateStandardDictionaryWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): NativeDaachorseStandardDictionary

  daachorseCreateForwardDictionary(patterns: string[]): NativeDaachorseForwardDictionary
  daachorseCreateForwardDictionaryWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): NativeDaachorseForwardDictionary

  daachorseCreateBackwardDictionary(patterns: string[]): NativeDaachorseBackwardDictionary
  daachorseCreateBackwardDictionaryWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): NativeDaachorseBackwardDictionary

  daachorseSegmentFully(
    text: string
  , dict: NativeDaachorseStandardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  daachorseSegmentForwardLongest(
    text: string
  , dict: NativeDaachorseForwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  daachorseSegmentBackwardLongest(
    text: string
  , dict: NativeDaachorseBackwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  daachorseSegmentBidirectionalLongest(
    text: string
  , forwardDict: NativeDaachorseForwardDictionary
  , backwardDict: NativeDaachorseBackwardDictionary
  , behaviorForUnmatched: number
  ): IMatch[]
}

export const addon: IAddon = require('../native')
