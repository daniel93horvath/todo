//src/app/(app)/kategoriak/[url]/schema.tsx
import { Product } from "@/app/product/schema";

export type subCategoriesFromProducts = {
	id: number;
	image: string;
	name: string;
	total: number;
	url: string;
};

export type Partner = {
	// Azonosítók
	id: number;
	brand_nev: string;
	brand_nev_slug: string;
	api_kulcs: string;
	api_secret?: string;
	js_api_hash?: string;
	partner_hash?: string;

	// Alap információk
	nev: string;
	email: string;
	weboldal: string;
	onlinepenztarca_aloldal: string;
	leiras?: string;
	fo_termekkor?: string;
	szekhely: string;
	adoszam: string;

	// Kapcsolattartó
	kapcsolat_tarto?: string;
	kapcsolat_tarto_email?: string;
	kapcsolattarto_beosztas?: string;
	mobil_szam?: string;

	// Státuszok
	allapot: number;
	lathato: number;
	kiemelt: number;
	feed_status: number;

	// Feed és integráció
	feedXmlUrl?: string;
	webaruhaz_motor?: string;
	elastic_termek?: number;

	// Pénzügyi adatok
	csomag: number;
	fizetos_csomag: number;
	billingo_id?: number;
	stripe_id?: string;

	// Idő adatok
	bekapcsolas?: string;
	kikapcsolas?: string | null;
	cegalapitas_eve?: number;
	created_at: string;
	updated_at: string;

	// Statisztikák
	korrekt_webaruhaz_ertek?: number;
	korrekt_ertekeles_count?: number;
	korrekt_velemeny_count?: number;
	havi_egyedi_oldal_latogato?: number;
	vevo_ertkelesek_jellemzo_erteke?: number;
};

export type Prices = {
	min: number;
	max: number;
	ranges: {
		min: number;
		max: number;
		total: number;
	}[];
};

export type Stocks = {
	full: number;
	none: number;
};

export type ProductsWithCategories = {
	prices: Prices;
	products: Product[];
	stocks: Stocks;
	subCategoriesFromProducts: subCategoriesFromProducts[];
	total: number;
};
