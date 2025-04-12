/**
 * Partner entitás típusdefiníciója
 * Az onlinepenztarca.hu API-tól érkező partner adatok modellje
 */
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
