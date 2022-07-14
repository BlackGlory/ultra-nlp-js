import { addon, NativeCedarwoodForwardDictionary } from '@src/addon'

export class ForwardDictionary {
  instance: NativeCedarwoodForwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.cedarwoodCreateForwardDictionary(patterns)
  }
}
