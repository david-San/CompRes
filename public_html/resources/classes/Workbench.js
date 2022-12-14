/** 
 * David Sanchez
 * Newcastle University
 * 
 * 2022 Mar 02: Created
 * I have decided to use ES6 (ECMAScript 2015) class declaration rather than ES5 
 * "class className{constructor}" rather than "var className=function()"
 * because:
 * - Even though it is not a real class, VisualStudioCode identifies as a class.
 * - I think that in a near future, I need to change the implementation to full 
 *   prototype based because otherwise I will not have enough performance 
 *   when dealing with large models.
 * - #private variables are almost ready to be used in every browser.
 *   Once approved it will be easier to upates private variables to  hashtag
 * - Private methods have to me simulated in Javascript and all have problems:
 *   WeakMaps: require closure, and internally is the same. Good for node.js.
 *   https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
 *   Symbols: are a hack.
 *   https://exploringjs.com/es6/ch_classes.html
 *   Better keep evertyhing inside the constructor. Once #private available is 
 *   easier to move outside and check if there is a peformance gain.
 * 2022 Apr 11: Update
 * Recreated into an object so it is easier to maintain
 * 
 */





/**
 * This class starts the object creation and the simulation
 */
class Workbench {


    /**
     * 
     */
    constructor() {


        // ========================================================================== //
        // Privileged attributes

        //Interface structures
        let _samples = [];
        let _plotDownloadOptions = [];
        this.samples = _samples;
        this._that = this;

        //Internal structures
        this.visualiser;
        //Databank
        this.workbenchDataBank;

        //Exporting plot drawings configuration
        this.config = {
            responsive: true,
            toImageButtonOptions: {
                format: 'svg', // one of png, svg, jpeg, webp
                filename: 'custom_image',

                //height: "", //Dynamic screen size
                //width: "", //Dynamic screen size

                //Square illustrations
                //height: 500, //Produce exports or the same size
                //width: 700, //Produce exports or the same size

                //Panoramic illustrations
                //height: 400, //Produce exports or the same size
                //width: 1200, //Produce exports or the same size

                scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
            }
        };







        // ========================================================================== //
        // Private attributes





        // ========================================================================== //
        // Private methods





        /**
         * This private method creates the sample menus
         */
        var createSampleMenu = function () {





            /**
             * This method pushes sample elements into the samples queue
             * @param {type} element
             * @returns {undefined}
             */
            var sampleMenuPush = function (element) {

                _samples.push(element);

                //It pushes the element to the menu
                sampleMenuCreate(element);
            };





            /**
             * This  method creates one sample menu
             * 
             * @param {type} sample
             * @returns {undefined}
             */
            var sampleMenuCreate = function (sample) {

                //It attaches an event handler for the "select sample" menu
                let paragraphElement = document.getElementById('samples_dropdown');

                //creating the menu item
                let myMenuItem = document.createElement("option");
                myMenuItem.setAttribute("value", sample.id);
                myMenuItem.text = "Sample " + sample.id;

                /*Append the menu item*/
                paragraphElement.appendChild(myMenuItem);
            };





            /**
             * This method handles events received from the select menu when loading a sample policy
             * 
             * @returns {undefined}
             */
            var sampleMenuHandleSelect = function () {

                //Selected index
                let selIndex = this.selectedIndex;

                if (selIndex !== 0) {


                    //It adjustes the index to use on an array
                    selIndex = (selIndex > 0) ? selIndex - 1 : selIndex;

                    //Finds the textSample corresponding to the selected value
                    let sample = _samples[selIndex];

                    // let x = window.confirm("Are you sure you want to load Sample " + sample.id + "?");
                    let x = true;

                    if (x) {

                        //Updates the interface with the samples
                        sampleMenuSetValues(sample);

                    } else {

                        //It resets the menu to show the 'Samples...' label
                        this[0].selected = "selected";

                    }
                }
            };





            /**
             * This method sets the interface with a JSON object.
             * 
             * @param {JSON} parameters 
             */
            var sampleMenuSetValues = function (parameters) {

                //Writing parameters to the interface

                //Commmon
                document.getElementById("numberOfCells").value = parameters.numberOfCells;
                document.getElementById("numberOfFrames").value = parameters.numberOfFrames;
                document.getElementById("framesDiscard").value = parameters.initialFramesToDiscard;


                document.getElementById("densityInit").value = parameters.densityInit;
                document.getElementById("densityEnd").value = parameters.densityEnd;
                document.getElementById("densitySteps").value = parameters.densitySteps;

                document.getElementById("plotMaximumYValue").value = parameters.plotMaximumYValue;
                document.getElementById("plotMinimumYValue").value = parameters.plotMinimumYValue;

                document.getElementById("movableMaxSpeed").value = parameters.movableMaxSpeed;
                document.getElementById("movablePerformanceHighLimit").value = parameters.movablePerformanceHighLimit;
                document.getElementById("movablePerformanceLowLimit").value = parameters.movablePerformanceLowLimit;

                //Control
                document.getElementById("controlProbabilityRandomBrake").value = parameters.controlProbabilityRandomBrake;
                document.getElementById("controlNumberOfSimulations").value = parameters.controlNumberOfSimulations;
                document.getElementById("controlMovablesHacked").value = parameters.controlMovablesHacked;

                //Attack
                document.getElementById("attackProbabilityRandomBrake").value = parameters.attackProbabilityRandomBrake;
                document.getElementById("attackNumberOfSimulations").value = parameters.attackNumberOfSimulations;
                document.getElementById("attackMovablesHacked").value = parameters.attackMovablesHacked;

            }






            //It attaches an event handler for the "select sample" menu
            if (document.getElementById('samples_dropdown') != null)
                document.getElementById('samples_dropdown').addEventListener('change', sampleMenuHandleSelect, false);

            let mySample1 = {
                "id": 1,
                "numberOfCells": 50,
                "numberOfFrames": 60,
                "initialFramesToDiscard": 10,
                "densityInit": 0.01,
                "densityEnd": 0.5,
                "densitySteps": 3,
                "plotMaximumYValue": 100,
                "plotMinimumYValue": -.5,

                "movableMaxSpeed": 5,
                "movablePerformanceHighLimit": 5,
                "movablePerformanceLowLimit": 0.5,

                "controlNumberOfSimulations": 10,
                "controlProbabilityRandomBrake": 0.1,
                "controlMovablesHacked": 0,

                "attackNumberOfSimulations": 10,
                "attackProbabilityRandomBrake": 0.1,
                "attackMovablesHacked": 1
            }

            sampleMenuPush(mySample1);

            let mySample2 = {
                "id": 2,
                "numberOfCells": 50,
                "numberOfFrames": 60,
                "initialFramesToDiscard": 10,
                "densityInit": 0.01,
                "densityEnd": 0.5,
                "densitySteps": 20,
                "plotMaximumYValue": 120,
                "plotMinimumYValue": -.5,

                "movableMaxSpeed": 5,
                "movablePerformanceHighLimit": 5,
                "movablePerformanceLowLimit": 0.5,

                "controlNumberOfSimulations": 100,
                "controlProbabilityRandomBrake": 0.1,
                "controlMovablesHacked": 0,

                "attackNumberOfSimulations": 100,
                "attackProbabilityRandomBrake": 0.5,
                "attackMovablesHacked": 0
            }

            sampleMenuPush(mySample2);

            let mySample3 = {
                "id": 3,
                "numberOfCells": 50,
                "numberOfFrames": 60,
                "initialFramesToDiscard": 10,
                "densityInit": 0.01,
                "densityEnd": 0.5,
                "densitySteps": 20,
                "plotMaximumYValue": 120,
                "plotMinimumYValue": -.5,

                "movableMaxSpeed": 5,
                "movablePerformanceHighLimit": 5,
                "movablePerformanceLowLimit": 0.1,

                "controlNumberOfSimulations": 100,
                "controlProbabilityRandomBrake": 0.1,
                "controlMovablesHacked": 0,

                "attackNumberOfSimulations": 100,
                "attackProbabilityRandomBrake": 0.1,
                "attackMovablesHacked": 1
            }

            sampleMenuPush(mySample3);

        }





        /**
          * This private method creates the plot download options menu
          */
        var createDownloadOptionsMenu = function () {






            /**
                * This method pushes plot Download elements into the plotDownloadOptions queue
                * @param {type} element
                * @returns {undefined}
                */
            var plotDownloadOptionsMenuPush = function (element) {

                _plotDownloadOptions.push(element);

                //It pushes the element to the menu
                plotDownloadOptionsMenuCreate(element);
            };





            /**
             * This  method creates one sample menu
             * 
             * @param {type} option
             * @returns {undefined}
             */
            var plotDownloadOptionsMenuCreate = function (option) {

                //It attaches an event handler for the "select sample" menu
                let paragraphElement = document.getElementById('plotDownloadOptions_dropdown');

                //creating the menu item
                let myMenuItem = document.createElement("option");
                myMenuItem.setAttribute("value", option.id);
                myMenuItem.text = option.description;

                /*Append the menu item*/
                paragraphElement.appendChild(myMenuItem);
            };





            /**
             * This method handles events received from the select menu when loading a sample policy
             * 
             * @returns {undefined}
             */
            var plotDownloadOptionsMenuHandleSelect = function () {

                //Selected index
                let selIndex = this.selectedIndex;

                //Finds the textSample corresponding to the selected value
                let option = _plotDownloadOptions[selIndex];

                // let x = window.confirm("Are you sure you want to load " + selIndex + "?");

                //Updates the interface with the options
                plotDownloadOptionsMenuSetValues(option);

            };





            /**
            * This method sets the interface with a JSON object.
            * 
            * @param {JSON} parameters 
            */
            var plotDownloadOptionsMenuSetValues = function (parameters) {

                workbench.config.toImageButtonOptions.width = parameters.width
                workbench.config.toImageButtonOptions.height = parameters.height;

            }





            //It attaches an event handler for the "select sample" menu
            if (document.getElementById('plotDownloadOptions_dropdown') != null)
                document.getElementById('plotDownloadOptions_dropdown').addEventListener('change', plotDownloadOptionsMenuHandleSelect, false);


            let myPlotOption1 = {
                "id": 0,
                "description": "Relative to Window size",
                "width": "",
                "height": ""
            }
            plotDownloadOptionsMenuPush(myPlotOption1);

            let myPlotOption2 = {
                //Produce exports for square illustrations.
                "id": 1,
                "description": "Square illustrations (700x500)",
                "width": 700,
                "height": 500
            }
            plotDownloadOptionsMenuPush(myPlotOption2);

            let myPlotOption3 = {
                //Produce exports for wide illustrations
                "id": 2,
                "description": "Panoramic illustrations (1200x400)",
                "width": 1200,
                "height": 400
            }
            plotDownloadOptionsMenuPush(myPlotOption3);



            //Set default
            document.getElementById('plotDownloadOptions_dropdown').selectedIndex = 0;

        }





        /**
         * This method inits the Workbench ataching interface elements to methods
         */
        var init = function () {

            //Creates menus
            createSampleMenu();
            createDownloadOptionsMenu();

        };





        // ========================================================================== //
        // Privileged methods







        //Init the workbench
        init();
    }





