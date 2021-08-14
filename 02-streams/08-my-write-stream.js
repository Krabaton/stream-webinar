import stream from 'stream'
import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'

class ToFileStream extends stream.Writable {
  constructor(opt) {
    super(opt)
  }
  _write(chunk, encoding, cb) {
    mkdirp(path.dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content, cb))
      .catch(cb)
  }
}

const wfs = new ToFileStream({ objectMode: true })

const content = fs.readFileSync('02-read.js')

wfs.on('error', (err) => console.log(err))
wfs.write({ path: 'temp/file.js', content })
wfs.end()
