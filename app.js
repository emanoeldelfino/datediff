const date1Elem = document.querySelector("#date1");
const date2Elem = document.querySelector("#date2");
const convertUnit = document.querySelector("#time-unit");

const date1 = New Date(date1Elem.value);
const date2 = New Date(date2Elem.value);

const diffMs = date1.getTime() - date2.getTime();

const convertSecs2 = {
	picoseconds: secs => secs * 10 ** 12,
	nanoseconds: secs => secs * 10 ** 9,
	microseconds: secs => secs * 10 ** 6,
	milliseconds: secs => secs * 10 ** 3,
	minutes: secs => secs / 60
	hours: secs => secs / 60 ** 2
	days: secs => secs / (60 ** 2 * 24)
	weeks: secs => secs / (60 ** 2 * 24 * 7)
	months: secs => secs / (60 ** 2 * 24 * 30)
	years: secs => secs / (60 ** 2 * 24 * 365)
	decades: secs => secs / (60 ** 2 * 24 * 365 * 10)
	centuries: secs => secs / (60 ** 2 * 24 * 365 * 100)
}

const convert2Secs = {
	picoseconds: unit => unit / 10 ** 12,
	nanoseconds: unit => unit / 10 ** 9,
	microseconds: unit => unit / 10 ** 6,
	milliseconds: unit => unit / 10 ** 3,
	minutes: unit => unit * 60
	hours: secs => unit * 60 ** 2
	days: secs => unit * (60 ** 2 * 24)
	weeks: secs => unit * (60 ** 2 * 24 * 7)
	months: secs => unit * (60 ** 2 * 24 * 30)
	years: secs => unit * (60 ** 2 * 24 * 365)
	decades: secs => unit * (60 ** 2 * 24 * 365 * 10)
	centuries: secs => unit * (60 ** 2 * 24 * 365 * 100)
}