    // ========================================================================== //
    // Public methods (Prototype methods)





    /**
     * This method reads the interface and creates a JSON object with the values.
     * 
     * @returns JSON
     */
    readInterface() {

        //Common to control simulations and attack simulations
        const numberOfCells = parseInt(document.getElementById("numberOfCells").value);
        const numberOfFrames = parseInt(document.getElementById("numberOfFrames").value);
        const initialFramesToDiscard = parseInt(document.getElementById("framesDiscard").value);

        const densityInit = parseFloat(document.getElementById("densityInit").value);
        const densityEnd = parseFloat(document.getElementById("densityEnd").value);
        const densitySteps = parseInt(document.getElementById("densitySteps").value);

        const plotMaximumYValue = parseFloat(document.getElementById("plotMaximumYValue").value);
        const plotMinimumYValue = parseFloat(document.getElementById("plotMinimumYValue").value);

        const movableMaxSpeed = parseFloat(document.getElementById("movableMaxSpeed").value);
        const movablePerformanceHighLimit = parseFloat(document.getElementById("movablePerformanceHighLimit").value);
        const movablePerformanceLowLimit = parseFloat(document.getElementById("movablePerformanceLowLimit").value);

        //Control simulations only
        const controlNumberOfSimulations = parseFloat(document.getElementById("controlNumberOfSimulations").value);
        const controlNumberOfHackedMovables = parseFloat(document.getElementById("controlMovablesHacked").value);

        const controlProbabilityRanDomBrakeUniform = document.getElementById("controlProbabilityRandomBrakeUniform").checked;
        const controlProbabilityRanDomBrakeMultiple = document.getElementById("controlProbabilityRandomBrakeMultiple").checked;
        const controlProbabilityRandomBrake = parseFloat(document.getElementById("controlProbabilityRandomBrake").value);


        //Attack simulations only
        const attackNumberOfSimulations = parseFloat(document.getElementById("attackNumberOfSimulations").value);
        const attackNumberOfHackedMovables = parseFloat(document.getElementById("attackMovablesHacked").value);


        const attackProbabilityRandomBrakeUniform = document.getElementById("attackProbabilityRandomBrakeUniform").checked;
        const attackProbabilityRandomBrakeMultiple = document.getElementById("attackProbabilityRandomBrakeMultiple").checked;
        const attackProbabilityRandomBrake = parseFloat(document.getElementById("attackProbabilityRandomBrake").value);



        const controlProbabilityRandomBrakeArray = [];
        const attackProbabilityRandomBrakeArray = [];

        //Read Control Multiple probability Random Brake
        if (controlProbabilityRanDomBrakeMultiple === true) {

            for (let i = 0; i < numberOfCells; i++) {
                let myInputValue = parseFloat(document.getElementById("controlProbabilityCell" + i).value);
                controlProbabilityRandomBrakeArray.push(myInputValue);
            }
        }



        //Read Attack Multiple probability Random Brake
        if (attackProbabilityRandomBrakeMultiple === true) {

            for (let i = 0; i < numberOfCells; i++) {
                let myInputValue = parseFloat(document.getElementById("attackProbabilityCell" + i).value);
                attackProbabilityRandomBrakeArray.push(myInputValue);
            }
        }





        //Creating a new databank with the common parameters to control and attack simulations
        this.workbenchDataBank = new WorkbenchDataBank(
            numberOfCells,
            numberOfFrames,
            initialFramesToDiscard,
            densityInit,
            densityEnd,
            densitySteps,
            plotMaximumYValue,
            plotMinimumYValue,
            movableMaxSpeed,
            movablePerformanceHighLimit,
            movablePerformanceLowLimit,
            controlNumberOfSimulations,
            controlNumberOfHackedMovables,
            controlProbabilityRandomBrake,
            controlProbabilityRanDomBrakeMultiple,
            controlProbabilityRandomBrakeArray,
            attackNumberOfSimulations,
            attackNumberOfHackedMovables,
            attackProbabilityRandomBrake,
            attackProbabilityRandomBrakeMultiple,
            attackProbabilityRandomBrakeArray);
    }










