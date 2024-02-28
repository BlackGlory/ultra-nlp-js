import { addon, NativeDaachorseBackwardDictionary } from '@src/addon.js'

export class BackwardDictionary {
  instance: NativeDaachorseBackwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.daachorseCreateBackwardDictionary(patterns)
  }
}
