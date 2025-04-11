// src/app/(app)/todos/components/TodoForm.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTodo, updateTodo } from "../todo.actions";
import { Todo, todoSchema } from "../schema";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import LoadingButton from "@/components/ui/custom/loadingButton";
import { OpInput } from "@/components/ui/custom/input/opInput";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/custom/opMultiSelect";
import { options } from "../util";
import { OPdateRangePicker } from "@/components/ui/custom/date/OPdateRangePicker";
import { OPsingleDatePicker } from "@/components/ui/custom/date/OPsingleDatePicker";
import { fetchGet } from "@/lib/api/fetch";
//import { delay } from "@/lib/utils";

const todoFormEmptyValues: Todo = {
	name: "",
	framework: [],
	date: "",
	date_range: {
		from: "",
		to: "",
	},
	type: "1",
	description: "",
};

export default function TodoForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const editId = searchParams.get("editId");
	const [open, setOpen] = useState(false);

	const form = useForm<Todo>({
		resolver: zodResolver(todoSchema),
		defaultValues: todoFormEmptyValues,
	});
	// Ha van editId, betöltjük a szerkesztendő todo adatait
	useEffect(() => {
		if (editId) {
			// Ha editId van, fetch-eljük az adott Todo-t
			const fetchData = async () => {
				const todoResponse = await fetchGet<Todo>(`/todos/${editId}`);
				if (todoResponse.data) {
					form.reset(todoResponse.data);
					setOpen(true);
				} else {
					toast.error("Nem található ilyen fealdat!");
					setOpen(false);
					return;
				}
			};
			fetchData();
		} else {
			// Ha NINCS editId, töröljük a form értékeket
			form.reset(todoFormEmptyValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editId]);

	// Mentés (ha van editId, akkor update, ha nincs, akkor create)
	const onSubmit = async (values: Todo) => {
		let response;
		if (editId) {
			response = await updateTodo(editId, values);
		} else {
			response = await createTodo(values);
		}

		if (!response.success) {
			toast.error(response.message);
			return;
		}

		toast.success("Sikeres mentés!");
		form.reset();
		handleClose();
	};

	// Bezárásnál töröljük az editId-t az URL-ből
	const handleClose = () => {
		/*searchParams.entries() - Visszaad egy iterátort az URL paraméterekről.
		Array.from() - Ez egy tömböt állít előa searchParams.etries()-ből. Ebből ez lesz: [["id", 1], ["name", "John"]]
		URLSearchParams() - Elfogadj az Array.from() tömböt és létrehoz egy mutable (módosítható) url paramétert
		router replace - a böngésző URL módosítását végzi úgy, hogy nem menti el az előzményekben.
		newParams.toString() - a query paramétereket kiírja stringként.*/
		const newParams = new URLSearchParams(Array.from(searchParams.entries()));
		newParams.delete("editId");
		router.replace(`/todos?${newParams.toString()}`);
		setOpen(false);

		//Custom hook, amit GPT ajánlott: updateQueryParams({ editId: undefined });
	};
	return (
		<Dialog open={open} onOpenChange={handleClose}>
			{/* Gomb az új létrehozásra */}
			<Button onClick={() => setOpen(true)}>+ Új feladat hozzáadása</Button>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{editId ? "Feladat szerkesztése" : "Feladat hozzáadása"}</DialogTitle>
					<DialogDescription>
						Itt tudsz feladatot {editId ? "módosítani" : "létrehozni"}.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<OpInput label="Feladat neve" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="framework"
							defaultValue={[]}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<MultiSelect
											options={options}
											selected={field.value}
											onChange={field.onChange}
											placeholder="Keretrendszerek"
											isError={!!form.formState.errors.framework}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<OPsingleDatePicker
											value={field.value}
											placeholder="Egyszeri dátum"
											onChange={field.onChange}
											months={2}
											returnAsString
											maxDate={new Date(2025, 2, 26)}
											isError={!!form.formState.errors.date}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date_range"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<OPdateRangePicker
											value={field.value}
											onChange={field.onChange}
											placeholder="Dátum tartomány"
											months={2}
											returnAsString
											maxDate={new Date(2025, 2, 26)}
											isError={!!form.formState.errors.date_range}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Típus" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="1">Könnyű</SelectItem>
											<SelectItem value="2">Közepes</SelectItem>
											<SelectItem value="3">Nehéz</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea placeholder="Feladat leírása." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<LoadingButton
							loadingText="Folyamatban..."
							isLoading={form.formState.isSubmitting}
						>
							Mentés
						</LoadingButton>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