    /**
     *  This method writes back to the interface using a JSON object with the values.
     * 
     */

    writeInterface() {

        //Common to control simulations and attack simulations
        document.getElementById("numberOfCells").value = this.workbenchDataBank.common.numberOfCells;
        document.getElementById("numberOfFrames").value = this.workbenchDataBank.common.numberOfFrames;

        document.getElementById("framesDiscard").value = this.workbenchDataBank.common.initialFramesToDiscard;
        document.getElementById("densityInit").value = this.workbenchDataBank.common.densityInit;
        document.getElementById("densityEnd").value = this.workbenchDataBank.common.densityEnd;
        document.getElementById("densitySteps").value = this.workbenchDataBank.common.densitySteps;

        document.getElementById("plotMaximumYValue").value = this.workbenchDataBank.common.plotMaximumYValue;
        document.getElementById("plotMinimumYValue").value = this.workbenchDataBank.common.plotMinimumYValue;

        document.getElementById("movableMaxSpeed").value = this.workbenchDataBank.common.movableMaxSpeed;
        document.getElementById("movablePerformanceHighLimit").value = this.workbenchDataBank.common.movablePerformanceHighLimit;
        document.getElementById("movablePerformanceLowLimit").value = this.workbenchDataBank.common.movablePerformanceLowLimit;

        //Control simulations only
        document.getElementById("controlNumberOfSimulations").value = this.workbenchDataBank.control.numberOfSimulations;
        document.getElementById("controlMovablesHacked").value = this.workbenchDataBank.control.numberOfHackedMovables;
        document.getElementById("controlProbabilityRandomBrake").value = this.workbenchDataBank.control.probabilityRandomBrake;
        document.getElementById("controlProbabilityRandomBrakeMultiple").checked = this.workbenchDataBank.control.probabilityRandomBrakeMultiple;

        //Writing multiple probability random Brake control fields
        if (this.workbenchDataBank.control.probabilityRandomBrakeMultiple === true) {
            const container = document.getElementById("controlProbabilityMultipleValue");
            const numberOfCells = this.workbenchDataBank.common.numberOfCells;
            const uniformValue = this.workbenchDataBank.control.probabilityRandomBrake;
            const fieldNamePrefix = "controlProbabilityCell"
            const probabilityRandomBrakeArray = this.workbenchDataBank.control.probabilityRandomBrakeArray;

            this.createMultipleProbabilityRandomBrakeInputFields(
                container,
                numberOfCells,
                uniformValue,
                fieldNamePrefix,
                probabilityRandomBrakeArray);
        }





        //Attack simulations only
        document.getElementById("attackNumberOfSimulations").value = this.workbenchDataBank.attack.numberOfSimulations;
        document.getElementById("attackMovablesHacked").value = this.workbenchDataBank.attack.numberOfHackedMovables;
        document.getElementById("attackProbabilityRandomBrake").value = this.workbenchDataBank.attack.probabilityRandomBrake;

        document.getElementById("attackProbabilityRandomBrakeMultiple").checked = this.workbenchDataBank.attack.probabilityRandomBrakeMultiple;

        //Writing multiple probability random Brake attack fields
        if (this.workbenchDataBank.attack.probabilityRandomBrakeMultiple === true) {
            const container = document.getElementById("attackProbabilityMultipleValue");
            const numberOfCells = this.workbenchDataBank.common.numberOfCells;
            const uniformValue = this.workbenchDataBank.attack.probabilityRandomBrake;
            const fieldNamePrefix = "attackProbabilityCell";
            const probabilityRandomBrakeArray = this.workbenchDataBank.attack.probabilityRandomBrakeArray;

            this.createMultipleProbabilityRandomBrakeInputFields(
                container,
                numberOfCells,
                uniformValue,
                fieldNamePrefix,
                probabilityRandomBrakeArray);
        }



    }





