import 'should'
import isRpm from '../src/isRpm'

describe('isRpm', () => {
  it('should return false non rpm packages', () => {
    isRpm('./test/fixtures/not-an-rpm.rpm.txt').should.be.false()
  })

  it('should return true for rpm packages', async () => {
    isRpm('./test/fixtures/test-1.0-1.x86_64.rpm').should.be.true()
  })
})
