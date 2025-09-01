import { diaries } from "../data.ts";
import type {
	DiaryEntry,
	NewDiaryEntry,
	NonSensitiveDiaryEntry,
} from "../types.ts";

export const diaryService = {
	getAll: (): DiaryEntry[] => {
		return diaries;
	},
	getNonSensitive: (): NonSensitiveDiaryEntry[] => {
		return diaries.map(({ comment: _comment, ...diaryEntry }) => diaryEntry);
	},
	getById: (id: DiaryEntry["id"]): DiaryEntry | null => {
		const entry = diaries.find((diary) => diary.id === id);

		return entry ?? null;
	},
	addOne: (entryObject: NewDiaryEntry): DiaryEntry => {
		const newEntry: DiaryEntry = {
			id: Math.max(...diaries.map((diary) => diary.id)) + 1,
			...entryObject,
		};

		diaries.push(newEntry);

		return newEntry;
	},
};