    /**
     * Creates the same simulation for two different parameters.
     * One of the correspond to the parameters of control, the other to the parameters
     * of attack
     */
    createSimulations() {

        //Reading the interface
        this.readInterface();

        //Common
        const numberOfCells = this.workbenchDataBank.common.numberOfCells;
        const numberOfFrames = this.workbenchDataBank.common.numberOfFrames;
        const initialFramesToDiscard = this.workbenchDataBank.common.initialFramesToDiscard;

        const densityInit = this.workbenchDataBank.common.densityInit;
        const densityEnd = this.workbenchDataBank.common.densityEnd;
        const densitySteps = this.workbenchDataBank.common.densitySteps;

        const movableMaxSpeed = this.workbenchDataBank.common.movableMaxSpeed;
        const performanceHighLimit = this.workbenchDataBank.common.movablePerformanceHighLimit;
        const performanceLowLimit = this.workbenchDataBank.common.movablePerformanceLowLimit;

        //Control
        const controlNumberOfSimulations = this.workbenchDataBank.control.numberOfSimulations;
        const controlNumberOfHackedMovables = this.workbenchDataBank.control.numberOfHackedMovables;
        const controlProbabilityRandomBrake = this.workbenchDataBank.control.probabilityRandomBrake;
        const controlProbabilityRandomBrakeMultiple = this.workbenchDataBank.control.probabilityRandomBrakeMultiple;
        const controlProbabilityRandomBrakeArray = this.workbenchDataBank.control.probabilityRandomBrakeArray;

        //Attack
        const attackNumberOfSimulations = this.workbenchDataBank.attack.numberOfSimulations;
        const attackNumberOfHackedMovables = this.workbenchDataBank.attack.numberOfHackedMovables;
        const attackProbabilityRandomBrake = this.workbenchDataBank.attack.probabilityRandomBrake;
        const attackProbabilityRandomBrakeMultiple = this.workbenchDataBank.attack.probabilityRandomBrakeMultiple;
        const attackProbabilityRandomBrakeArray = this.workbenchDataBank.attack.probabilityRandomBrakeArray;



        const myControlSimulation = this.createSimulation(
            numberOfCells,
            numberOfFrames,
            initialFramesToDiscard,
            densityInit,
            densityEnd,
            densitySteps,
            movableMaxSpeed,
            performanceHighLimit,
            performanceLowLimit,

            controlNumberOfSimulations,
            controlNumberOfHackedMovables,
            controlProbabilityRandomBrake,
            controlProbabilityRandomBrakeMultiple,
            controlProbabilityRandomBrakeArray
        )

        const myAttackSimulation = this.createSimulation(
            numberOfCells,
            numberOfFrames,
            initialFramesToDiscard,
            densityInit,
            densityEnd,
            densitySteps,
            movableMaxSpeed,
            performanceHighLimit,
            performanceLowLimit,

            attackNumberOfSimulations,
            attackNumberOfHackedMovables,
            attackProbabilityRandomBrake,
            attackProbabilityRandomBrakeMultiple,
            attackProbabilityRandomBrakeArray
        )


        //Storing the results of the simulation into the databank
        this.workbenchDataBank.control.simulations = myControlSimulation;
        this.workbenchDataBank.attack.simulations = myAttackSimulation;

        //Visualise results
        this.visualiser = new Visualiser(this.workbenchDataBank);


    }





