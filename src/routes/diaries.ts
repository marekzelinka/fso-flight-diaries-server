import express, { type Response } from "express";
import { diaryService } from "../services/diaries.ts";
import type { DiaryEntry, NonSensitiveDiaryEntry } from "../types.ts";
import { toNewDiaryEntry } from "../utils.ts";

export const diaryRouter = express.Router();

diaryRouter.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
	res.send(diaryService.getNonSensitive());
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
		const newEntry = toNewDiaryEntry(req.body);

		const entry = diaryService.addOne(newEntry);

		res.send(entry);
	} catch (error) {
		let errorMessage = "Something went wrong.";

		if (error instanceof Error) {
			errorMessage += ` Error: ${error.message}`;
		}

		res.status(400).json({ error: errorMessage });
	}
});
