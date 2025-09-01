import { diaries } from "../data.ts";
import type { DiaryEntry } from "../types.ts";

export const diaryService = {
	getAll: (): DiaryEntry[] => {
		return diaries;
	},
	getNonSensitive: (): DiaryEntry[] => {
		return diaries.map(({ comment: _comment, ...diaryEntry }) => diaryEntry);
	},
	addOne: () => {
		// TODO: implement
		return null;
	},
};
