import { addon, NativeCedarwoodBackwardDictionary } from '@src/addon'

enum BackwardDictionaryConstructorKind {
  Patterns
, PatternsWithTfIdf
}

export class BackwardDictionary {
  instance: NativeCedarwoodBackwardDictionary

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
        this.instance = addon.cedarwoodCreateBackwardDictionary(patterns)
        break
      case BackwardDictionaryConstructorKind.PatternsWithTfIdf:
        this.instance = addon.cedarwoodCreateBackwardDictionaryWithTfIdf(patterns)
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
