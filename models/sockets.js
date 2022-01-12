const BandList = require('./bandList');
class Sockets {
    constructor(io){
        this.io=io;
        this.bandList= new BandList();
        this.socketEvents();
    }
    socketEvents(){
        this.io.on('connection', (socket) => { 
            console.log(`Cliente Conectado`);
            //Emitir todas las bandas actuales
            socket.emit('current-bands',this.bandList.getBands());  
            socket.on('votar',(data)=>{
                console.log(`votar`, data);
                this.bandList.increaseVotes(data);
                this.io.emit('current-bands',this.bandList.getBands());
            });
            socket.on('renombrar',(id,nombre)=>{
                console.log(`renombrar`, id,nombre);
                this.bandList.changeBandName(id,nombre);
                this.io.emit('current-bands',this.bandList.getBands());
            });
            socket.on('eliminar',(id)=>{
                console.log(`eliminar`, id);
                this.bandList.removeBand(id);
                this.io.emit('current-bands',this.bandList.getBands());
            });
            socket.on('insertar',(nombre)=>{
                console.log(`insertar`, nombre);
                this.bandList.addBand(nombre);
                this.io.emit('current-bands',this.bandList.getBands());
            });
            //console.log(`socket.id`, socket.handshake.query.nombre);
            /*this.io.emit('mensaje-bienvenida','Se conecto el usuario '+socket.handshake.query.nombre);
            socket.on('mensaje-cliente',(datos)=>{
                console.log(`mensaje-cliente`, datos);
                this.io.emit('mensaje-server',socket.handshake.query.nombre+': '+datos);
            });
            socket.on("disconnect", () => {
                console.log(`disconnect`);
                this.io.emit('mensaje-bienvenida','Se Desconecto el usuario '+socket.handshake.query.nombre);
              });
            socket.on("mensaje-escribiendo", () => {
                this.io.emit('mensaje-escribiendo','Escribiendo el usuario '+socket.handshake.query.nombre);
            });  

            socket.on("mensaje-soltando", () => {
                this.io.emit('mensaje-soltando','');
            });*/
         });

    }
}

module.exports=Sockets;