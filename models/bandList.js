const Band = require("./band");

class BandList{
    constructor(){
        this.bands=[ 
            new Band('Dragon Ball'), 
            new Band('Naruto'),
            new Band('Atack on Titan'), 
            new Band('Doraemon')
        ];
    }

    addBand(name){
        const band= new Band(name);
        this.bands.push(band);
        this.getBands();
    }

    removeBand(id){
        this.bands=this.bands.filter(band=> band.id!==id);
    }

    getBands(){
        return this.bands;
    }

    increaseVotes(id){
        this.bands= this.bands.map( band=>{
            if (band.id===id) {
                band.votes=band.votes+1;
            }
            return band;
        });
    }

    changeBandName(id,newName){
        this.bands= this.bands.map( band=>{
            if (band.id===id) {
                band.name=newName;
            }
            return band;
        });
    }


}


module.exports=BandList;