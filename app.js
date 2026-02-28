const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const dateUnitSelect = document.querySelector(".date-unit-select");
const dateUnitsContainer = document.querySelector(".date-units");

// Set default start date to today
const today = new Date().toISOString().split('T')[0];
startDate.value = today;

const calculateDiff = () => {
    const d1 = new Date(startDate.value);
    const d2 = new Date(endDate.value);

    if (!startDate.value || !endDate.value || isNaN(d1) || isNaN(d2)) {
        dateUnitsContainer.innerHTML = '<p class="placeholder-text">Select both dates to see the difference.</p>';
        return;
    }

    const selectedUnits = Array.from(dateUnitSelect.options)
        .filter(opt => opt.selected)
        .map(opt => opt.value);

    if (selectedUnits.length === 0) {
        dateUnitsContainer.innerHTML = '<p class="placeholder-text">Select at least one unit to display.</p>';
        return;
    }

    // Clear and add directional header
    dateUnitsContainer.innerHTML = '';
    const diffMs = d2.getTime() - d1.getTime();
    const absDiffMs = Math.abs(diffMs);
    const direction = diffMs >= 0 ? "after" : "before";

    const header = document.createElement('p');
    header.className = 'placeholder-text';
    header.style.marginBottom = '10px';
    header.innerText = diffMs === 0 ? "Dates are identical" : `End date is ${direction} start date:`;
    dateUnitsContainer.appendChild(header);

    const diffSecs = absDiffMs / 1000;

    selectedUnits.forEach(unit => {
        let value;
        const u = unit.toLowerCase();

        if (u === 'years' || u === 'months') {
            // Precise calendar diff
            const start = d1 < d2 ? d1 : d2;
            const end = d1 < d2 ? d2 : d1;

            const years = end.getFullYear() - start.getFullYear();
            const months = (years * 12) + (end.getMonth() - start.getMonth());

            if (u === 'years') {
                // Approximate fractional years for UX, or integer if preferred. 
                // Using precise method:
                value = absDiffMs / (1000 * 60 * 60 * 24 * 365.25);
            } else {
                // Precise months calculation is tricky with decimals. 
                // We'll use a better average (30.4375 days per month)
                value = absDiffMs / (1000 * 60 * 60 * 24 * 30.4375);
            }
        } else {
            value = convertSecs2[u](diffSecs);
        }

        const span = document.createElement('span');
        span.innerText = `${unit}: ${value % 1 === 0 ? value : value.toFixed(2)}`;
        dateUnitsContainer.appendChild(span);
    });
};

[startDate, endDate, dateUnitSelect].forEach(el => el.addEventListener('change', calculateDiff));

const convertSecs2 = {
    milliseconds: s => s * 1000,
    seconds: s => s,
    minutes: s => s / 60,
    hours: s => s / 3600,
    days: s => s / 86400,
    weeks: s => s / 604800
};

// Also trigger on load if dates are present
window.addEventListener('load', calculateDiff);
