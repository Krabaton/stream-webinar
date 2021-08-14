import fs from 'fs'

const file = fs.createWriteStream('file-stream.txt')

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000
  write()
  function write() {
    let ok = true
    do {
      i--
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback)
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding)
      }
    } while (i > 0 && ok)
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      console.log(`drain: ${i} - ${ok}`)
      writer.once('drain', write)
    }
  }
}

writeOneMillionTimes(file, 'test', 'utf8', (err) => {
  console.log('done')
})
