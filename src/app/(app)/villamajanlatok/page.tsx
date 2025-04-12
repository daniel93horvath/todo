import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { fetchGet } from "@/lib/api/fetch";
import { Product } from "@/app/product/schema";
import FilterSidebar from "./components/FilterSidebar";
import { subCategoriesFromProducts } from "./schema";

const FlashDealsPage = async () => {
	const { data } = await fetchGet<{
		products: Product[];
		total: number;
		subCategoriesFromProducts: subCategoriesFromProducts[];
	}>("/categories/dinamic/hutok-es-fagyasztok", {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 0 },
	});

	// Alapértelmezett üres tömb, ha nincs data vagy products
	const products = data?.products || [];
	console.log(data);
	return (
		<div className="mx-auto w-full md:px-5">
			<h1>Villámajánlatok</h1>
			<div className="my-6">Rövid leírás a Villámajánlatokról!</div>

			<div className="grid md:grid-cols-[300px_1fr] gap-4">
				<FilterSidebar subCategories={data?.subCategoriesFromProducts || []} />
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

export default FlashDealsPage;
