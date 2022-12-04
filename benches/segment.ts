import { go } from '@blackglory/prelude'
import { Benchmark } from 'extra-benchmark'
import { readFileLineByLine } from 'extra-filesystem'
import { toArrayAsync } from 'iterable-operator'
import { cedarwood, daachorse, BehaviorForUnmatched } from '..'
import path from 'path'
import fs from 'fs/promises'

const patternsFilename = path.join(__dirname, './patterns.txt')
const samplesFilename = path.join(__dirname, './samples.txt')

const benchmark = new Benchmark('segment', {
  warms: 10
, runs: 10
})

go(async () => {
  const text = await fs.readFile(patternsFilename, 'utf-8')
  const patterns = text.split('\n').filter(x => !!x)

  const samples = await toArrayAsync(readFileLineByLine(samplesFilename))

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
