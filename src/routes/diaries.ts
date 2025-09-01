import express, { type Response } from "express";
import { diaryService } from "../services/diaries.ts";
import type { NonSensitiveDiaryEntry } from "../types.ts";

export const diaryRouter = express.Router();

diaryRouter.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
	res.send(diaryService.getNonSensitive());
});

diaryRouter.get("/:id", (req, res) => {
	const entry = diaryService.getById(Number(req.params.id));

	if (!entry) {
		res.sendStatus(404);
		return;
	}

	res.json(entry);
});

diaryRouter.post("/", (_req, res) => {
	res.send("Saving a diary!");
});
