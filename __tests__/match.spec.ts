import { Match } from '@src/match'
import { TextRange } from '@src/text-range'

describe('Match', () => {
  describe('getValueFrom', () => {
    test('index is null', () => {
      const mat = new Match(new TextRange(0, 1), null)
      const map = [1, 2]

      const result = mat.getValueFrom(map)

      expect(result).toBeNull()
    })

    test('index isnt null', () => {
      const mat = new Match(new TextRange(0, 1), 1)
      const map = ['0', '1']

      const result = mat.getValueFrom(map)

      expect(result).toBe('1')
    })

    test('index is out of bounds', () => {
      const mat = new Match(new TextRange(0, 1), 2)
      const map = ['0', '1']

      const result = mat.getValueFrom(map)

      expect(result).toBeNull()
    })
  })
})
