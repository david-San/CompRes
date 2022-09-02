/* 
 * David Sanchez
 * Newcastle University
 * 
 * 2021 Mar 16: Created
 * 2021 Mar 25: Update
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
 * 2021 Apr 14: Update
 * Finished cell idea implementation rather than graph.
 * 
 */

/**
 * 
 * This is the Visualiser class. 
 * This class visualises the Position Network and resolution Network
 * - The Position Network is a cell arrangement
 * - The Restolution Network is a conseole.
 * 
 * e.g.
 * M is a movable commodity that travels through nodes using links
 * M occupies a block when travelling from one block to another
 * M departs from A and final destination is B
 * A and B are nodes.
 *  
 * Y
 * |   .   .   .   .   B  
 * |   .   .   .   .   .  
 * |   .   M   .   .   .  
 * |   .   .   .   .   .  
 * |   A   .   .   .   .  
 * |----------------------X 
 * 
 */


var _sharedObject = {};


class Visualiser {

    /**
     * It receives on the constructor the Stage
     * 
     * @param {Stage} stage 
     */
    constructor(workbenchDataBank) {




        
        // ========================================================================== //
        // Privileged attributes
        //Databank
        this.workbenchDataBank = workbenchDataBank;
        this.simulations = this.workbenchDataBank.control.simulations;


        //This is the configuration for exporting plot drawings
        this.config = {
            responsive: true,
            toImageButtonOptions: {
                format: 'svg', // one of png, svg, jpeg, webp
                filename: 'custom_image',

                 //Square illustrations
                // height: 500, //Produce exports or the same size. Comment to have dynamic screen size
                // width: 700, //Produce exports or the same size. Comment to have dynamic screen size

                //Panoramic illustrations
                height: 400, //Produce exports or the same size. Comment to have dynamic screen size
                width: 1200, //Produce exports or the same size. Comment to have dynamic screen size

                scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
            }
        };


        this.plotMaximumYValue = this.workbenchDataBank.common.plotMaximumYValue
        this.plotMinimumYValue = this.workbenchDataBank.common.plotMinimumYValue;

        //Pointer to communication channel
        _sharedObject.workbenchDataBank = this.workbenchDataBank;




        // ========================================================================== //
        // Private attributes





        // ========================================================================== //
        // Private methods






        // ========================================================================== //
        // Privileged methods




        this.clearInterface();
    }




    // ========================================================================== //
    // Public methods (Prototype methods)

    /**
     * This method deletes the interface
     */
    clearInterface() {


        //Deletes previous results
        const myResults = document.getElementById('results');
        if (myResults != null) {
            myResults.textContent = '';
        }


        //Deletes previous results
        const myLinks = document.getElementById('links');
        if (myLinks != null) {
            myLinks.textContent = '';
        }




        //It attaches an event handler for the "select sample" menu
        const myCollapsibles = document.getElementById('collapsibles');
        if (myCollapsibles != null) {
            myCollapsibles.textContent = '';
        }
    }




    /**
     * This code creates links to each simulation.
     * 
     * - The idea is to have all simulations in one page identified by iteration
     * - The user can click on a particular iteration to see how it was constructed
     * - The new iteration will appear in a new tab, so the user can see two or
     *   more iterations side by side. 
     *   e.g.
     * 
     *   1
     *   2
     *   3
     *   ...
     *   10000
     *   
     *   Each number is a hyperlink and will open another tab.
     * 
     */
    createSimulationLinks() {

        //Gathering Data
        const simulationsControl = this.workbenchDataBank.control.simulations;
        const simulationsAttack = this.workbenchDataBank.attack.simulations;

        //Creating links
        this.createLinks(simulationsControl, "Control Result: Simulations", "Control");
        this.createLinks(simulationsAttack, "Attack Result: Simulations", "Attack");

    }





