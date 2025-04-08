"use server";
//src/app/(app)/todos/todo.actions.ts
import { fetchDelete, fetchGet, fetchPost, fetchPut } from "@/lib/api/fetch";
import { Todo } from "./schema";
import { revalidatePath } from "next/cache";

export async function createTodo(data: Todo) {
	//Laravel backend fetch...
	const res = await fetchPost("/todos", data);
	revalidatePath("/todos");
	return res;
}

export async function updateTodo(id: string, data: Todo) {
	const response = await fetchPut(`/todos/${id}`, data);
	revalidatePath("/todos");
	return response;
}

export async function getTodoById(id: string) {
	const todo = await fetchGet<Todo>(`/todos/${id}`);
	if (!todo.data) {
		return { success: true, message: "Sikeres lekérés", data: null };
	}
	return todo;
}

export async function deleteTodoById(id: string) {
	await fetchDelete<Todo>(`/todos/${id}`);
	revalidatePath("/todos");
}
