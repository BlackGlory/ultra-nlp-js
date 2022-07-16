export type NativeCedarwoodForwardDictionary = unknown
export type NativeCedarwoodBackwardDictionary = unknown

export type NativeDaachorseStandardDictionary = unknown
export type NativeDaachorseForwardDictionary = unknown
export type NativeDaachorseBackwardDictionary = unknown

export type NativeHashmapDictionary = unknown

export interface IMatch {
  range: ITextRange
  indexOfPatterns: number | null
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

  cedarwoodCreateForwardDictionary(patterns: string[]): NativeCedarwoodForwardDictionary
  cedarwoodCreateBackwardDictionary(patterns: string[]): NativeCedarwoodBackwardDictionary

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
  daachorseCreateForwardDictionary(patterns: string[]): NativeDaachorseForwardDictionary
  daachorseCreateBackwardDictionary(patterns: string[]): NativeDaachorseBackwardDictionary

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

  hashmapCreateDictionary(patterns: string[]): NativeHashmapDictionary

  hashmapSegmentFully(
    text: string
  , dict: NativeHashmapDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  hashmapSegmentForwardLongest(
    text: string
  , dict: NativeHashmapDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  hashmapSegmentBackwardLongest(
    text: string
  , dict: NativeHashmapDictionary
  , behaviorForUnmatched: number
  ): IMatch[]

  hashmapSegmentBidirectionalLongest(
    text: string
  , dict: NativeHashmapDictionary
  , behaviorForUnmatched: number
  ): IMatch[]
}

export const addon: IAddon = require('../native')
