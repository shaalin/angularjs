var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
    it('should return index of element when the value is present', function(){
      assert.equal(1, [1,2,3].indexOf(2));
      assert.equal(2, [1,2,3].indexOf(3));
    })
  })
  describe('#lenth', function(){
    it('Should return length of the array', function(){
      assert.equal(3, [1,2,3].length);
    })
  })
})