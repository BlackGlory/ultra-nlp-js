import { addon, NativeHashmapDictionary } from '@src/addon.js'

const symbol = Symbol()

export class Dictionary {
  private [symbol] = true

  instance: NativeHashmapDictionary

  constructor(patterns: string[]) {
    this.instance = addon.hashmapCreateDictionary(patterns)
  }
}
