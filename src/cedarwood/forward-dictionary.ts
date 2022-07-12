import { addon, NativeCedarwoodForwardDictionary } from '@src/addon'

enum ForwardDictionaryConstructorKind {
  Patterns
, PatternsWithValues
}

export class ForwardDictionary {
  instance: NativeCedarwoodForwardDictionary

  private constructor(
    kind: ForwardDictionaryConstructorKind.Patterns
  , patterns: string[]
  )
  private constructor(
    kind: ForwardDictionaryConstructorKind.PatternsWithValues
  , patternsWithValues: Array<[pattern: string, value: number]>
  )
  private constructor(...args:
  | [
      kind: ForwardDictionaryConstructorKind.Patterns
    , patterns: string[]
    ]
  | [
      kind: ForwardDictionaryConstructorKind.PatternsWithValues
    , patternsWithValues: Array<[pattern: string, value: number]>
    ]
  ) {
    const [kind, patterns] = args
    switch (kind) {
      case ForwardDictionaryConstructorKind.Patterns:
        this.instance = addon.cedarwoodCreateForwardDictionary(patterns)
        break
      case ForwardDictionaryConstructorKind.PatternsWithValues:
        this.instance = addon.cedarwoodCreateForwardDictionaryWithValues(patterns)
        break
      default: throw new Error('Invalid kind')
    }
  }

  static create(patterns: string[]): ForwardDictionary {
    return new ForwardDictionary(
      ForwardDictionaryConstructorKind.Patterns
    , patterns
    )
  }

  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): ForwardDictionary {
    return new ForwardDictionary(
      ForwardDictionaryConstructorKind.PatternsWithValues
    , patternsWithValues
    )
  }
}
