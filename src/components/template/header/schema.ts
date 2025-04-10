import { zod } from "@/lib/zod";

export const userLoginSchema = zod.object({
	email: zod.string().min(4).email(),
	password: zod.string().min(6),
});

export type UserLogin = zod.infer<typeof userLoginSchema>;
