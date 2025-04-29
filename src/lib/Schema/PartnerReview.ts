export type PartnerReview = {
	id: number;
	velemeny: string;
	created_at: string;
	felhasznalo: {
		adatok: {
			teljes_nev: string;
			kereszt_nev: string;
		};
	};
};
