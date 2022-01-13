const Ticket = require("./ticket");

class TicketList {
    constructor(){
        this.ultimoNumero=0;
        this.pendientes=[];
        this.asignados=[];
    }

    get siguienteNumero(){
        this.ultimoNumero++;
        return this.ultimoNumero;
    }

    // 3 asginados 7 historial

    get ultimo10(){
        return this.asignados.slice(0,10);
    }

    crearTicket(){
        const nuevoticket= new Ticket(this.siguienteNumero);
        this.pendientes.unshift(nuevoticket);
        return nuevoticket;
    }

    asignarTicket(nombre,cubiculo){
        if (this.pendientes.length>0) {
            const ticket= this.pendientes[this.pendientes.length-1];
            ticket.agente=nombre;
            ticket.cubiculo=cubiculo;
            this.pendientes.pop();
            this.asignados.unshift(ticket);
            return ticket;
        }else{
            return null;
        }
        
    }
    get getPendientes(){
        return this.pendientes;
    }
    get getAsignados(){
        return this.asignados;
    }

    ultimoTickeAsigando(agente){
        return this.asignados.find(e=>{return e.agente===agente;});
    }

}

module.exports=TicketList;