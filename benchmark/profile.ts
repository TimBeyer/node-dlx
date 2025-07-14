import { createWriteStream } from 'fs'
import profiler from 'v8-profiler-next'
import { findAll } from '../index.js'
import { ALL_CONSTRAINTS } from './pentomino/field.js'

profiler.startProfiling('1', true)

findAll(ALL_CONSTRAINTS)

const profile = profiler.stopProfiling()

profile.export().pipe(createWriteStream('profile.cpuprofile'))
