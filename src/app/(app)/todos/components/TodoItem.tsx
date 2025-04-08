// src/app/(app)/todos/components/TodoItem.tsx
"use client";

import { Edit, Loader, Trash } from "lucide-react";
import { Todo, TODO_TYPES } from "../schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteTodoById } from "../todo.actions";
import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { usePathname, useSearchParams } from "next/navigation";
import { options } from "../util";
import { formatDate } from "date-fns";
import { toast } from "sonner";

const TodoItem = ({ todo }: { todo: Todo }) => {
	const [pending, startTransition] = useTransition();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Új URL építése a meglévő query paraméterek megtartásával és az editId frissítésével.
	const params = new URLSearchParams(searchParams.toString());
	params.set("editId", String(todo.id));
	const href = `${pathname}?${params.toString()}`;

	const handleDelete = (id: string) => {
		startTransition(async () => {
			await deleteTodoById(id);
			toast.success("Sikeresen töröltünk egy feladatot!");
		});
	};
	return (
		<div className="border rounded-md p-4 space-y-5">
			<div>
				<h5>{todo.name} </h5>
				<p>teszt: {formatDate("2024-01-05:22:22:10", "yyyy-MM-dd h:i:s")}</p>
				<p className="text-sm text-muted-foreground">Egyszeri dátum: {todo.date}</p>
				<p className="text-sm text-muted-foreground">
					Dátum tartomány: {todo.date_range.from} - {todo.date_range.to}
				</p>
				<p className="text-sm text-muted-foreground">
					Nehézségi szint:&nbsp;
					{TODO_TYPES.find((type) => type.value === Number(todo.type))?.label || "Ismeretlen"}
				</p>

				<p className="text-sm text-muted-foreground">
					<span className="text-sm text-muted-foreground">Leírás:&nbsp;</span>
					{todo.description}
				</p>
				<div className="flex gap-2">
					<p className="text-sm text-muted-foreground">Keretrendszerek: </p>
					{todo.framework.map((framework, index) => (
						<Badge className="bg-gray-200" key={index}>
							{options.find((option) => option.value === framework)?.label}
						</Badge>
					))}
				</div>
			</div>
			<div className="flex justify-end items-center gap-4">
				<Button variant="outline" className="rounded-sm" asChild>
					<Link href={href}>
						<Edit />
					</Link>
				</Button>
				<Button
					variant="destructive"
					className="rounded-sm"
					onClick={() => handleDelete(String(todo.id))}
				>
					{pending ? <Loader /> : <Trash />}
				</Button>
			</div>
		</div>
	);
};

export default TodoItem;
