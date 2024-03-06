import { addon, NativeDaachorseForwardDictionary } from '@src/addon.js'

const symbol = Symbol()

export class ForwardDictionary {
  private [symbol] = true

  instance: NativeDaachorseForwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.daachorseCreateForwardDictionary(patterns)
  }
}
