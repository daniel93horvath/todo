"use client";
import { OpInput } from "@/components/custom/input/opInput";
import { OpInputPassword } from "@/components/custom/input/opInputPassword";
import { Button } from "@/components/ui/button";
//import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
//import { useForm } from "react-hook-form";
//import { UserLogin, userLoginSchema } from "../schema";

const LoginContent = () => {
	/*const form = useForm({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: UserLogin) => {
		console.log("onSubmit");
	};*/

	return (
		<div>
			<div className="p-3 space-y-4">
				<OpInput label="Email cím" />
				<div className="flex gap-2 items-center mb-2">
					<OpInputPassword label="Jelszó" />
					<Button className="w-12">
						<ArrowRightIcon />
					</Button>
				</div>
				<Link
					href="https://www.onlinepenztarca.hu/login/rememberpassword"
					className="text-sidebar-accent text-sm underline"
				>
					Elfelejtett jelszó
				</Link>
			</div>
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
