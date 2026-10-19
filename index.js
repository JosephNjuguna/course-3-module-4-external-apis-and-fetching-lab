const displayAlertsSection = document.getElementById("alerts-display");
const errorsSection = document.getElementById("error-message");
let submitbutton = document.getElementById("fetch-alerts");
const input = document.getElementById("state-input");

submitbutton.addEventListener("click", () => {
    let inputdata = input.value.trim().toUpperCase();
    input.value = "";
    // document.getElementById("state-input").value()
    if (!/^[A-Z]{2}$/.test(inputdata)) {
        alertsDisplay.innerHTML = '';
        showError('Please enter a valid two-letter state abbreviation.');
        return;
    }
    fetchWeatherAlerts(inputdata)
})


async function fetchWeatherAlerts(state) {
    try {
        const requestweather = await fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        let weatherdata = await requestweather.json();
        displayAlerts(weatherdata);
        clearError()
    } catch (error) {
        displayAlertsSection.innerHTML = '';
        showError(error.message)
    }
}

function displayAlerts(data) {
    displayAlertsSection.innerHTML = "";
    let alerts = data.features;

    const summary = document.createElement("p");
    summary.textContent = `${data.title}: ${alerts.length}`
    displayAlertsSection.appendChild(summary)

    const list = document.createElement("ul")
    alerts.forEach(alert => {
        const item = document.createElement("li")
        item.textContent = alert.properties.headline;
        list.appendChild(item)
    });
    displayAlertsSection.appendChild(list)
}

function showError(message) {
    errorsSection.textContent = message;
    errorsSection.classList.remove('hidden');
}

function clearError() {
    errorsSection.textContent = '';
    errorsSection.classList.add('hidden');
}