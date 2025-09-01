import express from "express";
import { diaryService } from "../services/diaries.ts";

export const diaryRouter = express.Router();

diaryRouter.get("/", (_req, res) => {
	res.send(diaryService.getNonSensitive());
});

diaryRouter.post("/", (_req, res) => {
	res.send("Saving a diary!");
});
