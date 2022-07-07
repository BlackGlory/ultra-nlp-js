# ultra-nlp-js
A [ultra-nlp] binding for Node.js.

[ultra-nlp]: https://crates.io/crates/ultra-nlp

## Install
```sh
npm install --save ultra-nlp-js
# or
yarn add ultra-nlp-js
```

## API
### Dictionary
#### StandardDictionary
```ts
class StandardDictionary {
  instance: NativeStandardDictionary

  static create(patterns: string[]): StandardDictionary
  static createWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): StandardDictionary
}
```

#### ForwardDictionary
```ts
class ForwardDictionary {
  instance: NativeFowardDictionary

  static create(patterns: string[]): ForwardDictionary
  static createWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): ForwardDictionary
}
```

#### BackwardDictionary
```ts
class BackwardDictionary {
  instance: NativeFowardDictionary

  static create(patterns: string[]): BackwardDictionary
  static createWithTfIdf(
    patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
  ): BackwardDictionary
}
```

### Segmenter
```ts
enum BehaviorForUnmatched {
  Ignore
, KeepAsWords
, KeepAsChars
}
```

#### segmentFull
```ts
function segmentFull(
  text: string
, dict: StandardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```

#### segmentForwardLongest
```ts
function segmentForwardLongest(
  text: string
, dict: ForwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```

#### segmentBackwardLongest
```ts
function segmentBackwardLongest(
  text: string
, dict: BackwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```

#### segmentBidirectionalLongest
```ts
function segmentBidirectionalLongest(
  text: string
, forwardDict: ForwardDictionary
, backwardDict: BackwardDictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```

### Extractor
#### extractKeywords
```ts
function extractKeywords(matches: IMatch[], top: number): Match[]
```

### Match
```ts
class Match {
  constructor(
    range: TextRange
  , tfIdf: number | null
  )

  getRange(): TextRange
  getTfIdf(): number | null
}
```

### TextRange
```ts
class TextRange {
  /**
   * @param startIndex byte index
   * @param endIndex byte index
   */
  constructor(
    startIndex: number
  , endIndex: number
  )

  /**
   * @returns byte index
   */
  getStartIndex(): number

  /**
   * @returns byte index
   */
  getEndIndex(): number

  /**
   * @returns byte length
   */
  len(): number

  extract(text: string): string
}
