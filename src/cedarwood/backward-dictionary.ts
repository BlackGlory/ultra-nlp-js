import { addon, NativeCedarwoodBackwardDictionary } from '@src/addon.js'

export class BackwardDictionary {
  instance: NativeCedarwoodBackwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.cedarwoodCreateBackwardDictionary(patterns)
  }
}
