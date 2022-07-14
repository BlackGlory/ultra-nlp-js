import { addon, NativeCedarwoodBackwardDictionary } from '@src/addon'

export class BackwardDictionary {
  instance: NativeCedarwoodBackwardDictionary

  constructor(patterns: string[]) {
    this.instance = addon.cedarwoodCreateBackwardDictionary(patterns)
  }
}
