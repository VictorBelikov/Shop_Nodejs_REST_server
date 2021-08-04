const socketIo = require('socket.io');

const ErrorService = require('./error-service');

let io;

module.exports = {
  init(server) {
    io = socketIo(server, {
      cors: {
        origin: '*',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
    });
    return io;
  },

  getIo() {
    if (!io) {
      throw ErrorService(400, 'Socket.io not initialized!');
    }
    return io;
  },
};
