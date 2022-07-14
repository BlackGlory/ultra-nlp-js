import { addon, NativeDaachorseForwardDictionary } from '@src/addon'

export class ForwardDictionary {
  instance: NativeDaachorseForwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.daachorseCreateForwardDictionary(patterns)
  }
}
