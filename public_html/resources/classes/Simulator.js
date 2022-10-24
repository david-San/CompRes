/* 
 * David Sanchez
 * Newcastle University
 * 
 * 2022 Mar 21: Created
 * This is a cellular automaton simulator.
 * 
 * I have decided to keep using ES5 class declaration instead of ES6(ECMAScript2015) 
 * ""var className=function()"" rather than class className{constructor}"
 * because this Class does not behave like a Java class and it is confusing. 
 * 
 * This is a full prototype class because I need a very fast performance and 
 * I do not care about private modifications of data.
 * (Private members Through closures-Pro JavaScript Design Pattersn, p.33)
 * Placing inside the constructor private variables and using scope: 
 * https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
 * Private methods have to me simulated in Javascript and it is no better
 * that what I already did
 * https://exploringjs.com/es6/ch_classes.html
 * 
 */





/**
 * This is a unidimensional cellular automaton simulator. 
 * Movable represents cars that can travel thorugh an array.
 * 
 * e.g.
 * # (number) is the speed of a movable commodity (movable) 
 * M occupies a block when travelling from one cell to another
 * M departs from A and final destination is B
 * A and B are nodes.
 * 
 * M....M....M....M......M.....M.....M.....M  
 * A---------------------------------------B 
 * 
 */

class Simulator {



    /**
     * Road length is the size of the road. 
     * 
     * 
     * @param {int} numberOfCells 
     * @param {float} density
     * @param {int} initialFramesToDiscard
     * @param {float} performanceLowLimit
     * @param {float} performanceHighLimit
     * @param {float} probabilityRandomBreak
     * @param {boolean} probabilityRandomBreakMultiple
     * @param {array} probabilityRandomBreakArray
     * @param {int} velocityMax
     * @param {int} movablesHacked
     */
    constructor(
        numberOfCells,
        density,
        initialFramesToDiscard,
        performanceLowLimit,
        performanceHighLimit,
        probabilityRandomBreak,
        probabilityRandomBreakMultiple,
        probabilityRandomBreakArray,
        velocityMax,
        movablesHacked) {





        // ========================================================================== //
        // Privileged attributes
        this.numberOfCells = numberOfCells;
        this.density = density;
        this.initialFramesToDiscard = initialFramesToDiscard;
        this.speedLowLimit = performanceLowLimit;
        this.speedHighLimit = performanceHighLimit;
        this.probabilityRandomBreak = probabilityRandomBreak;
        this.probabilityRandomBreakMultiple = probabilityRandomBreakMultiple;
        this.probabilityRandomBreakArray = probabilityRandomBreakArray;
        this.velocityMax = velocityMax;
        this.movablesHacked = movablesHacked;


        this._numberOfFrames;
        this._numberOfMovables;


        //This structure stores an additional reference to movables so it is faster
        //Each movable is stored in two places, in the _cell to have position and 
        //in this arrayOfMovables to acces the movable directly. This is done to hack the movables.
        this._arrayOfMovables;

        this._cells = new Array(numberOfCells);
        this._frames = new Map();

        //Performance metrics. Finish line is the last array postion
        this.totalMovablesCrossedFinishLine = 0;




        // ========================================================================== //
        // Private attributes







        // ========================================================================== //
        // Private methods





        // ========================================================================== //
        // Privileged methods





        //Init internal variable
        this.createCells();

        //Hack Movables
        this.hackMovables(movablesHacked);
    }





    // ========================================================================== //
    // Public methods (Prototype methods)





    /**
     * This creates the initial road.
     * We just populate an array of the given sidze using a random funtion
     * until we get the desired density.
     * 
     */
    createCells() {

        //I need to save this for metrics purposes
        const numberOfCells = this.numberOfCells;
        const density = this.density;
        const road = this._cells;
        const kind = "clear";
        let randomPosition;
        let numberOfmovables = Math.abs(Math.round(numberOfCells * density));
        let id = 0;

        this._numberOfMovables = numberOfmovables;

        //Optmization data structure to hack movables faster
        this._arrayOfMovables = new Array();


        //Creates a sensor that will be shared by all stakeholders
        let mySensor = new Sensor(
            numberOfCells,
            this.probabilityRandomBreak,
            this.probabilityRandomBreakMultiple,
            this.probabilityRandomBreakArray);


        if (numberOfmovables < numberOfCells) {

            while (numberOfmovables > 0) {

                randomPosition = Math.floor((Math.random() * numberOfCells));

                if (road[randomPosition] === undefined) {

                    let myStakeholder = new Stakeholder(
                        this.velocityMax, mySensor);

                    let myMovable = new Movable(id, randomPosition, myStakeholder, kind);

                    road[randomPosition] = myMovable;

                    //Keep a reference to the movable for easier hacking
                    this._arrayOfMovables.push(myMovable);

                    numberOfmovables = numberOfmovables - 1;
                    id = id + 1;
                }
            }
        }
    }







