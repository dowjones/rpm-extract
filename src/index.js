import gzUnzip from './gzUnzip'
import cpioExtract from './cpioExtract'
import isRpm from './isRpm'

async function extract (file) {
  if (!isRpm(file)) {
    throw new Error('Not a valid rpm.')
  }

  const files = await gzUnzip(file).then(cpioExtract)

  return files
}

export default extract
