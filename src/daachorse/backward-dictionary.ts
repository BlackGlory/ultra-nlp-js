import { addon, NativeDaachorseBackwardDictionary } from '@src/addon'

export class BackwardDictionary {
  instance: NativeDaachorseBackwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.daachorseCreateBackwardDictionary(patterns)
  }
}
