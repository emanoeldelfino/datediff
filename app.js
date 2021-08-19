const date1Elem = document.querySelector("#date1");
const date2Elem = document.querySelector("#date2");
const convertUnitElem = document.querySelector("#time-unit");
const spanConverted = document.querySelector("#converted");

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

[date1Elem, date2Elem, convertUnitElem].forEach(elem => {
	elem.addEventListener('change', () => {
		const date1 = new Date(date1Elem.value);
		const date2 = new Date(date2Elem.value);

		if (date1Elem.value && date2Elem.value) {
			const convertUnit = convertUnitElem.value.toLowerCase();
			const diffMs = Math.abs(date1.getTime() - date2.getTime());
			const diffSecs = convert2Secs.milliseconds(diffMs);
			console.log(convertUnit);
			const diffUnit = convertSecs2[convertUnit](diffSecs);
			spanConverted.innerText = `Difference of ${diffUnit} ${convertUnit}.`;
			const yearsMonthsWeeksDays = getYearsMonthsWeeksDays(diffSecs);

			for (const [key, value] of Object.entries(yearsMonthsWeeksDays)) {
				const unitElem = document.querySelector(`#${key}`);
				unitElem.innerText = `${capitalizeFirstLetter(key)}: ${value}`;
			}
		}
	})
});

function getYearsMonthsWeeksDays(seconds) {
	const units = ["years", "months", "weeks", "days"];
	let converted = {};
	let remainingSecs = seconds;
	for (let unit of units) {
		converted[unit] = Math.floor(remainingSecs / conversionSecs[unit]);
		remainingSecs = remainingSecs % conversionSecs[unit];
	}

	return converted;
}

const conversionSecs = {
	yoctosecond: 1 / 10 ** 24,
	zeptosecond: 1 / 10 ** 21,
	attosecon: 1 / 10 ** 18,
	femtosecond: 1 / 10 ** 15,
	picoseconds: 1 / 10 ** 12,
	nanoseconds: 1 / 10 ** 9,
	microseconds: 1 / 10 ** 6,
	milliseconds: 1 / 10 ** 3,
	seconds: 1,
	minutes: 60,
	hours: 60 ** 2,
	days: (60 ** 2 * 24),
	weeks: (60 ** 2 * 24 * 7),
	months: (60 ** 2 * 24 * 30),
	years: (60 ** 2 * 24 * 365),
	decades: (60 ** 2 * 24 * 365 * 10),
	centuries: (60 ** 2 * 24 * 365 * 100),
	millennium: (60 ** 2 * 24 * 365 * 1000),
	megayear: (60 ** 2 * 24 * 365 * 10 ** 6),
	gigayear: (60 ** 2 * 24 * 365 * 10 ** 9),
}

const convertSecs2 = {
	yoctoseconds: secs => secs * 10 ** 24,
	zeptoseconds: secs => secs * 10 ** 21,
	attoseconds: secs => secs * 10 ** 18,
	femtoseconds: secs => secs * 10 ** 15,
	picoseconds: secs => secs * 10 ** 12,
	nanoseconds: secs => secs * 10 ** 9,
	microseconds: secs => secs * 10 ** 6,
	milliseconds: secs => secs * 10 ** 3,
	seconds: secs => secs,
	minutes: secs => secs / 60,
	hours: secs => secs / 60 ** 2,
	days: secs => secs / (60 ** 2 * 24),
	weeks: secs => secs / (60 ** 2 * 24 * 7),
	months: secs => secs / (60 ** 2 * 24 * 30),
	years: secs => secs / (60 ** 2 * 24 * 365),
	decades: secs => secs / (60 ** 2 * 24 * 365 * 10 ** 1),
	centuries: secs => secs / (60 ** 2 * 24 * 365 * 10 ** 2),
	millennium: secs => secs / (60 ** 2 * 24 * 365 * 10 ** 3),
	megayear: secs => secs / (60 ** 2 * 24 * 365 * 10 ** 6),
	gigayear: secs => secs / (60 ** 2 * 24 * 365 * 10 ** 9),
}

const convert2Secs = {
	yoctosecond: unit => unit / 10 ** 24,
	zeptosecond: unit => unit / 10 ** 21,
	attosecon: unit => unit / 10 ** 18,
	femtosecond: unit => unit / 10 ** 15,
	picoseconds: unit => unit / 10 ** 12,
	nanoseconds: unit => unit / 10 ** 9,
	microseconds: unit => unit / 10 ** 6,
	milliseconds: unit => unit / 10 ** 3,
	seconds: secs => secs,
	minutes: unit => unit * 60,
	hours: unit => unit * 60 ** 2,
	days: unit => unit * (60 ** 2 * 24),
	weeks: unit => unit * (60 ** 2 * 24 * 7),
	months: unit => unit * (60 ** 2 * 24 * 30),
	years: unit => unit * (60 ** 2 * 24 * 365),
	decades: unit => unit * (60 ** 2 * 24 * 365 * 10),
	centuries: unit => unit * (60 ** 2 * 24 * 365 * 100),
	millennium: unit => unit * (60 ** 2 * 24 * 365 * 1000),
	megayear:  unit => unit * (60 ** 2 * 24 * 365 * 10 ** 6),
	gigayear:  unit => unit * (60 ** 2 * 24 * 365 * 10 ** 9),
}