    /**
     * This method creates the simulations with different densities
     */
    createSimulation(
        numberOfCells,
        numberOfFrames,
        initialFramesToDiscard,
        densityInit,
        densityEnd,
        densitySteps,
        movableMaxSpeed,
        performanceHighLimit,
        performanceLowLimit,

        numberOfSimulations,
        numberOfHackedMovables,
        probabilityRandomBrake,
        probabilityRandomBrakeMultiple,
        probabilityRandomBrakeArray) {


        //New simlations map to store all runnings
        const mySimulations = new Map();

        //Creating densities range
        const densityStepNoRounded = ((densityEnd - densityInit) / densitySteps);
        // const densityStep = this.round(densityStepNoRounded, 2);
        const densityStep = densityStepNoRounded;

        let myDensities = [];
        let myDensityAccumulator = 0;
        myDensityAccumulator = myDensityAccumulator + densityInit;

        //Creating all density steps
        for (let i = 0; i <= densitySteps; i++) {

            myDensities.push(myDensityAccumulator);
            // myDensityAccumulator = this.round(myDensityAccumulator + densityStep, 2);
            myDensityAccumulator = myDensityAccumulator + densityStep;
        }


        //Creating the simulations(iterations)
        for (let i = 0; i < numberOfSimulations; i++) {

            //Creating a map to store each iteration of the simulation.
            //Each iteration has one or more densities
            let myNthSimulation = new Map();

            //Creating all simulations with the given densities
            for (let j = 0; j < myDensities.length; j++) {

                // Scenario 1. Between the ranges of the simulation
                let mySimulator = new Simulator(
                    numberOfCells,
                    myDensities[j],
                    initialFramesToDiscard,
                    performanceLowLimit,
                    performanceHighLimit,
                    probabilityRandomBrake,
                    probabilityRandomBrakeMultiple,
                    probabilityRandomBrakeArray,
                    movableMaxSpeed,
                    numberOfHackedMovables
                );

                //Getting the simulation results, which is a Map.
                let mySimulationResult = mySimulator.run(numberOfFrames);

                //Saving the simulation into a Map
                myNthSimulation.set(myDensities[j], mySimulationResult);
            }

            //Storing the simulation with all other iterations
            mySimulations.set(i, myNthSimulation);
        }

        return mySimulations;
    }





