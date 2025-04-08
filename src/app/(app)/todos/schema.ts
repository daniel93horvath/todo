//src/app/(app)/todos/schema.ts
import { zod } from "@/lib/zod";

export const todoSchema = zod.object({
	id: zod.number().optional(),
	name: zod.string().min(1),
	framework: zod.array(zod.string()).min(1, { message: "Legalább egy elemet ki kell választani" }),
	date_range: zod
		.object({
			from: zod.string().min(10),
			to: zod.string().min(10),
		})
		.refine((data) => data.from !== "" && data.to !== "", { message: "Kötelező dátumot megadni!" }),
	date: zod.string().min(10),
	type: zod.enum(["1", "2", "3"]),
	description: zod.string().min(3),
});

export type Todo = zod.infer<typeof todoSchema>;

// Szűrő séma - származtatva a todo sémából, de felülírva bizonyos mezők validációját
export const filterFormSchema = zod.object({
	name: zod.string(),
	type: zod.string().optional(),
	date: zod.string(),
	date_range: zod.object({
		from: zod.string(),
		to: zod.string(),
	}),
	framework: zod.array(zod.string()).optional(),
});

export type FilterForm = {
	name: string;
	type: string;
	date: string;
	date_range: {
		from: string;
		to: string;
	};
	framework: string[];
};

export const TODO_TYPES = [
	{ label: "Bármelyik", value: 0 },
	{ label: "Könnyű", value: 1 },
	{ label: "Közepes", value: 2 },
	{ label: "Nehéz", value: 3 },
];
