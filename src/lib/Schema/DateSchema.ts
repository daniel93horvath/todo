import { zod } from "@/lib/zod";
export const dateRangeSchema = zod.object({
	from: zod.coerce.date(),
	to: zod.coerce.date(),
});
export type DateRange = zod.infer<typeof dateRangeSchema>;