    /**
     * This method calculates the resilience index for the flow.
     * It takes into consideration the common resilience region.
     */
    calculateResilienceIndex() {


        //Storing the results of the simulation into the databank
        const simulationControl = this.workbenchDataBank.control.simulations;
        const simulationAttack = this.workbenchDataBank.attack.simulations;

        const myControlRegionTraces = this.calculateResilienceRegion(simulationControl, "Max", "Min");
        const myAttackRegionTraces = this.calculateResilienceRegion(simulationAttack, "Max attack", "Min attack");


        this.workbenchDataBank.control.controlRegionTraces = myControlRegionTraces;
        this.workbenchDataBank.attack.attackRegionTraces = myAttackRegionTraces;



        //Placing Max into a Map for easy finding values
        const myControlRegionMaxMap = new Map();
        const topMax = myControlRegionTraces.get(0).x.length;
        for (let i = 0; i < topMax; i++) {
            myControlRegionMaxMap.set(
                myControlRegionTraces.get(0).x[i],
                myControlRegionTraces.get(0).y[i],
            )
        }

        //Placing Min into a Map for easy finding values
        const myControlRegionMinMap = new Map();
        const topMin = myControlRegionTraces.get(1).x.length;
        for (let i = 0; i < topMin; i++) {
            myControlRegionMinMap.set(
                myControlRegionTraces.get(1).x[i],
                myControlRegionTraces.get(1).y[i],
            )
        }





        //Control
        const topControl = simulationControl.size;

        for (let i = 0; i < topControl; i++) {

            let mySimulation = simulationControl.get(i);

            //Iterating the map
            for (const [density, simulatorResult] of mySimulation) {

                simulatorResult.resilienceFlowBoundaryRegionMax = myControlRegionMaxMap.get(density);
                simulatorResult.resilienceFlowBoundaryRegionMin = myControlRegionMinMap.get(density);

                simulatorResult.resilienceFlowIndexMax = simulatorResult.totalMovablesCrossedFinishLine /
                    simulatorResult.resilienceFlowBoundaryRegionMax;

                simulatorResult.resilienceFlowIndexMin = simulatorResult.totalMovablesCrossedFinishLine /
                    simulatorResult.resilienceFlowBoundaryRegionMin;
            }
        }





        //Attack
        const topAttack = simulationAttack.size;

        for (let i = 0; i < topAttack; i++) {

            let mySimulation = simulationAttack.get(i);

            //Iterating the map
            for (const [density, simulatorResult] of mySimulation) {

                simulatorResult.resilienceFlowBoundaryRegionMax = myControlRegionMaxMap.get(density);
                simulatorResult.resilienceFlowBoundaryRegionMin = myControlRegionMinMap.get(density);

                simulatorResult.resilienceFlowIndexMax = simulatorResult.totalMovablesCrossedFinishLine /
                    simulatorResult.resilienceFlowBoundaryRegionMax;

                simulatorResult.resilienceFlowIndexMin = simulatorResult.totalMovablesCrossedFinishLine /
                    simulatorResult.resilienceFlowBoundaryRegionMin;
            }
        }
    }





