import express, { type Request, type Response } from "express";
import { newDiaryParser } from "../lib/middleware.ts";
import type {
	DiaryEntry,
	NewDiaryEntry,
	NonSensitiveDiaryEntry,
} from "../lib/types.ts";
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

diaryRouter.post(
	"/",
	newDiaryParser,
	(
		req: Request<unknown, unknown, NewDiaryEntry>,
		res: Response<DiaryEntry>,
	) => {
		const newEntry = diaryService.addOne(req.body);

		res.status(201).json(newEntry);
	},
);
