"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { OpInput } from "@/components/custom/input/opInput";
import { FilterForm, filterFormSchema } from "../schema";

import { MultiSelect } from "@/components/custom/opMultiSelect";
import { options } from "../util";
import { useRouter, useSearchParams } from "next/navigation";
import { createURLSearchParams } from "@/lib/helpers/url";

import { OPsingleDatePicker } from "@/components/custom/date/OPsingleDatePicker";
import { OPdateRangePicker } from "@/components/custom/date/OPdateRangePicker";

export default function TodoFilterV2() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const form = useForm<FilterForm>({
		defaultValues: {
			name: searchParams.get("name") || "",
			type: searchParams.get("type") || "",
			date: searchParams.get("date") || "",
			date_range: {
				from: searchParams.get("date_range.from") || "",
				to: searchParams.get("date_range.to") || "",
			},
			framework: searchParams.getAll("framework"),
		},
	});

	async function onSubmit(values: z.infer<typeof filterFormSchema>) {
		if (values.type === "0") {
			delete values.type; //Ha a "válassz" opciót választják a selectben, akkor töröljük belőle!
		}
		const queryParams = createURLSearchParams(values);
		router.push(`/todos?${queryParams.toString()}`);
	}
	//Ár tól-ig, input +type, dátumoknál kell az x
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="py-10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<OpInput label="Név" type="email" {...field} />
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
										selected={field.value || []}
										onChange={field.onChange}
										placeholder="Keretrendszerek"
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
							<FormItem className="flex flex-col">
								<OPsingleDatePicker
									value={field.value}
									onChange={field.onChange}
									placeholder="Egyszeri dátum"
									months={1}
									returnAsString
									className={form.formState.errors.date ? "border-red-500" : ""}
								/>
								<p className="text-destructive">
									{form.formState?.errors?.date?.message}
								</p>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="date_range"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<OPdateRangePicker
									value={field.value}
									onChange={field.onChange}
									placeholder="Dátum tartomány"
									months={2}
									returnAsString
									className={form.formState.errors.date ? "border-red-500" : ""}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4">
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Típus" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="0">Bármelyik</SelectItem>
										<SelectItem value="1">Könnyű</SelectItem>
										<SelectItem value="2">Közepes</SelectItem>
										<SelectItem value="3">Nehéz</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center">
						<Button type="submit">Szűrés</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
