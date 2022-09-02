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
var sample4 = function () {





// ========================================================================== //
// General

    const myStage = new Stage(5, 10);




// ========================================================================== //
// UTN 1

    const utnID1 = "1";
    myStage.UTNCreate(utnID1,"Train", '#0000ff');


// ========================================================================== //
// UTN 1: Position Network


    myStage.UTNPositionNetworkAddNode(utnID1, "A", 0, 1);
    myStage.UTNPositionNetworkAddNode(utnID1, "S1", 0, 2);
    myStage.UTNPositionNetworkAddNode(utnID1, "S2", 0, 3);
    myStage.UTNPositionNetworkAddNode(utnID1, "S3", 0, 4);
    myStage.UTNPositionNetworkAddNode(utnID1, "S4", 0, 5);
    myStage.UTNPositionNetworkAddNode(utnID1, "S5", 0, 6);
    myStage.UTNPositionNetworkAddNode(utnID1, "S6", 0, 7);
    myStage.UTNPositionNetworkAddNode(utnID1, "S7", 0, 8);
    myStage.UTNPositionNetworkAddNode(utnID1, "S8", 1, 7);
    myStage.UTNPositionNetworkAddNode(utnID1, "S9", 2, 6);
    myStage.UTNPositionNetworkAddNode(utnID1, "S10", 2, 5);
    myStage.UTNPositionNetworkAddNode(utnID1, "S11", 3, 4);
    myStage.UTNPositionNetworkAddNode(utnID1, "B", 3, 5);



// ========================================================================== //
// UTN 1: Resolution Network

    const concernRouting = "../classes/utn/networkResolution/Stakeholders/Router.js";
    const osiLayer3 = 3;

    myStage.UTNResolutionNetworkAddStakeholder(1,utnID1, "R1", "Router", osiLayer3, 0, 1, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(2,utnID1, "R2", "Router", osiLayer3, 0, 2, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(3,utnID1, "R3", "Router", osiLayer3, 0, 3, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(4,utnID1, "R4", "Router", osiLayer3, 0, 4, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(5,utnID1, "R5", "Router", osiLayer3, 0, 5, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(6,utnID1, "R6", "Router", osiLayer3, 0, 6, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(7,utnID1, "R7", "Router", osiLayer3, 0, 7, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(8,utnID1, "R8", "Router", osiLayer3, 0, 8, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(9,utnID1, "R9", "Router", osiLayer3, 1, 7, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(10,utnID1, "R10", "Router", osiLayer3, 2, 6, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(11,utnID1, "R11", "Router", osiLayer3, 2, 5, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(12,utnID1, "R12", "Router", osiLayer3, 3, 4, concernRouting);
    myStage.UTNResolutionNetworkAddStakeholder(13,utnID1, "R13", "Router", osiLayer3, 3, 5, concernRouting);


    const concernTelemetry = "../classes/utn/networkResolution/Stakeholders/Router.js";
    const osiLayer2 = 2;

    myStage.UTNResolutionNetworkAddStakeholder(14, utnID1, "W1", "Water", osiLayer2, 2, 5, concernTelemetry);
    
    const concernSignalling = "../classes/utn/networkResolution/Stakeholders/Router.js";
    const osiLayer4 = 4;

    myStage.UTNResolutionNetworkAddStakeholder(15, utnID1, "S1", "Signaller", osiLayer4, 1, 5, concernSignalling);
    

// ========================================================================== //
// UTN 1:Movables

    myStage.UTNAddMovable(1, utnID1, "M1", "Train1", "(1,5)", 0,1);








// ========================================================================== //
// UTN 2

const utnID2 = "2";
myStage.UTNCreate(utnID2,"Bus", '#ff0000');

// ========================================================================== //
// UTN 2: Position Network


myStage.UTNPositionNetworkAddNode(utnID2, "C", 2, 1);
myStage.UTNPositionNetworkAddNode(utnID2, "P1", 1, 2);
myStage.UTNPositionNetworkAddNode(utnID2, "P2", 2, 3);
myStage.UTNPositionNetworkAddNode(utnID2, "P3", 1, 4);
myStage.UTNPositionNetworkAddNode(utnID2, "P4", 0, 5);
myStage.UTNPositionNetworkAddNode(utnID2, "P5", 1, 6);
myStage.UTNPositionNetworkAddNode(utnID2, "P6", 1, 7);
myStage.UTNPositionNetworkAddNode(utnID2, "P7", 1, 8);
myStage.UTNPositionNetworkAddNode(utnID2, "P8", 2, 7);
myStage.UTNPositionNetworkAddNode(utnID2, "P9", 2, 6);
myStage.UTNPositionNetworkAddNode(utnID2, "P10", 2, 5);
myStage.UTNPositionNetworkAddNode(utnID2, "P11", 3, 3);
myStage.UTNPositionNetworkAddNode(utnID2, "D", 3, 6);





    // let movables = new MovableCommodities("Trains");
    // movables.addNewMovable("1", 1, 1, 1, positionNetwork1, resolutionNetwork1);

    //Create a new UTN
    // let utn1 = new UTN("1", "RailSystem", positionNetwork1, movables, resolutionNetwork1)

    //Saves the UTN
    // myUTNs.set(utn1.id, utn1);

    // let positionNetwork2 = new PositionNetwork("Bus");
    // positionNetwork2.addNewNode(10, "P", 2, 1);
    // positionNetwork2.addNewNode(11, "P1", 2, 2);
    // positionNetwork2.addNewNode(2, "S1", 2, 3);
    // positionNetwork2.addNewNode(3, "S2", 3, 4);
    // positionNetwork2.addNewNode(4, "S3", 4, 5);
    // positionNetwork2.addNewNode(5, "S4", 5, 6);
    // positionNetwork2.addNewNode(6, "S5", 6, 7);
    // positionNetwork2.addNewNode(7, "S6", 7, 8);
    // positionNetwork2.addNewNode(8, "B", 8, 8);
    // positionNetwork2.addNewNode(16, "P6", 8, 7);
    // positionNetwork2.addNewNode(17, "Q", 9, 6);

    // let resolutionNetwork2 = new ResolutionNetwork("BusSystemDecision");

    // resolutionNetwork2.addNewStakeholder("1", "P1", "Bus Driver", 2);
    // resolutionNetwork2.addNewStakeholder("2", "O1", "Mechanics", 2);

    // let buses = new MovableCommodities("Bus");
    // buses.addNewMovable("2", 2, 1, 2, positionNetwork2, resolutionNetwork2);

    // //Create a new UTN
    // let utn2 = new UTN("2", "BusSystem", positionNetwork2, buses, resolutionNetwork1)

    // //Save the UTN
    // myUTNs.set(utn2.id, utn2);


        //let resolutionNetwork1 = new ResolutionNetwork("RailSystemDecision");

    // let sensorWaterValues1 = [0, 0, 0, 0, 34, 25, 34, 26];
    // resolutionNetwork1.addNewSensor("Water", "W", 2, 5, "m", sensorWaterValues1);;

    // resolutionNetwork1.addNewStakeholder("1", "S1", "Signaller", 2);
    // resolutionNetwork1.addNewStakeholder("2", "O1", "Orange Army", 2);



    return myStage;

};