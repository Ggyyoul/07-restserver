const express = require('express');
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users'

    //Middlewares
    this.middlewares();
    //Rtas de mi aplicación
    this.router();
  }

  middlewares() {

    this.app.use(cors())
    //Directorio publico
    this.app.use(express.static('public'));

  }

  router() {
    this.app.use(this.usersPath, require('../routes/user.routes'))
  }

  lister() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
