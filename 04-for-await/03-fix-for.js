import fs from 'fs'

const delay = (time) => {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

const file = fs.createWriteStream('file-stream.js')

async function read() {
  let stream = fs.createReadStream('../01-zip/01.js', {
    highWaterMark: 80,
    encoding: 'utf8',
  })

  for await (const chunk of stream) {
    await delay(500) // Имитация
    file.write(chunk)
    console.log(chunk)
  }
  file.end()
}

read()

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason)
})
