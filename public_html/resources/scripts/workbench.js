/*
 * David Sanchez
 * Newcastle University. October 2022
 *  
 * This code is used to support the workbench page behaviour
 *  
 */





/**
 * This assigns behaviours to radio button "Uniform" in control simulations
 */
document.getElementById("controlProbabilityRandomBreakUniform").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {

        //Enable uniform value
        document.getElementById("controlProbabilityRandomBreak").disabled = false;

        //Enable multiple value
        document.getElementById("controlProbabilityMultipleValue").style.display = "none";
    }
});





/**
 * This assigns behaviours to radio button "Uniform" in under-attack simulations
 */
document.getElementById("attackProbabilityRandomBreakUniform").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {

        //Enable uniform value
        document.getElementById("attackProbabilityRandomBreak").disabled = false;

        //Enable multiple value
        document.getElementById("attackProbabilityMultipleValue").style.display = "none";
    }
});





/**
 * This assigns behaviours to radio button "Multiple" in control simulations
 */
document.getElementById("controlProbabilityRandomBreakMultiple").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {

        //Disable uniform value
        document.getElementById("controlProbabilityRandomBreak").disabled = true;


        const container = document.getElementById("controlProbabilityMultipleValue");
        const numberOfCells = parseInt(document.getElementById("numberOfCells").value);
        const uniformValue = document.getElementById("controlProbabilityRandomBreak").value;
        const fieldNamePrefix = "controlProbabilityCell"
        

        //Dynamically create additional entry fields
        workbench.createMultipleProbabilityRandomBreakInputFields(container, numberOfCells, uniformValue, fieldNamePrefix);


        //Enable multiple value
        document.getElementById("controlProbabilityMultipleValue").style.display = "block";

    }
});





/**
 * This assigns behaviours to radio button "Multiple" in under-attack simulations
 */
document.getElementById("attackProbabilityRandomBreakMultiple").addEventListener('click', function (event) {
    if (event.target && event.target.matches("input[type='radio']")) {

        //Disable uniform value
        document.getElementById("attackProbabilityRandomBreak").disabled = true;

        const container = document.getElementById("attackProbabilityMultipleValue");
        const numberOfCells = parseInt(document.getElementById("numberOfCells").value);
        const uniformValue = document.getElementById("attackProbabilityRandomBreak").value;
        const fieldNamePrefix = "attackProbabilityCell"

        //Dynamically create additional entry fields
        workbench.createMultipleProbabilityRandomBreakInputFields(container, numberOfCells, uniformValue, fieldNamePrefix);

        //Enable multiple value
        document.getElementById("attackProbabilityMultipleValue").style.display = "block";

    }
});

