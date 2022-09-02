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
 var sample2 = function () {

    let myUTNs = new Map();

    let positionNetwork1 = new PositionNetwork("Rail");
    positionNetwork1.addNewNode(1, "A", 1, 5);
    positionNetwork1.addNewNode(2, "S1", 2, 5);
    positionNetwork1.addNewNode(3, "S2", 3, 5);
    positionNetwork1.addNewNode(4, "S3", 4, 5);
    positionNetwork1.addNewNode(5, "S4", 5, 5);
    positionNetwork1.addNewNode(6, "S5", 6, 5);
    positionNetwork1.addNewNode(7, "S6", 7, 5);
    positionNetwork1.addNewNode(8, "B", 8, 5);

    let resolutionNetwork1 = new ResolutionNetwork("RailSystemDecision");

    let sensorWaterValues1 = [0, 0, 0, 0, 34, 25, 34, 26];
    resolutionNetwork1.addNewSensor("Water", "W", 2, 5, "m", sensorWaterValues1);;

    resolutionNetwork1.addNewStakeholder("1", "S1", "Signaller", 2);
    resolutionNetwork1.addNewStakeholder("2", "O1", "Orange Army", 2);

    let movables = new MovableCommodities("Trains");
    movables.addNewMovable("1", 1, 5, 1, positionNetwork1, resolutionNetwork1);

    //Create a new UTN
    let utn1 = new UTN("1", "RailSystem", positionNetwork1, movables, resolutionNetwork1)

    //Saves the UTN
    myUTNs.set(utn1.id, utn1);

    let positionNetwork2 = new PositionNetwork("Bus");
    positionNetwork2.addNewNode(10, "P", 2, 1);
    positionNetwork2.addNewNode(11, "P1", 2, 2);
    positionNetwork2.addNewNode(2, "S1", 2, 3);
    positionNetwork2.addNewNode(3, "S2", 3, 4);
    positionNetwork2.addNewNode(4, "S3", 4, 5);
    positionNetwork2.addNewNode(5, "S4", 5, 6);
    positionNetwork2.addNewNode(6, "S5", 6, 7);
    positionNetwork2.addNewNode(7, "S6", 7, 8);
    positionNetwork2.addNewNode(8, "B", 8, 8);
    positionNetwork2.addNewNode(16, "P6", 8, 7);
    positionNetwork2.addNewNode(17, "Q", 9, 6);

    let resolutionNetwork2 = new ResolutionNetwork("BusSystemDecision");

    resolutionNetwork2.addNewStakeholder("1", "P1", "Bus Driver", 2);
    resolutionNetwork2.addNewStakeholder("2", "O1", "Mechanics", 2);

    let buses = new MovableCommodities("Bus");
    buses.addNewMovable("2", 2, 1, 2, positionNetwork2, resolutionNetwork2);

    //Create a new UTN
    let utn2 = new UTN("2", "BusSystem", positionNetwork2, buses, resolutionNetwork1)

    //Save the UTN
    myUTNs.set(utn2.id, utn2);

    return myUTNs;

};