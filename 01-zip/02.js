import fs from 'fs'
import zlib from 'zlib'

const file = 'test.txt'

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .on('end', () => {
    console.log('Все данные отработаны')
  })
  .pipe(fs.createWriteStream(`${file}.gz`))
  .on('finish', () => {
    console.log('Архив создан')
  })