    /**
     * This hacks a movable
     */
    hackMovables(numberOfMovablesToHack) {

        const movables = this._arrayOfMovables;
        const numberOfMovables = movables.length;

        // console.log(movables);
        // console.log("numberOfMovables: "+ numberOfMovables);

        let randomPosition;
        let hackedMovables = 0;


        while ((numberOfMovablesToHack > hackedMovables) && (numberOfMovables > hackedMovables)) {

            // while ((numberOfMovablesToHack > 0) && (numberOfMovables >= numberOfMovablesToHack)) {

            randomPosition = Math.floor((Math.random() * numberOfMovables));

            if (movables[randomPosition] !== undefined) {

                let myMovable = movables[randomPosition];

                if (myMovable.kind === "clear") {

                    let myHackedStakeholder = new StakeholderHack1(this.probabilityRandomBreak, this.velocityMax);

                    myMovable.setStakeholder(myHackedStakeholder);
                    myMovable.setKind("hacked");
                    myMovable.setColour();

                    hackedMovables++;
                }
            }
        }
    }







    /**
     * This function checks how many spaces there are from a given position
     * occupied by a movable to the next movable.
     * Since this is a closed system, once it reaches the end, it keeps
     * searching at the beginning on the array.
     * It is guaranteed that it is going to find at least itself.
     *  
     * @param {Interger} position 
     * @returns Integer
     */
    findDistanceToNextMovable(position) {

        let distance = 0;
        const cells = this._cells;

        let i = (position + 1) % cells.length;

        while (cells[i] === undefined) {
            distance = distance + 1;
            i = i + 1;
            i = i % cells.length;
        }
        return distance;
    }





    /**
     * This creats a new frame using a closed system.
     * 
     * On a closed system, movables loop like in a Nascar race.
     * 
     * Cars that arrive to the end of the array are then feed back at the 
     * beginning of the array. This can also be seen as a loop pipeline
     * 
     * e.g.
     * 
     *    0 . .
     *    . 1 .
     *    . . 1
     *    1 . .
     *    . 1 .
     *    . . 1 
     * 
     * 
     * - The algorithm navigates the array from right to left.
     *   When doing so, it moves movables to the right according to speed.
     * 
     * - An interesting case happens at the end of the array.
     *   Since the movable has to be pushed to the begining, it has
     *   to be prevented the double evaluation.
     *   (The index loop is at the right coming to the left, and this 
     *   movable was already evaluated. Placing on the left will cause the 
     *   algorithm to evaluated it twice)
     *   To prevent double evaluation, off limit movables are placed in a 
     *   map that will be processed at the end of the automata loop.
     *   The map saves the position as key (since movables can occupy one
     *   position only) and the movable object as value.
     */
    createFrameClosedSystem() {

        const top = this._cells.length;
        const cells = this._cells;

        //movables move from left to right
        let i = 0;

        while (i < top) {

            if ((cells[i] !== undefined) && (cells[i].constructor === Movable)) {

                let nextMovableDistance = this.findDistanceToNextMovable(i);

                let myMovable = cells[i];

                myMovable.stakeholderDecide(nextMovableDistance, i);

                let myMovablePosition = myMovable.x;

                //Deletes the movable from the previous position
                delete cells[i];

                //Relocates the movable. 
                //Since this is a closed system, 
                //movables beyond the last array position are modulus located 
                //inside the array                    
                let newPosition = myMovablePosition % cells.length;

                //This updates the metrics on the system
                this.updateMetrics(newPosition, myMovable);

                myMovable.x = newPosition;
                cells[newPosition] = myMovable;

                i = newPosition;
            }
            i++;
        }
    }





    /**
     * This storage each of the simulation into a map
     */
    storeFrame(key, cells) {

        const cellsClone = JSON.parse(JSON.stringify(cells));

        this._frames.set(key, cellsClone);
    }





