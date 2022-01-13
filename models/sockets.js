const TicketList = require("./ticketList");
class Sockets {
    constructor(io){
        this.io=io;
        this.ticketList= new TicketList();
        this.socketEvents();
    }
    socketEvents(){
        this.io.on('connection', (socket) => { 
            console.log(`Cliente Conectado`);
            //Emitir todas las bandas actuales   
            socket.on('nuevoTicket',(data,callback)=>{
                const nuevoTicket=this.ticketList.crearTicket();
                callback(nuevoTicket.numero);
                console.log('nuevo ticket No.'+nuevoTicket.numero);
                console.log('pendientes',this.ticketList.getPendientes);
                console.log('asignados.',this.ticketList.getAsignados);
            }); 

            socket.on('asignar-ticket',(data,callback)=>{
                const nuevoTicket=this.ticketList.asignarTicket(data.agente,data.cubiculo);
                if (nuevoTicket) {
                    callback(nuevoTicket);
                    console.log('asignado ticket No.'+nuevoTicket.numero);
                    console.log('pendientes',this.ticketList.getPendientes);
                    console.log('asignados.',this.ticketList.getAsignados);
                    //console.log(`asigado ultimo`, this.ticketList.ultimoTickeAsigando(data.agente));
                    this.io.emit('tickets-asignados',this.ticketList.ultimo10);
                }
                
            });
            socket.on('ultimo-ticket',(data,callback)=>{
                const ultimoTicket=this.ticketList.ultimoTickeAsigando(data);
                if (ultimoTicket) {
                    callback(ultimoTicket);
                    console.log(`asigado ultimo`,ultimoTicket );
                }
                
            });
            socket.on('tickets',()=>{
                this.io.emit('tickets-asignados',this.ticketList.ultimo10);
            });
            
            


         });

    }
}

module.exports=Sockets;