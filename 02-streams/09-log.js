import fs from 'fs'
import { Console } from 'console'

const output = fs.createWriteStream('./stdout.log')
const outerror = fs.createWriteStream('./stderr.log')

const log = new Console(output, outerror)

log.log('Info')
log.error('error')
