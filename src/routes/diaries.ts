import express, { type Response } from "express";
import { diaryService } from "../services/diaries.ts";
import type { DiaryEntry, NonSensitiveDiaryEntry } from "../types.ts";

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

diaryRouter.post("/", (req, res: Response<DiaryEntry>) => {
	const { date, weather, visibility, comment } = req.body;

	const newEntry = diaryService.addOne({ date, weather, visibility, comment });

	res.send(newEntry);
});
