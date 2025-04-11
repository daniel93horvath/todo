import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type Product = {
	id: number;
	name: string;
};

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card className="max-w-[280px]">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent className="flex-col justify-center">
				<Image
					src="https://tapetaposzter.hu/shop_ordered/49683/shop_pic/C5-2417S17.jpg"
					width={200}
					height={200}
					alt={product.name || "Termék kép"}
					className="rounded-sm"
				/>
				<p className="text-sm">{product.name}</p>
				<div></div>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
