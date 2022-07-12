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
### BehaviorForUnmatched
```ts
enum BehaviorForUnmatched {
  Ignore
, KeepAsWords
, KeepAsChars
}
```

### Match
```ts
class Match {
  constructor(
    range: TextRange
  , value: number | null
  )

  getRange(): TextRange
  getValue(): number | null
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
```

### extractKeywords
```ts
function extractKeywords(matches: Match[], top: number): Match[]
```

### cedarwood
#### ForwardDictionary
```ts
class ForwardDictionary {
  instance: NativeCedarwoodFowardDictionary

  static create(patterns: string[]): ForwardDictionary
  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): ForwardDictionary
}
```

#### BackwardDictionary
```ts
class BackwardDictionary {
  instance: NativeCedarwoodFowardDictionary

  static create(patterns: string[]): BackwardDictionary
  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): BackwardDictionary
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

### daachorse
#### StandardDictionary
```ts
class StandardDictionary {
  instance: NativeDaachorseStandardDictionary

  static create(patterns: string[]): StandardDictionary
  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): StandardDictionary
}
```

#### ForwardDictionary
```ts
class ForwardDictionary {
  instance: NativeDaachorseFowardDictionary

  static create(patterns: string[]): ForwardDictionary
  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): ForwardDictionary
}
```

#### BackwardDictionary
```ts
class BackwardDictionary {
  instance: NativeDaachorseFowardDictionary

  static create(patterns: string[]): BackwardDictionary
  static createWithValues(
    patternsWithValues: Array<[pattern: string, value: number]>
  ): BackwardDictionary
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
