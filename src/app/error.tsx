"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Coffee, Loader2, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface GlobalErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	useEffect(() => {
		console.error("Hiba történt az alkalmazásban:", error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl from-blue-100 via-background to-orange-100 dark:from-blue-900/30 dark:via-background dark:to-orange-900/30 p-6 overflow-hidden">
			{/* Enyhe háttér színátmenet */}
			<style jsx global>{`
				/* ÚJ ÉS FRISSÍTETT ANIMÁCIÓK */
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				@keyframes wiggle {
					0%,
					100% {
						transform: rotate(-5deg) scale(1);
					}
					25% {
						transform: rotate(5deg) scale(1.05);
					}
					50% {
						transform: rotate(-5deg) scale(1);
					}
					75% {
						transform: rotate(5deg) scale(1.05);
					}
					100% {
						transform: rotate(-5deg) scale(1);
					} /* Zárás simán */
				}
				@keyframes subtleBounce {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-3px);
					}
				}
				.animate-fade-in {
					animation: fadeIn 0.6s ease-out forwards;
				}
				.animate-wiggle {
					/* Egy kicsit finomabb, nem folyamatos wiggle */
					animation: wiggle 1.5s ease-in-out 2 forwards; /* Lefut kétszer */
					transform-origin: bottom center; /* Forgáspont az alján */
				}
				.animate-subtle-bounce {
					animation: subtleBounce 1s ease-in-out infinite;
				}
				/* Segédosztályok a késleltetéshez */
				.animation-delay-200 {
					animation-delay: 200ms;
					opacity: 0;
					animation-fill-mode: forwards;
				}
				.animation-delay-400 {
					animation-delay: 400ms;
					opacity: 0;
					animation-fill-mode: forwards;
				}
				.animation-delay-600 {
					animation-delay: 600ms;
					opacity: 0;
					animation-fill-mode: forwards;
				}
			`}</style>
			<Card className="w-full max-w-3xl text-center shadow-2xl animate-fade-in transform perspective-1000 rotate-x-[-2deg] hover:rotate-x-0 transition-transform duration-500">
				{/* Kis perspektivikus torzítás és hover effekt */}
				<CardHeader className="pb-4">
					<div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-amber-500/10 border-2 border-amber-500/30 shadow-inner">
						{/* Wiggle animáció az ikonon */}
						<Coffee className="size-9 text-amber-600 animate-wiggle" />
					</div>
					<CardTitle className="text-3xl font-extrabold tracking-tight text-foreground animate-fade-in animation-delay-200">
						Hoppá! Egy kis fennakadás...
					</CardTitle>
					<CardDescription className="pt-2 text-lg text-muted-foreground animate-fade-in animation-delay-400">
						Úgy tűnik, a rendszerünk épp egy{" "}
						<Coffee className="inline size-5 align-text-bottom text-amber-700" /> kávészünetet
						tart.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-5 animate-fade-in animation-delay-600">
					<div className="flex items-center justify-center gap-2 text-base text-muted-foreground">
						<Loader2 className="size-5 animate-spin text-primary" /> {/* Pörgő ikon */}
						<span>De ne aggódj, bátor fejlesztőink már úton vannak!</span>
					</div>
					<p className="text-sm text-muted-foreground/80 px-4">
						Addig is, próbáld meg frissíteni az oldalt, vagy térj vissza a biztonságos
						főoldalra. Lehet, hogy csak egy kóbor elektron volt a hibás. 😉
					</p>
					{/* Fejlesztői infók (opcionális, mint korábban) */}
					{process.env.NODE_ENV === "development" && (error?.digest || error?.message) && (
						<details className="text-left text-xs text-muted-foreground pt-3">
							<summary className="cursor-pointer hover:text-foreground transition-colors">
								Technikai részletek (csak fejlesztőknek)
							</summary>
							{error.digest && (
								<p className="mt-1 font-mono text-destructive/80">
									Digest: {error.digest}
								</p>
							)}
							<pre className="mt-2 whitespace-pre-wrap rounded bg-muted/50 p-3 font-mono text-[11px] max-h-40 overflow-auto">
								{error.stack || error.message}
							</pre>
						</details>
					)}
				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-8 pb-6">
					<Button
						onClick={() => reset()}
						variant="default"
						size="lg"
						className="shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-primary/90 animate-subtle-bounce" // Finom pattogás
					>
						<RefreshCw className="size-5 mr-2" />
						Próbáljuk újra!
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50"
					>
						<Link href="/">
							<Home className="size-5 mr-2" />
							Vissza a Főoldalra
						</Link>
					</Button>
				</CardFooter>
			</Card>
			<p className="mt-8 text-xs text-muted-foreground/60 text-center animate-fade-in animation-delay-600">
				A technológia csodálatos... amikor működik. Köszönjük a türelmed!
			</p>
		</div>
	);
}
