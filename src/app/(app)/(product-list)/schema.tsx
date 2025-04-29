import { Product } from "@/app/product/schema";
import { Partner } from "@/lib/Schema/Partner";
import { PartnerReview } from "@/lib/Schema/PartnerReview";

export type subCategoriesFromProducts = {
	//Termékekhez köthető alkategóriák. PL 1 termék több kategóriában van, akkor hozni fogja.
	id: number;
	image: string;
	name: string;
	total: number;
	url: string;
};
export type subCategoryBoxesFromRedis = {
	//Kategóriákhoz köthető alkategóriákl
	id: number;
	image: string;
	name: string;
	total: number;
	url: string;
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
export interface Category {
	id: number;
	name: string;
	level: number;
	parent: number | null;
	child_limit: number | null;
	children: Category[];
	created_at: string;
	updated_at: string;
	description: string | null;
	end: string | null;
	icon: string | null;
	image: string | null;
	op_category_depth: "main" | "sub" | string; // ha csak ez a 2 érték lehetséges, lehet szűkíteni
	op_category_id: number;
	position: number;
	start: string | null;
	status: number;
	total: number;
	url: string;
	visible: number;
}
export type Filters = {
	name: string;
	url: string;
};
export type ProductsWithCategories = {
	prices: Prices;
	products: Product[];
	stocks: Stocks;
	subCategoriesFromProducts: subCategoriesFromProducts[];
	subCategoryBoxesFromRedis: subCategoryBoxesFromRedis[];
	total: number;
	filters: Filters[];
	category: Category;
};

export type PartnerProductsWithCategories = {
	prices: Prices;
	products: Product[];
	partner: { partner: Partner; reviews: PartnerReview[] };
	stocks: Stocks;
	subCategoriesFromProducts: subCategoriesFromProducts[];
	subCategoryBoxesFromRedis: subCategoryBoxesFromRedis[];
	total: number;
	filters: Filters[];
	category: Category;
};
