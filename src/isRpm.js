import readChunk from 'read-chunk'

const RPM_MAGIC = [0xED, 0xAB, 0xEE, 0xDB]

export default file => {
  const header = readChunk.sync(file, 0, RPM_MAGIC.length)

  for (let i = 0; i < RPM_MAGIC.length; i++) {
    if (header[i] !== RPM_MAGIC[i]) {
      return false
    }
  }

  return true
}
