import { Partner } from "@/lib/Schema/Partner";
export type Product = {
	// Azonosítók
	product_id: string;
	elastic_id?: string;
	product_code: string;

	// Termék alap információk
	name: string;
	name_slug: string;
	description: string;
	image: string;
	url: string;

	// Árak
	price: number;
	saving?: number;

	// Állapot információk
	age_limit: boolean;
	stock: number;
	status: number;
	visible: boolean;

	// Statisztikai adatok
	views?: number;
	rating?: number;

	// Kapcsolódó entitás
	partner: Partner;
};
