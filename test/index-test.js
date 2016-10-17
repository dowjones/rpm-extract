import 'should'
import parser from '../src/index'

describe('index', () => {
  it('should throw error for non rpm packages', () => {
    parser('./test/fixtures/not-an-rpm.rpm.txt').should.be.rejectedWith(Error)
  })

  it('should extract files from rpm packages', async () => {
    const files = await parser('./test/fixtures/test-1.0-1.x86_64.rpm')
    files.should.not.be.empty()
  })

  it('should throw error for non gzip cpio packages', () => {
    return parser('./test/fixtures/test.bz2.rpm-1.0-1.x86_64.rpm').should.be.rejectedWith(Error)
  })
})
