import fromArray from 'from2-array'
import through from 'through2'
import fs from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'
import mkdirp from 'mkdirp'

const folders = {
  src: './src/js',
  dist: './dist/js',
}

const files = (await readdir(folders.src)).map((item) =>
  path.join(folders.src, item),
)

async function concatFiles(files, dest) {
  await mkdirp(path.dirname(dest))
  const destStream = fs.createWriteStream(dest)
  return new Promise((resolve, reject) => {
    fromArray
      .obj(files)
      .pipe(
        through.obj((file, enc, done) => {
          const src = fs.createReadStream(file)
          src.pipe(destStream, { end: false })
          src.on('error', (err) => {
            console.log(err.message)
            done()
          })
          src.on('end', () => done())
        }),
      )
      .on('error', () => reject())
      .on('finish', () => {
        destStream.end()
        resolve()
      })
  })
}

await concatFiles(files, path.join(folders.dist, 'main.js'))
