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
class Match implements Jsonable<{
  range: TextRange
  indexOfPatterns: number | null
}> {
  constructor(
    range: TextRange
  , indexOfPatterns: number | null
  )

  getRange(): TextRange
  getIndexOfPatterns(): number | null
  getValueFrom<T>(map: Record<number, T>): T | null
}
```

### TextRange
```ts
class TextRange implements Jsonable<{
  startIndex: number
  endIndex: number
}> {
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

  extract(bufferUTF8: Buffer): string
  extract(text: string): string
}
```

### cedarwood
#### ForwardDictionary
```ts
class ForwardDictionary {
  instance: NativeCedarwoodFowardDictionary

  constructor(patterns: string[])
}
```

#### BackwardDictionary
```ts
class BackwardDictionary {
  instance: NativeCedarwoodFowardDictionary

  constructor(patterns: string[])
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

  constructor(patterns: string[])
}
```

#### ForwardDictionary
```ts
class ForwardDictionary {
  instance: NativeDaachorseFowardDictionary

  constructor(patterns: string[])
}
```

#### BackwardDictionary
```ts
class BackwardDictionary {
  instance: NativeDaachorseFowardDictionary

  constructor(patterns: string[])
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

### hashmap
#### Dictionary
```ts
class Dictionary {
  instance: NativeHashmapDictionary

  constructor(patterns: string[])
}
```

#### segmentFull
```ts
function segmentFull(
  text: string
, dict: Dictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```

#### segmentForwardLongest
```ts
function segmentForwardLongest(
  text: string
, dict: Dictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```

#### segmentBackwardLongest
```ts
function segmentBackwardLongest(
  text: string
, dict: Dictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```

#### segmentBidirectionalLongest
```ts
function segmentBidirectionalLongest(
  text: string
, dict: Dictionary
, behaviorForUnmatched: BehaviorForUnmatched
): Match[]
```
