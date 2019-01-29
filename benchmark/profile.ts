
import { createWriteStream } from 'fs'
import * as profiler from 'v8-profiler'
import { findAll } from '..'
import { ALL_CONSTRAINTS } from './pentomino/field'

profiler.startProfiling('1', true)

findAll(ALL_CONSTRAINTS)

const profile = profiler.stopProfiling()

profile.export().pipe(createWriteStream('profile.cpuprofile'))
