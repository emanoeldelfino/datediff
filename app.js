const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const dateUnitSelect = document.querySelector(".date-unit-select");
const dateUnitsContainer = document.querySelector(".date-units"); // Container for results

// Event listener for all inputs
[startDate, endDate, dateUnitSelect].forEach(elem => {
    elem.addEventListener('change', () => {
        const date1 = new Date(startDate.value);
        const date2 = new Date(endDate.value);

        // Clear previous results
        dateUnitsContainer.innerHTML = '';

        // Only calculate if both dates are valid
        if (startDate.value && endDate.value) {
            // Get all selected options
            const selectedOptions = Array.from(dateUnitSelect.options)
                                         .filter(option => option.selected)
                                         .map(option => option.value);

            if (selectedOptions.length === 0) {
                return; // No units selected, do nothing
            }

            const diffMs = Math.abs(date1.getTime() - date2.getTime());
            const diffSecs = convert2Secs.milliseconds(diffMs);

            // Loop through each selected unit and display the result
            for (const unit of selectedOptions) {
                // Find the correct conversion function (case-insensitive)
                const conversionFunc = convertSecs2[unit.toLowerCase()];
                
                if (conversionFunc) {
                    const diffUnit = conversionFunc(diffSecs);
                    
                    // Create new span element to display the result
                    const resultSpan = document.createElement('span');
                    // Use .toFixed(2) for a cleaner number
                    resultSpan.innerText = `${unit}: ${diffUnit.toFixed(2)}`; 
                    dateUnitsContainer.appendChild(resultSpan);
                }
            }
        }
    })
});

// Conversion objects (unused units removed)
const convertSecs2 = {
    milliseconds: secs => secs * 10 ** 3,
    seconds: secs => secs,
    minutes: secs => secs / 60,
    hours: secs => secs / 60 ** 2,
    days: secs => secs / (60 ** 2 * 24),
    weeks: secs => secs / (60 ** 2 * 24 * 7),
    months: secs => secs / (60 ** 2 * 24 * 30), // Uses 30-day month
    years: secs => secs / (60 ** 2 * 24 * 365), // Uses 365-day year
}

const convert2Secs = {
    milliseconds: unit => unit / 10 ** 3,
    seconds: secs => secs,
    minutes: unit => unit * 60,
    hours: unit => unit * 60 ** 2,
    days: unit => unit * (60 ** 2 * 24),
    weeks: unit => unit * (60 ** 2 * 24 * 7),
    months: unit => unit * (60 ** 2 * 24 * 30),
    years: unit => unit * (60 ** 2 * 24 * 365),
}
