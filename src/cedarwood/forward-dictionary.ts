import { addon, NativeCedarwoodForwardDictionary } from '@src/addon.js'

const symbol = Symbol()

export class ForwardDictionary {
  private [symbol] = true

  instance: NativeCedarwoodForwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.cedarwoodCreateForwardDictionary(patterns)
  }
}
