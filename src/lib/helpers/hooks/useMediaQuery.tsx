"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);

		setMatches(media.matches); // Kezdeti állapot beállítása
		const listener = (event: MediaQueryListEvent) => {
			setMatches(event.matches); // Listener a médialekérdezés változásaira
		};

		media.addEventListener("change", listener);

		// Cleanup function
		return () => {
			media.removeEventListener("change", listener);
		};
	}, [query]);

	return matches;
}
