const http = require('http');

const app = require('./app');

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server is listening on port ${port} ...`));

// ========================= Create server more simple way ==============================
// app.listen(8080, () => console.log('Server is running on port 8080...'));

// Express source code:
// app.listen = function() {
//   var server = http.createServer(this);
//   return server.listen.apply(server, arguments);
// };
