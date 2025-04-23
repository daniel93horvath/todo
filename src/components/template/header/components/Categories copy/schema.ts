// Category típusdefiníció
export interface Category {
	id: number;
	name: string;
	level: number;
	parent: number | null;
	child_limit: number;
	children?: Category[];
	url: string;
	icon?: string;
	image: string;
	description?: string;
	op_category_depth?: string;
	op_category_id?: number;
	status?: number;
	visible?: number;
	total?: number;
}

export interface DropDownCategoryProps {
	categories: Category[];
	activeCategory?: number | null;
	onCategoryHover?: (categoryId: number) => void;
	isMobile?: boolean;
}