    /**
     * This method calculates the resilience reigion numerically.
     */
    calculateResilienceRegion(simulations, maxTag, minTag) {

        const topSimulations = simulations.size;
        const traces = new Map();

        //Create a new object trace to store results to be collected

        const myTraceMax = {
            x: new Array(),
            y: new Array(),
            name: maxTag,
        };

        const myTraceMin = {
            x: new Array(),
            y: new Array(),
            name: minTag,
        };

        for (let i = 0; i < topSimulations; i++) {

            //Getting each iteration of a simulation
            let simulation = simulations.get(i);
            let densities = Array.from(simulation.keys());

            let topDensities = densities.length;





            for (let j = 0; j < topDensities; j++) {

                //Traversing all densities in a simulation
                let totalMovablesCrossedFinishLine = simulation.get(densities[j]).totalMovablesCrossedFinishLine;

                if (typeof myTraceMax.y[j] === 'undefined') {

                    myTraceMax.x.push(densities[j]);
                    myTraceMax.y.push(totalMovablesCrossedFinishLine);

                } else if (totalMovablesCrossedFinishLine > myTraceMax.y[j]) {

                    myTraceMax.y[j] = totalMovablesCrossedFinishLine;
                }




                if (typeof myTraceMin.y[j] === 'undefined') {

                    myTraceMin.x.push(densities[j]);
                    myTraceMin.y.push(totalMovablesCrossedFinishLine);

                } else if (totalMovablesCrossedFinishLine < myTraceMin.y[j]) {

                    myTraceMin.y[j] = totalMovablesCrossedFinishLine;
                }


            }

            //Adding the new series to the traces using the iteration i as key
            traces.set(0, myTraceMax);
            traces.set(1, myTraceMin);

        }

        return traces;
    }





    /**
     * 
     * This prototype method draw the results
     * 
     */
    drawResults() {

        this.visualiser = new Visualiser(this.workbenchDataBank, this.config);
        this.visualiser.drawResults();
        this.visualiser.createSimulationLinks();

    }





    /**
     * 
     * This prototype method starts everything 
     * To do so, it initialises most of the parameters required to start a simulation
     * 
     */
    run() {

        this.createSimulations();
        this.calculateResilienceIndex();
        this.drawResults();
    }





