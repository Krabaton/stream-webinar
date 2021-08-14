import stream from 'stream'
import Chance from 'chance'

const chance = new Chance()

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options)
  }
  _read() {
    const chunk = chance.string()
    this.push(chunk, 'utf8')
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  }
}

const rs = new RandomStream()

rs.on('readable', () => {
  let chunk
  while ((chunk = rs.read()) !== null) {
    console.log(`Block read: size ${chunk.length} - ${chunk.toString()}`)
  }
})