    /**
     * This creats a frame on the simulator
     */
    createFrame() {
        this.createFrameClosedSystem();
    }





    /**
     * The purpose of this method is to update the metrics of the
     * simulator.
     * In particular, to track if the movable has passed through the 
     * last position of the road and being fed back to the system.
     * When this happens the movable is not necessarily is registered
     * at the last position of the array, but the movable went through
     * the limits, so it should be counted.
     * 
     * @param {integer} newPosition 
     * @param {movable} movable 
     */
    updateMetrics(newPosition, movable) {

        if (newPosition < movable.x) {
            //movable will be placed beyond the finish line
            this.totalMovablesCrossedFinishLine = this.totalMovablesCrossedFinishLine + 1;

            // totalPerformance = totalPerformance + movable.velocity;
            // totalMaxExpected = totalMaxExpected + performanceExpectedLimitUpper;
            // totalMinExpected = totalMinExpected + performanceExpectedLimitLower;
        }
    }





    /**
     * This calculates the movables resilience index bassed on:
     * 
     *                  Sum_{0}^{T} P(t)
     *  Resilience_Max= --------------------
     *                  Sum_{0}^(T) TP(t)    
     */
    calculateResilience() {

        const framesNumber = this._frames.size;
        const numberOfMovables = this._numberOfMovables;
        const initialFramesToDiscard = this.initialFramesToDiscard;
        const speedHighLimit = this.speedHighLimit;
        const speedLowLimit = this.speedLowLimit;
        const totalMovablesCrossedFinishLine = this.totalMovablesCrossedFinishLine;
        const numberOfFrames = this._numberOfFrames;
        const numberOfCells = this.numberOfCells;
        const density = this.density;

        let totalAverageSpeed = 0;
        // let totalPerformance = 0;
        let totalMaxExpected = 0;
        let totalMinExpected = 0;


        for (let i = initialFramesToDiscard; i < framesNumber; i++) {

            let frames = this._frames;
            let cells = frames.get(i);
            // let numberOfFrames = this._numberOfFrames;
            let totalSpeedOfAllMovables = 0;
            let totalNumberOfMovables = 0;


            //Calculates the average speed of the road
            for (let j = 0; j < cells.length; j++) {

                if ((cells[j] !== null) && (cells[j].constructor === Object)) {
                    let myMovable = cells[j];

                    totalSpeedOfAllMovables = totalSpeedOfAllMovables + myMovable.velocity;
                    totalNumberOfMovables = totalNumberOfMovables + 1;
                }
            }

            let averageSpeed = totalSpeedOfAllMovables / totalNumberOfMovables;

            totalAverageSpeed = totalAverageSpeed + averageSpeed;
            totalMaxExpected = totalMaxExpected + speedHighLimit;
            totalMinExpected = totalMinExpected + speedLowLimit;
        }


        const resilienceSpeedTotalMax = totalAverageSpeed / totalMaxExpected;
        const resilienceSpeedTotalMin = totalAverageSpeed / totalMinExpected;


        const totalMovablesCrossedFinishLinePerFrame = totalMovablesCrossedFinishLine / numberOfFrames;

        const speedAverage = totalAverageSpeed / (numberOfFrames - initialFramesToDiscard);



        const resilienceFlowBoundaryRegionMax = 0;
        const resilienceFlowBoundaryRegionMin = 0;




        let mySimulatorResult = new SimulatorResult(
            numberOfCells,
            density,
            speedLowLimit,
            speedHighLimit,
            this._frames,
            numberOfMovables,
            numberOfFrames,
            totalMovablesCrossedFinishLine,
            totalMovablesCrossedFinishLinePerFrame,
            speedAverage,
            initialFramesToDiscard,
            resilienceSpeedTotalMax,
            resilienceSpeedTotalMin,

            resilienceFlowBoundaryRegionMax,
            resilienceFlowBoundaryRegionMin
        );


        return mySimulatorResult;
    }





    /**
     * 
     * This set the simulator to run
     * 
     * @param {*} numberOfFrames 
     * @returns object containing the simulation and all statistics
     */
    run(numberOfFrames) {


        //I will use this to calculate metrics
        this._numberOfFrames = numberOfFrames;

        for (let i = 0; i < numberOfFrames; i++) {
            this.storeFrame(i, this._cells);
            this.createFrame();
        }

        //Calculate the resilience index for the simulation
        const simulatorResult = this.calculateResilience();

        return simulatorResult;
    }





}