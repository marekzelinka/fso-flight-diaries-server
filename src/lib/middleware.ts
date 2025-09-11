import type { ErrorRequestHandler, RequestHandler } from "express";
import z from "zod";
import { NewEntrySchema } from "./schemas/diary.ts";

export const newDiaryParser: RequestHandler = (req, _res, next) => {
	NewEntrySchema.parse(req.body);

	next();
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
	if (error instanceof z.core.$ZodError) {
		res.status(400).json({ error: error.issues });
	} else {
		next(error);
	}
};
