import { addon, NativeCedarwoodForwardDictionary } from '@src/addon'

enum ForwardDictionaryConstructorKind {
  Patterns
, PatternsWithTfIdf
}

export class ForwardDictionary {
  instance: NativeCedarwoodForwardDictionary

  private constructor(
    kind: ForwardDictionaryConstructorKind.Patterns
  , patterns: string[]
  )
  private constructor(
    kind: ForwardDictionaryConstructorKind.PatternsWithTfIdf
  , patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  )
  private constructor(...args:
  | [
      kind: ForwardDictionaryConstructorKind.Patterns
    , patterns: string[]
    ]
  | [
      kind: ForwardDictionaryConstructorKind.PatternsWithTfIdf
    , patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
    ]
  ) {
    const [kind, patterns] = args
    switch (kind) {
      case ForwardDictionaryConstructorKind.Patterns:
        this.instance = addon.cedarwoodCreateForwardDictionary(patterns)
        break
      case ForwardDictionaryConstructorKind.PatternsWithTfIdf:
        this.instance = addon.cedarwoodCreateForwardDictionaryWithTfIdf(patterns)
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

  static createWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): ForwardDictionary {
    return new ForwardDictionary(
      ForwardDictionaryConstructorKind.PatternsWithTfIdf
    , patternsWithTfIdf
    )
  }
}
