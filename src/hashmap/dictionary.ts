import { addon, NativeHashmapDictionary } from '@src/addon'

export class Dictionary {
  instance: NativeHashmapDictionary

  constructor(patterns: string[]) {
    this.instance = addon.hashmapCreateDictionary(patterns)
  }
}
