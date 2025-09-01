import { diaries } from "../data.ts";
import type { DiaryEntry, NonSensitiveDiaryEntry } from "../types.ts";

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
	addOne: () => {
		// TODO: implement
		return null;
	},
};
