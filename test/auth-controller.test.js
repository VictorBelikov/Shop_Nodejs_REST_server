const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../models/user');
const authController = require('../controllers/auth');
const mongoose = require('mongoose');

describe('Auth Controller', () => {
  before((done) => {
    mongoose
      .connect(
        `mongodb://V1ctoR:WwMEMQ54Y7T1K1Xk@online-shop-shard-00-00.5yjc5.mongodb.net:27017,online-shop-shard-00-01.5yjc5.mongodb.net:27017,online-shop-shard-00-02.5yjc5.mongodb.net:27017/test_messages?ssl=true&replicaSet=atlas-uxfy7r-shard-0&authSource=admin&retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      )
      .then((result) => {
        const user = new User({
          _id: '61090ccede6f022015c4d985',
          email: 'test@test.com',
          password: 'tester',
          name: 'test_user',
          posts: [],
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  it('should throw an error if accessing the database fails', (done) => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      },
    };

    authController
      .login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('message');
        done();
      });

    User.findOne.restore();
  });

  it('should send response with a valid user for an existing user', (done) => {
    const req = { userId: '61090ccede6f022015c4d985' };
    const res = {
      statusCode: 500,
      userStatus: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.userStatus = data.status;
      },
    };

    authController
      .getUserStatus(req, res, () => {})
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal("I'm a new User!");
        done();
      });
  });

  after((done) => {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