    /**
     * This code creates links to each simulation.
     * 
     * - The idea is to have all simulations in one page identified by iteration
     * - The user can click on a particular iteration to see how it was constructed
     * - The new iteration will appear in a new tab, so the user can see two or
     *   more iterations side by side. 
     *   e.g.
     * 
     *   1
     *   2
     *   3
     *   ...
     *   10000
     *   
     *   Each number is a hyperlink and will open another tab.
     *
     * @param {Array} densities 
     */
    createLinks(simulations, legendText, kind) {

        const legend = document.createElement("legend");
        legend.setAttribute("class", "legend");
        legend.innerHTML = legendText;

        //Arming the DOM
        document.getElementById("links").appendChild(legend);

        const topSimulations = simulations.size;

        //Create HTML code dynamically
        for (let i = 0; i < topSimulations; i++) {

            //This creates the links to simulations    
            let myLink = document.createElement("BUTTON");
            myLink.innerHTML = i;

            myLink.setAttribute("id", i);
            myLink.setAttribute("class", "link");

            myLink.setAttribute("dataKind", kind);


            //myLink.setAttribute("kind", legendText.includes("attack") ? "attack" : "control");

            //Adds the link
            document.getElementById("links").appendChild(myLink);
        }



        //Assign behaviour
        const myLinks = document.querySelectorAll(`[dataKind=` + kind + `]`);
        const topLinks = myLinks.length;

        for (let i = 0; i < topLinks; i++) {


            myLinks[i].addEventListener("click", this.openSimulationWindow.bind(Event), false);

        }
    }





    /**
     *  Opens a new windows with the relevant results
     * 
     *  This code is called is called in the master Window
     * 
     */
    openSimulationWindow(event) {

        let myId = parseInt(event.target.id);
        let myKind = event.target.getAttribute('dataKind');
        let myURL = 'simulation.html';

        _sharedObject.id = myId;
        _sharedObject.kind = myKind;

        let mywindow = window.open(myURL, "_blank");
        mywindow.document.title = "Simulation " + myId;

    }