    /**
     * 
     * This prototype method loads previously saved datasets.
     * 
     */
    load() {

        let myWorkBenchDataBank;

        async function loadFile(file, that) {
            let text = await file.text();

            myWorkBenchDataBank = new WorkbenchDataBank(text);

            that.workbenchDataBank = myWorkBenchDataBank;

            that.writeInterface();
            that.drawResults();

        }

        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = _this => {
            loadFile(input.files[0], this);

        };

        input.click();

    }





    /**
     * 
     * This prototype method saves current dataset.
     * 
     * It has to download text as a blob because it is too large to do it with 
     * a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(myWorkbenchDataBank);
     * 
     * 
     * Based on this site:
     * 
     * https://www.bennadel.com/blog/3472-downloading-text-using-blobs-url-createobjecturl-and-the-anchor-download-attribute-in-javascript.htm
     * 
     * https://stackoverflow.com/questions/70732624/how-to-download-url-from-createobjecturl-and-save-it-in-a-folder
     */

    save() {

        if (typeof this.workbenchDataBank !== 'undefined') {

            //Actually, it is not needed to stringify the data first, because I am saving using Blob
            //Stringify uses a recursive method to handle maps.
            //This is very memory intensive and does not work for large objects.
            //Only activate this option for debugging small objects
            // const myWorkbenchDataBank = this.workbenchDataBank.toString();

            const myWorkbenchDataBank = this.workbenchDataBank;

            //It appends the element to a document model to save it, using the appropriate encoding set
            //I had to download it as a blob because the size is too large.
            const blob = new Blob(
                [myWorkbenchDataBank], //Blob parts
                { type: "text/plain;charset=utf-8" }
            );

            const downloadURL = URL.createObjectURL(blob);

            const output = document.createElement('a');
            output.href = downloadURL;
            output.target = '_blank';
            output.download = 'CompRes.txt';

            //It forces a download
            // document.body.appendChild(output);
            output.click();

            //This releases the resource for another download
            URL.revokeObjectURL(output.href);

        }
    }







    /**
     * This prototype method download the datasets.
     * 
     * The datasets are basically text file in which there is a minified JSON object.
     * They are large in size because they are plain text.
     * I compressed them in zip and I am distributing them with the source code.
     * 
     * They have to be downloaded first, then unzip and then uploaded again because:
     * - Compressed they are small but uncompressed are too large to be hosted in
     *   github cheapily
     * - I cannot uncompressed them on the fly in the webpage because thre are no
     *   .zip uncompressors that work in Javascript at this moment.
     * 
     * Datasets are just a run of Sample 1, Sample 2 and Sample 3. 
     * Due to the nature of the simulator, it is unlikely that you will get the same
     * simulation if you run those samples again. So, in order to produce the article
     * I needed to have a stable simulation to do the illustrations and analsyis. 
     *
     * 
     * 
     */
    downloadDatasets() {



        const datasets = document.createElement('a');
        datasets.setAttribute("href", "../datasets/datasets.zip");
        datasets.setAttribute("download", "datasets.zip");
        datasets.setAttribute("target", "_blank");
        datasets.click();
    }




















    /**
     * This method creates as much entry fields as it is indicated in the 
     * number of cells input field and adds it to the scrollable panel.
     * 
     * This method is used in two ways.
     * First, when interacting with the interface and when loading a saved
     * simulation into the program
     * 
         * 
         * @param {DOM} container 
         */
    createMultipleProbabilityRandomBrakeInputFields(container, numberOfCells, uniformValue, fieldNamePrefix, probabilityRandomBrakeArray) {

        //Removing previous input elments
        container.innerHTML = '';

        for (let i = 0; i < numberOfCells; i++) {

            let mySpan = document.createElement("span");
            mySpan.setAttribute("class", "labelScroll");
            mySpan.innerHTML = i;

            let myInputField = document.createElement("input");
            myInputField.setAttribute("class", "input");
            myInputField.setAttribute("type", "text");
            myInputField.setAttribute("id", fieldNamePrefix + i);

            //Prefilling the input field

            if (typeof probabilityRandomBrakeArray !== 'undefined') {
                myInputField.value = probabilityRandomBrakeArray[i];
            } else {
                myInputField.value = uniformValue;
            }

            //Adding the field to the scrollable element
            container.append(mySpan);
            container.append(myInputField);
        }

        //Display panel
        container.style.display = "block";
    }




}





var workbench = new Workbench();