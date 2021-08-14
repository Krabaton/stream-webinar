import fs from 'fs'
import Chance from 'chance'

const chance = new Chance()

const file = fs.createWriteStream('file-stream.txt')

function generateCrazyData() {
  while (chance.bool({ likelihood: 95 })) {
    const ok = file.write(chance.string({ length: 16 * 1024 }))
    if (!ok) {
      console.log('drain')
      return file.once('drain', generateCrazyData)
    }
  }
  file.end('---------------------', () => {
    console.log('end')
  })
}

generateCrazyData()
