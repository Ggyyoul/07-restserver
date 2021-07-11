const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth'
    //conect to database
    this.dbConnect();
    //Middlewares
    this.middlewares();
    //Rtas de mi aplicación
    this.router();
  }

  async dbConnect() {
    await dbConnection()
  }
  middlewares() {
    
    //CORS
    this.app.use(cors())

    //Lectura y parseo del body
    this.app.use(express.json())

    //Directorio publico
    this.app.use(express.static('public'));

  }

  router() {
    this.app.use(this.authPath, require('../routes/auth.routes'))
    this.app.use(this.usersPath, require('../routes/user.routes'))

  }

  lister() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