    /**
     * This method draws all results of the simulation
     */
    drawResults() {


        //Gathering Data
        const simulationsControl = this.workbenchDataBank.control.simulations;
        const simulationsAttack = this.workbenchDataBank.attack.simulations;

        const controlRegionTraces = this.workbenchDataBank.control.controlRegionTraces;
        const attackRegionTraces = this.workbenchDataBank.attack.attackRegionTraces;

        const config = this.config;

        //Common parameters
        const layout = {
            // xaxis: {
            //     range: [initialFramesToDiscard, framesNumber]
            // },
            yaxis: {
                range: [this.plotMinimumYValue, this.plotMaximumYValue]
            },
            // colorway: myColorway,
            autosize: true,
            legend: {
                orientation: "v",
                traceorder: "normal"
            }
            // title: 'Movable Velocity/Frame'
        };





        //======================================================================
        //(Movable Flow)/Density
        //Control
        //Adding the legend to the DOM
        const legendControlFlow = document.createElement("legend");
        legendControlFlow.setAttribute("class", "legend");
        legendControlFlow.innerHTML = "Control Result: (Movable Flow)/Density";

        //Adding a panel to place results
        const divControlFlowResults = document.createElement("div");
        divControlFlowResults.setAttribute("id", "performanceFlowControlResults");
        divControlFlowResults.setAttribute("class", "performanceFlowControlResults");

        //Arming the DOM
        const divResults = document.getElementById('results');
        divResults.append(legendControlFlow);
        divResults.append(divControlFlowResults);

        const containerControlFlow = document.getElementById('performanceFlowControlResults');
        this.drawResultsFlow(simulationsControl, containerControlFlow, layout, config );




        //(Movable Flow)/Density
        //Attack
        //Adding the legend to the DOM
        const legendAttackFlow = document.createElement("legend");
        legendAttackFlow.setAttribute("class", "legend");
        legendAttackFlow.innerHTML = "Attack Result: (Movable Flow)/Density";

        //Adding a panel to place results
        const divAttackFlowResults = document.createElement("div");
        divAttackFlowResults.setAttribute("id", "performanceFlowAttackResults");
        divAttackFlowResults.setAttribute("class", "panelPerformance");

        //Arming the DOM
        divResults.append(legendAttackFlow);
        divResults.append(divAttackFlowResults);

        const containerAttackFlow = document.getElementById('performanceFlowAttackResults');
        this.drawResultsFlow(simulationsAttack, containerAttackFlow, layout, config);





        //======================================================================
        //Control Result: (Movable Flow)/Density Resilience Region
        //Control
        //Adding the legend to the DOM
        const legendControlFlowRegion = document.createElement("legend");
        legendControlFlowRegion.setAttribute("class", "legend");
        legendControlFlowRegion.innerHTML = "Control Result: (Movable Flow)/Density Resilience Region";

        //Adding a panel to place results
        const divControlFlowRegionResults = document.createElement("div");
        divControlFlowRegionResults.setAttribute("id", "performanceFlowRegionControlResults");
        divControlFlowRegionResults.setAttribute("class", "panelPerformance");

        //Arming the DOM
        divResults.append(legendControlFlowRegion);
        divResults.append(divControlFlowRegionResults);

        const containerControlFlowRegion = document.getElementById('performanceFlowRegionControlResults');
        this.drawResultsFlowRegion(containerControlFlowRegion, controlRegionTraces, layout, config);




        //(Movable Flow)/Density
        //Attack
        //Adding the legend to the DOM
        const legendAttackFlowRegion = document.createElement("legend");
        legendAttackFlowRegion.setAttribute("class", "legend");
        legendAttackFlowRegion.innerHTML = "Attack Result: (Movable Flow)/Density Resilience Region";

        //Adding a panel to place results
        const divAttackFlowRegionResults = document.createElement("div");
        divAttackFlowRegionResults.setAttribute("id", "performanceFlowRegionAttackResults");
        divAttackFlowRegionResults.setAttribute("class", "panelPerformance");

        //Arming the DOM
        divResults.append(legendAttackFlowRegion);
        divResults.append(divAttackFlowRegionResults);

        const containerAttackFlowRegion = document.getElementById('performanceFlowRegionAttackResults');
        this.drawResultsFlowRegion(containerAttackFlowRegion, attackRegionTraces, layout,config);







        //======================================================================
        //Control Result: (Movable Flow)/Density in Resilience Region
        //Control
        //Adding the legend to the DOM
        const legendControlFlowInRegion = document.createElement("legend");
        legendControlFlowInRegion.setAttribute("class", "legend");
        legendControlFlowInRegion.innerHTML = "Control Result: (Movable Flow)/Density in Resilience Region";

        //Adding a panel to place results
        const divControlFlowInRegionResults = document.createElement("div");
        divControlFlowInRegionResults.setAttribute("id", "performanceFlowInRegionControlResults");
        divControlFlowInRegionResults.setAttribute("class", "panelPerformance");

        //Arming the DOM
        divResults.append(legendControlFlowInRegion);
        divResults.append(divControlFlowInRegionResults);

        const containerControlFlowInRegion = document.getElementById('performanceFlowInRegionControlResults');
        this.drawResultsFlowInRegion(simulationsControl, containerControlFlowInRegion, controlRegionTraces, layout, config);




        //(Movable Flow)/Density
        //Attack
        //Adding the legend to the DOM
        const legendAttackFlowInRegion = document.createElement("legend");
        legendAttackFlowInRegion.setAttribute("class", "legend");
        legendAttackFlowInRegion.innerHTML = "Attack Result: (Movable Flow)/Density in Attack Region";

        //Adding a panel to place results
        const divAttackFlowInRegionResults = document.createElement("div");
        divAttackFlowInRegionResults.setAttribute("id", "performanceFlowInRegionAttackResults");
        divAttackFlowInRegionResults.setAttribute("class", "panelPerformance");

        //Arming the DOM
        divResults.append(legendAttackFlowInRegion);
        divResults.append(divAttackFlowInRegionResults);

        const containerAttackFlowInRegion = document.getElementById('performanceFlowInRegionAttackResults');
        this.drawResultsFlowInRegion(simulationsAttack, containerAttackFlowInRegion, attackRegionTraces, layout, config);




        //======================================================================
        //Results Combined: (Movable Flow)/Density in Resilience Region
        //Both
        //Adding the legend to the DOM
        const legendCombinedFlowInRegion = document.createElement("legend");
        legendCombinedFlowInRegion.setAttribute("class", "legend");
        legendCombinedFlowInRegion.innerHTML = "Combined Result: (Movable Flow)/Density in Resilience Region - Control vs Attack";

        //Adding a panel to place results
        const divCombinedFlowInRegionResults = document.createElement("div");
        divCombinedFlowInRegionResults.setAttribute("id", "performanceCombinedFlowInRegionControlResults");
        divCombinedFlowInRegionResults.setAttribute("class", "panelPerformance");

        //Arming the DOM
        divResults.append(legendCombinedFlowInRegion);
        divResults.append(divCombinedFlowInRegionResults);

        const containerCombinedFlowInRegion = document.getElementById('performanceCombinedFlowInRegionControlResults');

        this.drawResultsFlowInRegionCombined(containerCombinedFlowInRegion, controlRegionTraces, attackRegionTraces, layout, config);



    }





