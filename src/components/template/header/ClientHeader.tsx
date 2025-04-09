"use client";

import { useEffect, useState } from "react";

interface ClientHeaderProps {
	children: React.ReactNode;
}

export function ClientHeader({ children }: ClientHeaderProps) {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const controlHeader = () => {
			const currentScrollY = window.scrollY;

			// Megjelenítjük a headert, ha felfelé görgetünk
			if (currentScrollY < lastScrollY) {
				setIsVisible(true);
			}
			// Elrejtjük a headert, ha lefelé görgetünk és már nem vagyunk az oldal tetején
			else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
				setIsVisible(false);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", controlHeader);

		return () => {
			window.removeEventListener("scroll", controlHeader);
		};
	}, [lastScrollY]);

	return (
		<div
			className={`w-full fixed z-50 top-0 transition-transform duration-300 ease-in-out ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			{children}
		</div>
	);
}
