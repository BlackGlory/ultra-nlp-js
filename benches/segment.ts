import { go } from '@blackglory/prelude'
import { Benchmark } from 'extra-benchmark'
import { readFileLineByLine } from 'extra-filesystem'
import { toArrayAsync } from 'iterable-operator'
import { cedarwood, daachorse, BehaviorForUnmatched } from '..'
import path from 'path'
import fs from 'fs/promises'
import * as Jieba from '@node-rs/jieba'

const patternsFilename = path.join(__dirname, './patterns.txt')
const samplesFilename = path.join(__dirname, './samples.txt')

const benchmark = new Benchmark('segment', {
  warms: 10
, runs: 10
})

go(async () => {
  const text = await fs.readFile(patternsFilename, 'utf-8')
  const patterns = Array.from(new Set(
    text
      .split('\n')
      .map(x => x.replace(/\s/g, ''))
      .filter(x => !!x)
  ))

  const samples = await toArrayAsync(readFileLineByLine(samplesFilename))

  // Jieba的词典只能导入一次, 所以不能在case里导入.
  const dict = Buffer.from(
    patterns
      .map(x => `${x} 0 n`)
      .join('\n')
  )
  Jieba.loadDict(dict)

  benchmark.addCase('@node-rs/jieba (cutForSearch)', () => {
    return () => {
      for (const line of samples) {
        Jieba.cutForSearch(line)
      }
    }
  })

  benchmark.addCase('@node-rs/jieba (cutAll)', () => {
    return () => {
      for (const line of samples) {
        Jieba.cutAll(line)
      }
    }
  })

  benchmark.addCase('cedarwood', () => {
    const dict = new cedarwood.ForwardDictionary(patterns)

    return () => {
      for (const line of samples) {
        cedarwood.segmentFull(line, dict, BehaviorForUnmatched.KeepAsWords)
      }
    }
  })

  benchmark.addCase('daachorse', () => {
    const dict = new daachorse.StandardDictionary(patterns)

    return () => {
      for (const line of samples) {
        daachorse.segmentFull(line, dict, BehaviorForUnmatched.KeepAsWords)
      }
    }
  })

  console.log(`Benchmark: ${benchmark.name}`)
  for await (const result of benchmark.run()) {
    console.log(result)
  }
})
