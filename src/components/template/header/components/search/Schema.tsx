//src/components/template/header/components/search/Schema.tsx
export type Category = {
	image: string;
	name: string;
	url: string;
	total?: number;
};

export type Product = {
	image: string;
	name: string;
	url: string;
	price: number;
};

export type SearchResults = {
	categories: Category[];
	products: Product[];
};
