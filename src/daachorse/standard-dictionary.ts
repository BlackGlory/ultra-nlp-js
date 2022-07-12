import { addon, NativeDaachorseStandardDictionary } from '@src/addon'

enum StandardDictionaryConstructorKind {
  Patterns
, PatternsWithValues
}

export class StandardDictionary {
  instance: NativeDaachorseStandardDictionary

  private constructor(
    kind: StandardDictionaryConstructorKind.Patterns
  , patterns: string[]
  )
  private constructor(
    kind: StandardDictionaryConstructorKind.PatternsWithValues
  , patternsWithValues: Array<[pattern: string, value: number]>
  )
  private constructor(...args:
  | [
      kind: StandardDictionaryConstructorKind.Patterns
    , patterns: string[]
    ]
  | [
      kind: StandardDictionaryConstructorKind.PatternsWithValues
    , patternsWithValues: Array<[pattern: string, value: number]>
    ]
  ) {
    const [kind, patterns] = args
    switch (kind) {
      case StandardDictionaryConstructorKind.Patterns:
        this.instance = addon.daachorseCreateStandardDictionary(patterns)
        break
      case StandardDictionaryConstructorKind.PatternsWithValues:
        this.instance = addon.daachorseCreateStandardDictionaryWithValues(patterns)
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

  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): StandardDictionary {
    return new StandardDictionary(
      StandardDictionaryConstructorKind.PatternsWithValues
    , patternsWithValues
    )
  }
}
