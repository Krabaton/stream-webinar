import fs from 'fs/promises'
import zlib from 'zlib'
import { promisify } from 'util'

const file = 'test.txt'

try {
  const content = await fs.readFile(file)
  const pack = await promisify(zlib.gzip)(content)
  await fs.writeFile(`${file}.gz`, pack)
} catch (error) {
  console.log(error)
}
