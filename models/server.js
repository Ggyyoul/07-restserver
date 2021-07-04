const express = require('express');
const cors = require('cors')
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

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
    this.app.get('/api', (req, res) => {
      res.json({
        msg: 'Get Api',
      });
    });

    this.app.put('/api', (req, res) => {
      res.json({
        msg: 'Put Api',
      });
    });

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        msg: 'Post Api',
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        msg: 'Delete Api',
      });
    });
  }

  lister() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
