import express, { type Response } from "express";
import { parseDiary } from "../lib/diary.ts";
import type { DiaryEntry, NonSensitiveDiaryEntry } from "../lib/types.ts";
import { diaryService } from "../services/diaries.ts";

export const diaryRouter = express.Router();

diaryRouter.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
	res.json(diaryService.getNonSensitive());
});

diaryRouter.get("/:id", (req, res: Response<DiaryEntry | null>) => {
	const entry = diaryService.getById(Number(req.params.id));

	if (!entry) {
		res.status(404).end();

		return;
	}

	res.json(entry);
});

diaryRouter.post("/", (req, res: Response<DiaryEntry | { error: string }>) => {
	try {
		const parsedEntry = parseDiary(req.body);
		const newEntry = diaryService.addOne(parsedEntry);

		res.json(newEntry);
	} catch (error) {
		let errorMessage = "Something went wrong.";

		if (error instanceof Error) {
			errorMessage += ` Error: ${error.message}`;
		}

		res.status(400).json({ error: errorMessage });
	}
});
