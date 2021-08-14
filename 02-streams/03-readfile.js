import fs from 'fs'

const read = fs.createReadStream('../01-zip/test.txt')

read.on('data', (chunk) => {
  console.log(chunk.toString())
})

read.on('end', () => {
  console.log('Файл закончился')
})
