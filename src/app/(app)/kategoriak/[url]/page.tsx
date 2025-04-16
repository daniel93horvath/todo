import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { fetchGet } from "@/lib/api/fetch";
import { Product } from "@/app/product/schema";
import { createURLSearchParams } from "@/lib/helpers/url";
/*
Index signature ([key: string]):
Ez a rész határozza meg, hogy az objektum bármilyen string típusú kulcsot elfogad. Nem előre definiált tulajdonságok vannak benne, hanem dinamikusan hozzáférhető kulcsok, amelyeket a kód bármikor létrehozhat. Például, ha az URL-ben van egy id=123 vagy page=2, ezek a kulcsok a dinamikus kulcsok, és a kód ezt az index signature-t követi.
Értéktípus (string | string[] | undefined):
Ez a rész határozza meg, hogy a fenti kulcsokhoz tartozó érték milyen típusú lehet. Ebben az esetben a kulcs értéke lehet:
string: ha egyetlen értékről van szó (pl. id="123"),
string[]: ha több érték van ugyanazon kulcshoz (pl. tag=foo&tag=bar esetén a tag kulcs több, string-ekből álló tömböt adhat),
undefined: ha a kulcs nem létezik az objektumban.
*/

const Page = async ({
	params,
	searchParams,
}: {
	params: Promise<{ url: string }>;
	searchParams: Promise<{ [key: string]: string | string[] }>;
}) => {
	const categoryUrl = await params;
	const urlParams = await searchParams;
	///api/v3/categories/hutok-es-fagyasztok/products/category[]=hutogep-alkatresztartozek
	const urlSearchParams = createURLSearchParams(urlParams);
	const { data } = await fetchGet<{
		products: Product[];
		total: number;
	}>(`/api/v3/categories/${categoryUrl.url}/products?${urlSearchParams.toString()}`, {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 3600 },
	});

	console.log(data);

	// Alapértelmezett üres tömb, ha nincs data vagy products
	if (!data) {
		return <div className="mx-auto w-full md:px-5">Nincs terméktalálat</div>;
	}
	const products = data.products || [];
	return (
		<main>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{products.map((product) => (
					<ProductCard key={product.elastic_id} product={product} />
				))}
			</div>
		</main>
	);
};

export default Page;
