import { Product } from "@/app/product/schema";
import OpIcon from "@/components/branding/opIcon";
import { Badge } from "@/components/ui/badge";
import { TooltipWrapper } from "@/components/ui/custom/TooltipWrapper";
import { formatNumber } from "@/lib/helpers/number";
import { cn } from "@/lib/utils";
import React from "react";

// Stock állapotok típusdefiníciója a jobb olvashatóságért
type StockStatusKey = "IN_STOCK" | "LOW_STOCK" | "ON_ORDER";
type StockStatus = {
	className: string;
	title: string;
	tooltip?: string;
};

// Konstans értékek, akár külön fájlba is kiszervezhetőek
const STOCK_STATUS: Record<StockStatusKey, StockStatus> = {
	IN_STOCK: {
		className: "bg-lime-500 text-white",
		title: "Készleten",
		tooltip: "A termék elérhető készletről",
	},
	LOW_STOCK: {
		className: "bg-orange-400 text-white",
		title: "Utolsó darabok",
		tooltip: "Utolsó darabok maradtak készleten",
	},
	ON_ORDER: {
		className: "bg-gray-500 text-white",
		title: "Rendelésre",
		tooltip: "onlinePénztárcádból fizethető összeg",
	},
};

// Fő komponens
export default function ProductLabels({ product }: { product: Product }) {
	return (
		<>
			<ProductStockBadge stock={product.stock} />
			<ProductSaveMoneyBadge price={product.price} />
		</>
	);
}

// Tiszta függvény a készlet állapot meghatározására
const getStockStatus = (stock: number): StockStatus => {
	if (stock === -1 || stock > 2) {
		return STOCK_STATUS.IN_STOCK;
	} else if (stock === 1 || stock === 2) {
		return STOCK_STATUS.LOW_STOCK;
	}
	return STOCK_STATUS.ON_ORDER;
};

// Készlet badge komponens
const ProductStockBadge = ({ className, stock }: { stock: number; className?: string }) => {
	const stockOption = getStockStatus(stock);

	return (
		<TooltipWrapper content={stockOption.tooltip}>
			<ProductBaseBadge className={cn(stockOption.className, className)}>
				{stockOption.title}
			</ProductBaseBadge>
		</TooltipWrapper>
	);
};

const ProductSaveMoneyBadge = ({ price }: { price: number }) => {
	return (
		<TooltipWrapper content="onlinePénztárcádból fizethető összeg">
			<ProductBaseBadge className="bg-secondary text-accent">
				<OpIcon className="mb-[0.8px]" />
				{formatNumber(Math.floor(price / 10000) * 500)} Ft
			</ProductBaseBadge>
		</TooltipWrapper>
	);
};

// Alap badge komponens
const ProductBaseBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <Badge className={cn("rounded-[4px] px-[3px] h-6 sm:h-7", className)}>{children}</Badge>;
};
