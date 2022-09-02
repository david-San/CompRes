/* 
 * David Sanchez
 * Newcastle University
 * 
 * 2021 May 11: Created
 * This function is a UTN sample
 * When it runs, it creates a UTN and all its components.
 * 
 * - It is loaded but not executed until it is called from the samples menu.
 * - It is added to the sample menu in simulation.js using the "Sample" object.
 * - The "Sample" object is used to create a callback.
 * 
 */





/**
 * This function returns a map of UTNs * 
 * @returns {Map}
 * 
 */
var sample0 = function () {

    // this.id = 1;

    let myUTNs = new Map();



    // ========================================================================== //
    // Position Network

    let positionNetwork1 = new PositionNetwork("Rail");
    positionNetwork1.addNewNode(1, "A", 5, 5);
    positionNetwork1.addNewNode(2, "S1", 6, 6);
    positionNetwork1.addNewNode(8, "B", 7, 7);
    // positionNetwork1.addNewNode(8, "C", 7, 6);





    // ========================================================================== //
    // Resolution Network

    let resolutionNetwork1 = new ResolutionNetwork("RailSystemDecision");




    resolutionNetwork1.addNewStakeholder("1", "R1", "Router1", 3, 5, 5);
    resolutionNetwork1.addNewStakeholder("2", "R2", "Router2", 3, 6, 6);
    resolutionNetwork1.addNewStakeholder("3", "R3", "Router3", 3, 7, 7);
    // resolutionNetwork1.addNewStakeholder("4", "R4", "Router4", 3, 7, 6);



    
    //All of these will be changed to Stake holders with particular concerns
    //let sensorWaterValues1 = [0, 0, 0, 0, 34, 25, 34, 26];
    //resolutionNetwork1.addNewSensor("Water", "W", 2, 5, "m", sensorWaterValues1);;

    // resolutionNetwork1.addNewStakeholder("4", "R4", "Router4", 3, 5, 5);
    // resolutionNetwork1.addNewStakeholder("4", "N1", "Signaller", 2, 2, 2);
    // resolutionNetwork1.addNewStakeholder("5", "O1", "Orange Army", 2, 1, 1);





    // ========================================================================== //
    // Movables


    let movables = new MovableCommodities("Trains");
    movables.addNewMovable("1", 5, 5, 1, positionNetwork1, resolutionNetwork1);

    //Create a new UTN
    let utn1 = new UTN("1", "RailSystem", positionNetwork1, movables, resolutionNetwork1)

    //Saves the UTN
    myUTNs.set(utn1.id, utn1);

    return myUTNs;

};