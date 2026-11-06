/* =========================================
   EVILNEST - RESOURCE PLANNER
   JavaScript Validation and Calculation
========================================= */


// STEP 1: GET HTML ELEMENTS

const resourceForm = document.getElementById("resourceForm");

const resultSection = document.getElementById("result");

const resultCustomer = document.getElementById("resultCustomer");

const resultOccupants = document.getElementById("resultOccupants");

const resultDuration = document.getElementById("resultDuration");

const resourceResults = document.getElementById("resourceResults");


// STEP 2: HANDLE FORM SUBMISSION

resourceForm.addEventListener("submit", function(event) {

    // Prevent the browser from refreshing the page
    event.preventDefault();

    // Get customer information
    const customerName = document
        .getElementById("customerName")
        .value.trim();

    const customerEmail = document
        .getElementById("customerEmail")
        .value.trim();

    // Get numeric input values
    const users = Number(
        document.getElementById("users").value
    );

    const days = Number(
        document.getElementById("days").value
    );


    // STEP 3: VALIDATE CUSTOMER NAME

    if (customerName === "") {

        alert("Please enter your customer name.");

        resultSection.hidden = true;

        document.getElementById("customerName").focus();

        return;
    }


    // STEP 4: VALIDATE EMAIL ADDRESS

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail)) {

        alert("Please enter a valid email address.");

        resultSection.hidden = true;

        document.getElementById("customerEmail").focus();

        return;
    }


    // STEP 5: VALIDATE NUMBER OF USERS

    if (
        !Number.isInteger(users) ||
        users < 1 ||
        users > 100
    ) {

        alert(
            "Number of supervillains must be between 1 and 100."
        );

        resultSection.hidden = true;

        document.getElementById("users").focus();

        return;
    }


    // STEP 6: VALIDATE RENTAL DURATION

    if (
        !Number.isInteger(days) ||
        days < 1 ||
        days > 365
    ) {

        alert(
            "Rental duration must be between 1 and 365 days."
        );

        resultSection.hidden = true;

        document.getElementById("days").focus();

        return;
    }


    // STEP 7: PERFORM RESOURCE CALCULATIONS

    calculateResources(
        customerName,
        customerEmail,
        users,
        days
    );

});


// STEP 8: RESOURCE CALCULATION FUNCTION

function calculateResources(
    customerName,
    customerEmail,
    users,
    days
) {

    // Calculate required resources

    const food = users * days * 3;

    const water = users * days * 5;

    const energy = users * days * 10;

    const securityCards = users;

    const sleepingPods = users;


    // STEP 9: DISPLAY CUSTOMER INFORMATION

    resultCustomer.textContent =
        "Customer Name: " + customerName +
        " | Email: " + customerEmail;

    resultOccupants.textContent =
        "Number of Supervillains: " + users;

    resultDuration.textContent =
        "Rental Duration: " + days + " days";


    // STEP 10: DISPLAY RESOURCE RESULTS

    resourceResults.innerHTML = `

        <div class="resource-result-item">
            <span>Food Supplies</span>
            <span>${food} meals</span>
        </div>

        <div class="resource-result-item">
            <span>Water Supplies</span>
            <span>${water} litres</span>
        </div>

        <div class="resource-result-item">
            <span>Energy Units</span>
            <span>${energy} units</span>
        </div>

        <div class="resource-result-item">
            <span>Security Access Cards</span>
            <span>${securityCards} cards</span>
        </div>

        <div class="resource-result-item">
            <span>Sleeping Pods</span>
            <span>${sleepingPods} pods</span>
        </div>

    `;


    // STEP 11: SHOW RESULT SECTION

    resultSection.hidden = false;

    // Notify customer
    alert("Calculation completed successfully!");

}


// STEP 12: HANDLE RESET BUTTON

resourceForm.addEventListener("reset", function() {

    resultSection.hidden = true;

    resultCustomer.textContent = "";

    resultOccupants.textContent = "";

    resultDuration.textContent = "";

    resourceResults.innerHTML = "";

});
