"use client";

import { useEffect, useRef, useState } from "react";

interface ClientHeaderProps {
	children: React.ReactNode;
}

export function ClientHeaderScrollFeature({ children }: ClientHeaderProps) {
	const [isVisible, setIsVisible] = useState(true);
	const lastScrollY = useRef(0);
	// Csak akkor reagálunk, ha a scroll delta meghalad egy bizonyos küszöböt
	const scrollThreshold = 100;

	useEffect(() => {
		const controlHeader = () => {
			const currentScrollY = window.scrollY;
			const delta = currentScrollY - lastScrollY.current;

			if (Math.abs(delta) < scrollThreshold) {
				return;
			}

			if (delta < 0) {
				// Felfelé görgetés esetén a header megjelenítése
				setIsVisible(true);
			} else if (currentScrollY > 100) {
				// Lefelé görgetés esetén, ha nem vagyunk az oldal tetején, elrejtjük a headert
				setIsVisible(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", controlHeader);

		return () => {
			window.removeEventListener("scroll", controlHeader);
		};
	}, []);

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
