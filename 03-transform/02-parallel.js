import through from 'through2-concurrent'
import fs from 'fs'
import fetch from 'node-fetch'
import split from 'split'

fs.createReadStream('sourcelist.txt')
  .pipe(split())
  .pipe(
    through.obj({ maxConcurrency: 2 }, function (url, enc, done) {
      if (!url) return done()
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          this.push(`${url} = ${json.name}\n`)
          done()
        })
    }),
  )
  .pipe(fs.createWriteStream('result.txt'))
  .on('finish', () => console.log('Done'))
