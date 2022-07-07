import { IAddon, NativeStandardDictionary } from './types'

const addon: IAddon = require('../native')

enum StandardDictionaryConstructorKind {
  Patterns
, PatternsWithTfIdf
}

export class StandardDictionary {
  instance: NativeStandardDictionary

  private constructor(
    kind: StandardDictionaryConstructorKind.Patterns
  , patterns: string[]
  )
  private constructor(
    kind: StandardDictionaryConstructorKind.PatternsWithTfIdf
  , patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  )
  private constructor(...args:
  | [
      kind: StandardDictionaryConstructorKind.Patterns
    , patterns: string[]
    ]
  | [
      kind: StandardDictionaryConstructorKind.PatternsWithTfIdf
    , patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
    ]
  ) {
    const [kind, patterns] = args
    switch (kind) {
      case StandardDictionaryConstructorKind.Patterns:
        this.instance = addon.createStandardDictionary(patterns)
        break
      case StandardDictionaryConstructorKind.PatternsWithTfIdf:
        this.instance = addon.createStandardDictionaryWithTfIdf(patterns)
        break
      default: throw new Error('Invalid kind')
    }
  }

  static create(patterns: string[]): StandardDictionary {
    return new StandardDictionary(
      StandardDictionaryConstructorKind.Patterns
    , patterns
    )
  }

  static createWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): StandardDictionary {
    return new StandardDictionary(
      StandardDictionaryConstructorKind.PatternsWithTfIdf
    , patternsWithTfIdf
    )
  }
}
