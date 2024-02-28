import { go, assert } from '@blackglory/prelude'
import { Benchmark } from 'extra-benchmark'
import { TextRange } from '../src/index.js'

const benchmark = new Benchmark('substring by bytes', {
  warms: 10000
, runs: 10000
})

go(async () => {
  benchmark.addCase('TextRange.extract(string)', () => {
    const text = '你好世界'
    const startIndex = 0
    const endIndex = 6
    const range = new TextRange(startIndex, endIndex)

    return () => {
      const result = range.extract(text)

      assert(result === '你好', `${result}`)
    }
  })

  benchmark.addCase('TextRange.extract(buffer)', () => {
    const text = '你好世界'
    const startIndex = 0
    const endIndex = 6
    const bufferUTF8 = Buffer.from(text, 'utf-8')
    const range = new TextRange(startIndex, endIndex)

    return () => {
      const result = range.extract(bufferUTF8)

      assert(result === '你好', `${result}`)
    }
  })

  benchmark.addCase('Buffer.from & Buffer.slice', () => {
    const text = '你好世界'
    const startIndex = 0
    const endIndex = 6

    return () => {
      const result = Buffer.from(text, 'utf-8')
        .slice(startIndex, endIndex)
        .toString('utf-8')

      assert(result === '你好', `${result}`)
    }
  })

  benchmark.addCase('Buffer.slice', () => {
    const text = '你好世界'
    const startIndex = 0
    const endIndex = 6
    const buffer = Buffer.from(text, 'utf-8')

    return () => {
      const result = buffer
        .slice(startIndex, endIndex)
        .toString('utf-8')

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
