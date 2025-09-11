import z from "zod";
import { Visibility, Weather } from "../types.ts";

export const NewEntrySchema = z.object({
	weather: z.enum(Weather),
	visibility: z.enum(Visibility),
	date: z.iso.date(),
	comment: z.string().optional(),
});
