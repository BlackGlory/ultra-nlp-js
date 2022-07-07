import { IAddon, NativeBackwardDictionary } from './types'

const addon: IAddon = require('../native')

enum BackwardDictionaryConstructorKind {
  Patterns
, PatternsWithTfIdf
}

export class BackwardDictionary {
  instance: NativeBackwardDictionary

  private constructor(
    kind: BackwardDictionaryConstructorKind.Patterns
  , patterns: string[]
  )
  private constructor(
    kind: BackwardDictionaryConstructorKind.PatternsWithTfIdf
  , patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  )
  private constructor(...args:
  | [
      kind: BackwardDictionaryConstructorKind.Patterns
    , patterns: string[]
    ]
  | [
      kind: BackwardDictionaryConstructorKind.PatternsWithTfIdf
    , patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
    ]
  ) {
    const [kind, patterns] = args
    switch (kind) {
      case BackwardDictionaryConstructorKind.Patterns:
        this.instance = addon.createBackwardDictionary(patterns)
        break
      case BackwardDictionaryConstructorKind.PatternsWithTfIdf:
        this.instance = addon.createBackwardDictionaryWithTfIdf(patterns)
        break
      default: throw new Error('Invalid kind')
    }
  }

  static create(patterns: string[]): BackwardDictionary {
    return new BackwardDictionary(
      BackwardDictionaryConstructorKind.Patterns
    , patterns
    )
  }

  static createWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): BackwardDictionary {
    return new BackwardDictionary(
      BackwardDictionaryConstructorKind.PatternsWithTfIdf
    , patternsWithTfIdf
    )
  }
}