    /**
     * This method draws all results of the simulation
     */
    drawResult(simulations, container) {

        const myTotalAverageX = new Array();
        const myTotalAverageY = new Array();

        //Traversing the map to the get all densities. 
        //Densities are used as key. Simulation are values
        for (const [density, simulation] of simulations) {

            const config = this.config;
            //Traverse the Map (frame is key, road is value) to get all speeds
            //Order is not guaranteed, but it is not important

            let myInitialFramesToDiscard = simulation.initialFramesToDiscard;

            //The code has to be constructed this way so it is possible to avoid the
            //first myInitialFramesToDiscard. Enumerators do not allow to 
            //jump myInitialFramesToDiscard
            let frames = Array.from(simulation.frames.keys());
            let top = frames.length;
  

            for (let i = myInitialFramesToDiscard; i < top; i++) {

                let road = simulation.frames.get(frames[i]);

                for (let i = 0; i < road.length; i++) {

                    if ((road[i] !== null) && (road[i].constructor === Object)) {
                        let myMovable = road[i];

                        //Creating dataset for total box plot
                        myTotalAverageX.push(density);
                        myTotalAverageY.push(myMovable.velocity);
                    }
                }
            }


            const trace = {
                x: myTotalAverageX,
                y: myTotalAverageY,
                // mode: 'markers',
                type: 'box',
                name: 'Velocity',
                boxmean: true,
                // boxpoints: 'Outliers',
                // boxpoints: 'all',
                // jitter: 0.3,
                // pointpos: -1.8,
                // marker: {
                //     size: 5
                // }
            };






            const layout = {
                // xaxis: {
                //     range: [initialFramesToDiscard, framesNumber]
                // },
                yaxis: {
                    range: [this.plotMinimumYValue, this.plotMaximumYValue]
                },
                // colorway: myColorway,
                autosize: true,
                legend: {
                    orientation: "v",
                    traceorder: "normal"
                }
                // title: 'Movable Velocity/Frame'
            };

            



            const data = [trace];
            Plotly.newPlot(container, data, layout, config);
        }
    }





    /**
     * This method draws all flow results of the simulator
     * 
     */
    drawResultsFlow(simulations, container, layout, config) {

        const topIterations = simulations.size;

        const traces = new Map();

        for (let i = 0; i < topIterations; i++) {

            //Getting each iteration of a simulation
            let simulation = simulations.get(i);
            let densities = Array.from(simulation.keys());

            let topDensities = densities.length;

            //Create a new object trace to store results to be collected
            let myTrace = {
                x: new Array(),
                y: new Array(),
                mode: 'lines+markers',
                line: {
                    shape: 'spline'
                },
                type: 'scatter',
                name: i,
            };

            for (let j = 0; j < topDensities; j++) {

                //Traversing all densities in a simulation
                let totalMovablesCrossedFinishLine = simulation.get(densities[j]).totalMovablesCrossedFinishLine;

                myTrace.x.push(densities[j]);
                myTrace.y.push(totalMovablesCrossedFinishLine);
            }

            //Adding the new series to the traces using the iteration i as key
            traces.set(i, myTrace);

        }


        const data = [...traces.values()];

        Plotly.newPlot(container, data, layout, config);
    }





    /**
     * This method draws all flow results of the simulator
     * 
     */
    drawResultsFlowRegion(container, traces, layout, config) {

        const myTraceMax = traces.get(0);
        //Adding graph parameters to the same structure
        myTraceMax.mode = 'lines+markers';
        myTraceMax.fill = 'tozero';
        myTraceMax.line = {
            shape: 'spline'
        };
        myTraceMax.type = {
            shape: 'scatter'
        };



        const myTraceMin = traces.get(1);
        //Adding graph parameters to the same structure
        myTraceMin.mode = 'lines+markers';
        myTraceMin.fill = 'tonexty';
        myTraceMin.line = {
            shape: 'spline'
        };
        myTraceMin.type = {
            shape: 'scatter'
        };


        const data = [...traces.values()];

        Plotly.newPlot(container, data, layout, config);

    }





