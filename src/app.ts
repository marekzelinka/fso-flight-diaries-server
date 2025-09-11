import express from "express";
import { errorHandler } from "./lib/middleware.ts";
import { diaryRouter } from "./routes/diaries.ts";

export const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
	console.log("someone pinged here");

	res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.use(errorHandler);
