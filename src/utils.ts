import { type NewDiaryEntry, Visibility, Weather } from "./types.ts";

export function toNewDiaryEntry(arg: unknown): NewDiaryEntry {
	if (!arg || typeof arg !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if ("date" in arg && "weather" in arg && "visibility" in arg) {
		const newEntry: NewDiaryEntry = {
			weather: parseWeather(arg.weather),
			visibility: parseVisibility(arg.visibility),
			date: parseDate(arg.date),
		};

		if ("comment" in arg) {
			newEntry.comment = parseComment(arg.comment);
		}

		return newEntry;
	}

	throw new Error("Incorrect data: some fields are missing");
}

function parseComment(comment: unknown): string {
	if (!isString(comment)) {
		throw new Error("Incorrect or missing comment");
	}

	return comment;
}

function parseDate(date: unknown): string {
	if (!isString(date) || !isDate(date)) {
		throw new Error(`Incorrect or missing date: ${date}`);
	}

	return date;
}

function parseWeather(weather: unknown): Weather {
	if (!isString(weather) || !isWeather(weather)) {
		throw new Error(`Incorrect or missing weather: ${weather}`);
	}

	return weather;
}

function parseVisibility(visibility: unknown): Visibility {
	if (!isString(visibility) || !isVisibility(visibility)) {
		throw new Error(`Incorrect or missing visibility: ${visibility}`);
	}
	return visibility;
}

function isString(arg: unknown): arg is string {
	return typeof arg === "string" || arg instanceof String;
}

function isDate(string: string): boolean {
	return Boolean(Date.parse(string));
}

function isWeather(string: string): string is Weather {
	return Object.values(Weather)
		.map((v) => v.toString())
		.includes(string);
}

function isVisibility(param: string): param is Visibility {
	return Object.values(Visibility)
		.map((v) => v.toString())
		.includes(param);
}
