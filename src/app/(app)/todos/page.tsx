// src/app/(app)/todos/page.tsx

import { fetchGet } from "@/lib/api/fetch";
import { Todo } from "./schema";
import TodoForm from "./components/TodoFormDialog";
import TodoItem from "./components/TodoItem";
import Filter from "./components/Filter";
import { createURLSearchParams } from "@/lib/helpers/url";
import { OpInput } from "@/components/ui/custom/input/opInput";

// Loader létrehozása ugyanezzel a konfigurációval

const TodosPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] }>;
}) => {
	const params = await searchParams;
	const queryParams = createURLSearchParams(params);
	console.log(queryParams.toString());
	const { data: todos = [] } = await fetchGet<Todo[]>(`/todos?${queryParams.toString()}`);

	return (
		<div className="p-2 container mx-auto space-y-4 mt-15">
			<h1>Todo lista</h1>
			<div className="my-8 max-w-sm">
				<OpInput label="Felhasználó név keresése" type="text" />
			</div>
			<Filter />
			<div className="text-right">
				<TodoForm />
			</div>

			<div className="space-y-4 md:grid-cols-2 lg:grid-cols-3 grid gap-5">
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</div>
		</div>
	);
};

export default TodosPage;
