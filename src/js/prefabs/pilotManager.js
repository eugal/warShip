export default class pilotManager {
    constructor() {
        this.pilotData = JSON.parse(localStorage.getItem('pilotData'));


        if(!this.pilotData){

            var allPilots = {'pilot': [] };

            allPilots.pilot.push({ "id": 0,
                                    "hp": 20,
                                    "name": "A1",
                                    "class": "gunner",
                                    "stat": 1,
                                    "relation": {
                                       "A2": 1, 
                                       "A3": 1,
                                       "A4": 1, 
                                       "A5": 2},
                                    "highScore": 0
                                    });

            allPilots.pilot.push({ "id": 1,
                                    "hp": 20,
                                    "name": "A2",
                                    "class": "gunner",
                                    "stat": 1,
                                    "relation": {
                                       "A2": 1, 
                                       "A3": 1,
                                       "A4": 1, 
                                       "A5": 1},
                                    "highScore": 0
                                    });

            localStorage.setItem("pilotData", JSON.stringify(allPilots));
        } else {
            // this.createPilot();
        }
    }

    createPilot(){

        // console.log(JSON.parse(this.pilotData));

        this.pilotData.pilot.push({ "id": this.pilotData.pilot.length,
                                    "hp": 20,
                                    "name":  "A" + this.pilotData.pilot.length,
                                    "class": "gunner",
                                    "stat": 1,
                                    "relation": {
                                       "A2": 1, 
                                       "A3": 1,
                                       "A4": 1, 
                                       "A5": 2},
                                    "highScore": 0
                                    });

        localStorage.setItem("pilotData", JSON.stringify( this.pilotData));

    }

};
