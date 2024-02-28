import { addon, NativeHashmapDictionary } from '@src/addon.js'

export class Dictionary {
  instance: NativeHashmapDictionary

  constructor(patterns: string[]) {
    this.instance = addon.hashmapCreateDictionary(patterns)
  }
}
