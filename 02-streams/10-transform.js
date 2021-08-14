import stream from 'stream'
import esMain from 'es-main'

class ReplaceStream extends stream.Transform {
  constructor(searchString, replaceString) {
    super()
    this.searchString = searchString
    this.replaceString = replaceString
    this.tailPiece = ''
  }

  _transform(chunk, encoding, cb) {
    const pieces = (this.tailPiece + chunk).split(this.searchString)
    const lastPiece = pieces[pieces.length - 1]
    const tailPieceLen = this.searchString.length - 1
    this.tailPiece = lastPiece.slice(-tailPieceLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen)
    this.push(pieces.join(this.replaceString))
    cb()
  }

  _flush(cb) {
    this.push(this.tailPiece)
    cb()
  }
}

if (esMain(import.meta)) {
  const rs = new ReplaceStream('World', 'Node.js')
  rs.on('data', (chunk) => console.log(chunk.toString()))
  rs.write('Hello World!')
  rs.write('Hello Wor')
  rs.write('ld')
  rs.end('!')
}

export default ReplaceStream
