import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { fetchGet } from "@/lib/api/fetch";
import { Product } from "@/app/product/schema";

const HomePage = async () => {
	const { data } = await fetchGet<{ products: Product[]; total: number }>(
		"/categories/dinamic/hutok-es-fagyasztok",
		{
			baseUrl: "https://www.onlinepenztarca.hu",
			cacheOptions: { revalidate: 3600 },
		}
	);

	// Alapértelmezett üres tömb, ha nincs data vagy products
	const products = data?.products || [];

	return (
		<div className="container mx-auto px-4">
			<h1>Villámajánlatok</h1>
			<div className="my-6">Rövid leírás a Villámajánlatokról!</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{products.map((product) => (
					<ProductCard key={product.elastic_id} product={product} />
				))}
			</div>

			<div className="h-96 mt-8">4</div>
			<div className="h-96">3</div>
			<div className="h-96">2</div>
			<div className="h-96">1</div>
		</div>
	);
};

export default HomePage;
