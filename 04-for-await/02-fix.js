import fs from 'fs'
import { resolve } from 'path'

const delay = (time) => {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

const readStream = (stream) => {
  return function () {
    return new Promise((resolve, reject) => {
      const ondata = (chunk) => {
        stream.pause()
        clearListener()
        resolve(chunk)
      }
      const onerror = (err) => {
        clearListener()
        reject(err)
      }
      const onend = () => {
        clearListener()
        resolve()
      }
      const clearListener = () => {
        stream.removeListener('data', ondata)
        stream.removeListener('error', onerror)
        stream.removeListener('end', onend)
      }
      stream.on('data', ondata)
      stream.on('error', onerror)
      stream.on('end', onend)
      stream.resume()
    })
  }
}

async function read() {
  let stream = fs.createReadStream('../01-zip/test.txt', {
    highWaterMark: 10,
    encoding: 'utf8',
  })
  let reader = readStream(stream)
  let data = await reader()
  while (data) {
    console.log(data)
    await delay(500)
    data = await reader()
  }
}

read()

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason)
})
