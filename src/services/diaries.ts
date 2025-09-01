import { diaries } from "../data/diaries.ts";
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
	addOne: (newEntry: NewDiaryEntry): DiaryEntry => {
		const entry: DiaryEntry = {
			id: Math.max(...diaries.map((diary) => diary.id)) + 1,
			...newEntry,
		};

		diaries.push(entry);

		return entry;
	},
};
