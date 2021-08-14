import stream from 'stream'
import fs from 'fs'

class ReadUpperStream extends stream.Readable {
  constructor(file, options) {
    super(options)
    this.rr = fs.createReadStream(file)
  }
  _read() {
    this.rr.on('data', (chunk) => {
      this.push(chunk.toString().toUpperCase())
    })

    this.rr.on('end', () => {
      this.push(null)
    })
  }
}

const rs = new ReadUpperStream('../01-zip/test.txt')

rs.pipe(fs.createWriteStream('test.txt'))

rs.on('data', (chunk) => {
  console.log(chunk.toString())
})

rs.on('end', () => {
  console.log('Файл закончился')
})
