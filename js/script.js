const resourceForm = document.getElementById("resourceForm");

const resultSection = document.getElementById("result");
const resultCustomer = document.getElementById("resultCustomer");
const resultOccupants = document.getElementById("resultOccupants");
const resultDuration = document.getElementById("resultDuration");
const resourceResults = document.getElementById("resourceResults");


// Check that required elements exist
if (
    resourceForm &&
    resultSection &&
    resultCustomer &&
    resultOccupants &&
    resultDuration &&
    resourceResults
) 

{
    // Function to clear previous results
    function clearResults() {

        resultSection.hidden = true;

        resultCustomer.textContent = "";
        resultOccupants.textContent = "";
        resultDuration.textContent = "";

        resourceResults.replaceChildren();

    }


    // Form submission
    resourceForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const customerName = document.getElementById("customerName").value.trim();
        const customerEmail = document.getElementById("customerEmail").value.trim();
        const users = Number(document.getElementById("users").value);
        const days = Number(document.getElementById("days").value);

        // Clear previous results
        clearResults();


        // Validate customer name
        if (customerName === "") {
            alert("Please enter your customer name.");
            document.getElementById("customerName").focus();
            return;
        }


        // Validate email address
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(customerEmail)) {
            alert("Please enter a valid email address.");
            document.getElementById("customerEmail").focus();
            return;
        }

        // Validate number of supervillains
        if (!Number.isInteger(users) || users < 1 || users > 100) {
            alert("Number of supervillains must be between 1 and 100.");
            document.getElementById("users").focus();
            return;
        }

        // Validate rental duration
        if (!Number.isInteger(days) || days < 1 || days > 365) {
            alert("Rental duration must be between 1 and 365 days.");
            document.getElementById("days").focus();
            return;
        }

        // All inputs are valid
        calculateResources(customerName, customerEmail, users, days);

    });

    // Resource Calculation Function
    function calculateResources(customerName, customerEmail, users, days) {

        // Calculate required resources
        const food = users * days * 3;
        const water = users * days * 5;
        const energy = users * days * 10;
        const securityCards = users;
        const sleepingPods = users;

        // Display customer information
        resultCustomer.textContent = "Customer Name: " + customerName + " | Email: " + customerEmail;
        resultOccupants.textContent = "Number of Supervillains: " + users;
        resultDuration.textContent = "Rental Duration: " + days + " days";

        // Store calculated resources
        const resources = [
            ["Food Supplies", food + " meals"],
            ["Water Supplies", water + " litres"],
            ["Energy Units", energy + " units"],
            ["Security Access Cards", securityCards + " cards"],
            ["Sleeping Pods", sleepingPods + " pods"]
        ];


        // Display calculated resources
        resources.forEach(function(resource) {
            const item = document.createElement("div");
            item.className = "resource-result-item";

            const resourceName = document.createElement("span");
            resourceName.textContent = resource[0];

            const resourceAmount = document.createElement("span");
            resourceAmount.textContent = resource[1];

            item.appendChild(resourceName);
            item.appendChild(resourceAmount);
            resourceResults.appendChild(item);

        });

        // Display the result section
        resultSection.hidden = false;

        // Successful calculation message
        alert("Calculation completed successfully!");

    }


    // Reset Form
    resourceForm.addEventListener("reset", function() {
        clearResults();
    });

} 

else {
    console.error("EvilNest Resource Planner: Required HTML elements were not found.");
}
