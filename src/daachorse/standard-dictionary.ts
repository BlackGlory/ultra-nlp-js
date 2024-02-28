import { addon, NativeDaachorseStandardDictionary } from '@src/addon.js'

export class StandardDictionary {
  instance: NativeDaachorseStandardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.daachorseCreateStandardDictionary(patterns)
  }
}