    /**
     * This method draws all flow results of the simulator
     * 
     */
    drawResultsFlowInRegion(simulations, container, traces, layout, config) {


        const myTraceMax = traces.get(0);
        //Adding graph parameters to the same structure
        myTraceMax.mode = 'lines+markers';
        myTraceMax.fill = 'tozero';
        myTraceMax.line = {
            shape: 'spline'
        };
        myTraceMax.type = {
            shape: 'scatter'
        };



        const myTraceMin = traces.get(1);
        //Adding graph parameters to the same structure
        myTraceMin.mode = 'lines+markers';
        myTraceMin.fill = 'tonexty';
        myTraceMin.line = {
            shape: 'spline'
        };
        myTraceMin.type = {
            shape: 'scatter'
        };


        const topSimulations = simulations.size;



        //Producing dataset for all series
        for (let i = 0; i < topSimulations; i++) {

            //Getting each iteration of a simulation
            let simulation = simulations.get(i);
            let densities = Array.from(simulation.keys());

            let topDensities = densities.length;

            //Create a new object trace to store results to be collected
            let myTrace = {
                x: new Array(),
                y: new Array(),
                mode: 'lines+markers',
                line: {
                    shape: 'spline'
                },
                type: 'scatter',
                name: i,
            };

            for (let j = 0; j < topDensities; j++) {

                //Traversing all densities in a simulation
                let totalMovablesCrossedFinishLine = simulation.get(densities[j]).totalMovablesCrossedFinishLine;

                //Saves the value into its respective series
                myTrace.x.push(densities[j]);
                myTrace.y.push(totalMovablesCrossedFinishLine);

            }

            //Adding the new series to the traces using the iteration i as key
            traces.set(i + 2, myTrace);

        }

        const data = [...traces.values()];

        Plotly.newPlot(container, data, layout, config);


    }





    /**
     * This method creates a data set of the results flow in region.
     * I need to call this procedure twice tocreate two datasets
     * One of the is for the control, the other is for the attack
     * 
     * @param {Map} simulations 
     * @returns Array
     */
    createDataResultsFlowInRegion(simulations, traces) {


        const myTraceMax = traces.get(0);
        //Adding graph parameters to the same structure
        myTraceMax.mode = 'lines+markers';
        myTraceMax.fill = 'tozero';
        myTraceMax.line = {
            shape: 'spline'
        };
        myTraceMax.type = {
            shape: 'scatter'
        };



        const myTraceMin = traces.get(1);
        //Adding graph parameters to the same structure
        myTraceMin.mode = 'lines+markers';
        myTraceMin.fill = 'tonexty';
        myTraceMin.line = {
            shape: 'spline'
        };
        myTraceMin.type = {
            shape: 'scatter'
        };


        const topSimulations = simulations.size;


        //Producing dataset for all series
        for (let i = 0; i < topSimulations; i++) {

            //Getting each iteration of a simulation
            let simulation = simulations.get(i);
            let densities = Array.from(simulation.keys());

            let topDensities = densities.length;

            //Create a new object trace to store results to be collected
            let myTrace = {
                x: new Array(),
                y: new Array(),
                mode: 'lines+markers',
                line: {
                    shape: 'spline'
                },
                type: 'scatter',
                name: i,
            };

            for (let j = 0; j < topDensities; j++) {

                //Traversing all densities in a simulation
                let totalMovablesCrossedFinishLine = simulation.get(densities[j]).totalMovablesCrossedFinishLine;

                //Saves the value into its respective series
                myTrace.x.push(densities[j]);
                myTrace.y.push(totalMovablesCrossedFinishLine);

            }

            //Adding the new series to the traces using the iteration i as key
            traces.set(i + 2, myTrace);

        }


        const data = [...traces.values()];

        return data

    }





    /**
     * This method draws all flow results of the simulator
     * 
     */
    drawResultsFlowInRegionCombined(container, controlRegionTraces, attackRegionTraces, layout, config) {

        //Gathering Data
        const simulationsControl = this.workbenchDataBank.control.simulations;
        const simulationsAttack = this.workbenchDataBank.attack.simulations;

        let dataControl = this.createDataResultsFlowInRegion(simulationsControl, controlRegionTraces);
        let dataAttack = this.createDataResultsFlowInRegion(simulationsAttack, attackRegionTraces);


        let data = new Array();

        data.push(dataControl[0]);
        data.push(dataControl[1]);
        data.push(dataAttack[0]);
        data.push(dataAttack[1]);


        //Removing already added values and adding the rest to combined repository
        dataControl = dataControl.slice(2, dataControl.length);
        dataAttack = dataAttack.slice(2, dataAttack.length);


        //Combining everything into one
        data = data.concat(dataControl);
        data = data.concat(dataAttack);

        Plotly.newPlot(container, data, layout, config);

    }





}