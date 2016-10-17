import zlib from 'zlib'
import pify from 'pify'
import fs from 'fs'

const GZIP_MAGIC = [0x1F, 0x8B, 0x08]
const readFileAsync = pify(fs.readFile)

export default async file => {
  const data = await readFileAsync(file)

  // new Buffer() is marked as deprecated but still safe to use: https://github.com/nodejs/node/issues/9165#issuecomment-254585749
  const idx = data.indexOf(new Buffer(GZIP_MAGIC))

  if (idx === -1) {
    throw new Error('Only gzip compressed cpio archives are supported.')
  }

  return pify(zlib.unzip)(data.slice(idx))
}
