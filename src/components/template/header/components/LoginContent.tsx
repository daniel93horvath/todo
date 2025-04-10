"use client";
import { OpInput } from "@/components/custom/input/opInput";
import { OpInputPassword } from "@/components/custom/input/opInputPassword";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { UserLogin, userLoginSchema } from "../schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const LoginContent = () => {
	const form = useForm({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: UserLogin) => {
		console.log(values);
		alert(1);
	};

	return (
		<div>
			<Form {...form}>
				<form className="p-3 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<OpInput label="Email cím" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex gap-2 items-center mb-2">
									<FormControl>
										<OpInputPassword label="password" {...field} />
									</FormControl>
									<Button className="w-12">
										<ArrowRightIcon />
									</Button>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Link
						href="https://www.onlinepenztarca.hu/login/rememberpassword"
						className="text-sidebar-accent text-sm underline"
					>
						Elfelejtett jelszó
					</Link>
				</form>
			</Form>
			<div className="relative h-32 overflow-hidden flex items-center">
				<div className="absolute inset-0">
					<Image
						src="https://www.onlinepenztarca.hu/images/op-reg-foto.png?v=11"
						alt="Regisztráció háttér"
						className="rounded-md md:rounded-none"
						fill
						objectFit="cover"
						priority={false}
					/>
				</div>
				<div className="ps-25">
					<span className="z-10 relative text-xs text-secondary">
						Új felhasználóként
						<span className="bg-primary font-extrabold rounded-xs">1.000 Ft-ot</span>
						teszünk új onlinePénztárcádba!
					</span>
					<div className="relative z-10 flex items-center mt-2">
						<Link href="https://www.onlinepenztarca.hu/uj-penztarca-regisztracio">
							<Button variant="secondary">Regisztráció</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginContent;
