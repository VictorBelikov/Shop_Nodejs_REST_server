const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/check-auth');

describe('Auth middleware', () => {
  it('should throw an error if no auth headers is present', () => {
    const req = {
      get(headerName) {
        return null;
      },
    };
    expect(checkAuth.bind(this, req, {}, () => {})).to.throw("Auth headers weren't send");
  });

  it("should throw an error if the authorization header is only one string without 'Bearer' format and real token", () => {
    const req = {
      get(headerName) {
        return 'some string';
      },
    };
    expect(checkAuth.bind(this, req, {}, () => {})).to.throw();
  });

  it('should yield a userId after decoding the token', () => {
    const req = {
      get(headerName) {
        return 'Bearer some_str';
      },
    };

    // Mock 'verify' function
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'some_id' });

    checkAuth(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'some_id');
    expect(jwt.verify.called).to.be.true;

    // Возвращаем замоканную функцию в исходное состояние
    jwt.verify.restore();
  });

  it('should throw an error if the token cannot be verified', () => {
    const req = {
      get(headerName) {
        return 'Bearer some_str';
      },
    };
    expect(checkAuth.bind(this, req, {}, () => {})).to.throw();
  });
});
