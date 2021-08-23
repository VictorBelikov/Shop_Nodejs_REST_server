const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../models/user');
const feedController = require('../controllers/feed');
const mongoose = require('mongoose');

describe('Feed Controller', () => {
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

  it('should add a created post to the posts of the creator', (done) => {
    const req = {
      body: {
        title: 'Test new post',
        content: 'Test post content',
      },
      file: {
        path: 'https://test_path_to_image',
      },
      userId: '61090ccede6f022015c4d985',
    };
    const res = {
      status() {
        return this;
      },
      json() {},
    };

    feedController
      .createPost(req, res, () => {})
      .then((savedUser) => {
        expect(savedUser).to.have.property('posts');
        expect(savedUser.posts).to.have.length(1);
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
