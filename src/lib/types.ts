import type z from "zod";
import type { NewEntrySchema } from "./schemas/diary.ts";

export const Weather = {
	Sunny: "sunny",
	Rainy: "rainy",
	Cloudy: "cloudy",
	Stormy: "stormy",
	Windy: "windy",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
	Great: "great",
	Good: "good",
	Ok: "ok",
	Poor: "poor",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
	id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
