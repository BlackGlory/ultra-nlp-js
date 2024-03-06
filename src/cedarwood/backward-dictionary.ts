import { addon, NativeCedarwoodBackwardDictionary } from '@src/addon.js'

const symbol = Symbol()

export class BackwardDictionary {
  private [symbol] = true

  instance: NativeCedarwoodBackwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.cedarwoodCreateBackwardDictionary(patterns)
  }
}
