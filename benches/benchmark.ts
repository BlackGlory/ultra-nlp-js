import { go, assert } from '@blackglory/prelude'
import { Benchmark } from 'extra-benchmark'

const benchmark = new Benchmark('substring by bytes', {
  warmUps: 10000
, runs: 10000
})

go(async () => {
  benchmark.addCase('Buffer.from & Buffer.slice', () => {
    const text = '你好世界'
    const startIndex = 0
    const endIndex = 6

    return () => {
      const result = Buffer.from(text)
        .slice(startIndex, endIndex)
        .toString()

      assert(result === '你好', `${result}`)
    }
  })

  benchmark.addCase('TextEncoder & TextDecoder', () => {
    const text = '你好世界'
    const startIndex = 0
    const endIndex = 6
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    return () => {
      const result = decoder.decode(
        encoder.encode(text).slice(
          startIndex
        , endIndex
        )
      )

      assert(result === '你好', `${result}`)
    }
  })

  console.log(`Benchmark: ${benchmark.name}`)
  for await (const result of benchmark.run()) {
    console.log(result)
  }
})
