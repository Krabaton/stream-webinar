import fs from 'fs'

const delay = (time) => {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}

const readStream = (stream) => {
  let resolve, reject

  stream.on('data', (data) => resolve(data))
  stream.on('error', (err) => reject(err))
  stream.on('end', () => resolve())

  return function () {
    return new Promise((res, rej) => {
      resolve = res
      reject = rej
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
