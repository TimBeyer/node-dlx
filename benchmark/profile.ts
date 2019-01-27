
import { createWriteStream } from 'fs'
import * as profiler from 'v8-profiler'
import { find } from '..'
import { ALL_CONSTRAINTS } from './pentomino/field'

profiler.startProfiling('1', true)

find(ALL_CONSTRAINTS, 10)

const profile = profiler.stopProfiling()

profile.export().pipe(createWriteStream('profile.cpuprofile'))
