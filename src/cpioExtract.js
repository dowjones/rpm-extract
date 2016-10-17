import stream from 'cpio-stream'
import concat from 'concat-stream'

export default input => {
  const extract = stream.extract()
  const files = []

  extract.on('entry', (header, stream, cb) => {
    stream.pipe(concat(content => {
      const file = {
        data: content,
        mode: header.mode,
        mtime: header.mtime,
        path: header.name,
        type: header.type
      }

      if (header.type === 'symlink' || header.type === 'link') {
        file.linkname = header.linkname
      }

      files.push(file)
    }))
    stream.on('end', () => {
      cb()
    })

    stream.resume()
  })

  const promise = new Promise((resolve, reject) => {
    extract.on('finish', () => resolve(files))
    extract.on('error', reject)
  })

  extract.then = promise.then.bind(promise)
  extract.catch = promise.catch.bind(promise)
  extract.end(input)
  return extract
}
