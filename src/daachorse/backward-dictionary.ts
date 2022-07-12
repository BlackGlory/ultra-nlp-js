import { addon, NativeDaachorseBackwardDictionary } from '@src/addon'

enum BackwardDictionaryConstructorKind {
  Patterns
, PatternsWithValues
}

export class BackwardDictionary {
  instance: NativeDaachorseBackwardDictionary

  private constructor(
    kind: BackwardDictionaryConstructorKind.Patterns
  , patterns: string[]
  )
  private constructor(
    kind: BackwardDictionaryConstructorKind.PatternsWithValues
  , patternsWithValues: Array<[pattern: string, value: number]>
  )
  private constructor(...args:
  | [
      kind: BackwardDictionaryConstructorKind.Patterns
    , patterns: string[]
    ]
  | [
      kind: BackwardDictionaryConstructorKind.PatternsWithValues
    , patternsWithValues: Array<[pattern: string, value: number]>
    ]
  ) {
    const [kind, patterns] = args
    switch (kind) {
      case BackwardDictionaryConstructorKind.Patterns:
        this.instance = addon.daachorseCreateBackwardDictionary(patterns)
        break
      case BackwardDictionaryConstructorKind.PatternsWithValues:
        this.instance = addon.daachorseCreateBackwardDictionaryWithValues(patterns)
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

  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): BackwardDictionary {
    return new BackwardDictionary(
      BackwardDictionaryConstructorKind.PatternsWithValues
    , patternsWithValues
    )
  }
}
