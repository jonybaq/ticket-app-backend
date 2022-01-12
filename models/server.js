const express= require('express');
const http=require('http');
const sockeiIo=require('socket.io');
const path= require('path');
const Sockets = require('./sockets');
var cors = require('cors');
class Server {
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.app.use(cors({origin:'*'}));
        this.app.use(express.json());
        ///http server
        this.server = http.createServer(this.app);
        ///configuraciones socket
        this.io = sockeiIo(this.server,{cors:{origin:'*'}});
    }

    execute(){
        //inicializar middlewares
        this.middlewares();
        this.configurarSockets();
        //inicializa el server
        this.server.listen(this.port,()=>{
            console.log('Server corriendo en el puerto '+this.port);
        });
        
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname,'../public')));
        
    }

    configurarSockets(){
        new Sockets(this.io);
    }
}

module.exports=Server;