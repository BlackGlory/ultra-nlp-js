import { addon, NativeDaachorseStandardDictionary } from '@src/addon.js'

const symbol = Symbol()

export class StandardDictionary {
  private [symbol] = true

  instance: NativeDaachorseStandardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.daachorseCreateStandardDictionary(patterns)
  }
}
