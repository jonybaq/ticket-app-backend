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
        this.socket=new Sockets(this.io);
    }

    execute(){
        //inicializar middlewares
        this.middlewares();
        //inicializa el server
        this.server.listen(this.port,()=>{
            console.log('Server corriendo en el puerto '+this.port);
        });
        
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname,'../public')));
        this.app.get('/ultimos',(req,res)=>{
            res.json({
                ok:true,
                ultimos:this.socket.ticketList.ultimo10
            });
        });
        
    }


}

module.exports=Server;