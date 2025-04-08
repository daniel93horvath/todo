/**
 * Formázza a számot ezreselválasztó jelekkel
 * @param num - A formázandó szám
 * @param separator - Az ezres elválasztó karakter (alapértelmezett: ".")
 * @returns A formázott szám szövegként
 */
export const formatNumber = (num: number, separator: string = "."): string => {
	// Számjegyekre bontjuk a számot
	const parts = num.toString().split(".");
	const wholePart = parts[0];
	const decimalPart = parts.length > 1 ? parts[1] : "";

	// Ezresenként csoportosítjuk a számokat
	const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

	// Ha van tizedesjegy, visszaillesztjük
	return decimalPart ? `${formattedWholePart}.${decimalPart}` : formattedWholePart;
};
