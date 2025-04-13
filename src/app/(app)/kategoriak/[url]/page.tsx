import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { fetchGet } from "@/lib/api/fetch";
import { Product } from "@/app/product/schema";
import FilterSidebar from "./components/FilterSidebar";
import { Prices, Stocks, subCategoriesFromProducts } from "./schema";

const Page = async ({ params }: { params: Promise<{ url: string }> }) => {
	const categoryUrl = await params;
	const { data } = await fetchGet<{
		products: Product[];
		total: number;
		subCategoriesFromProducts: subCategoriesFromProducts[];
		prices: Prices;
		stocks: Stocks;
	}>(`/categories/dinamic/${categoryUrl.url}`, {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 3600 },
	});
	// Alapértelmezett üres tömb, ha nincs data vagy products
	if (!data) {
		return <div className="mx-auto w-full md:px-5">Nincs terméktalálat</div>;
	}
	const products = data.products || [];
	return (
		<div className="mx-auto w-full md:px-5">
			<h1>Villámajánlatok</h1>
			<div className="my-6">Rövid leírás a Villámajánlatokról!</div>

			<div className="grid md:grid-cols-[300px_1fr] gap-4">
				<FilterSidebar
					subCategories={data.subCategoriesFromProducts || []}
					prices={data.prices}
					stocks={data.stocks}
				/>
				<main>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{products.map((product) => (
							<ProductCard key={product.elastic_id} product={product} />
						))}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Page;
