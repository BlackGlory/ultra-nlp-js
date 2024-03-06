import { addon, NativeDaachorseBackwardDictionary } from '@src/addon.js'

const symbol = Symbol()

export class BackwardDictionary {
  private [symbol] = true

  instance: NativeDaachorseBackwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.daachorseCreateBackwardDictionary(patterns)
  }
}
