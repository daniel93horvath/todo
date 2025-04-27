"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DOMPurify from "isomorphic-dompurify";
import { FileSpreadsheetIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const dynamic = "force-static";

export function CategoryDescription({ description }: { description?: string }) {
	const [accordionValue, setAccordionValue] = useState("category-description"); // Kezdetben nyitott állapotban van, mert így olvassa be a crawler, utána becsukom...
	useEffect(() => {
		setAccordionValue("");
	}, []);

	if (!description) return;

	const cleanDescription = DOMPurify.sanitize(description, {
		USE_PROFILES: { html: true },
	});

	const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.replace(/\/$/, "") ?? "";
	const descriptionWithImages = cleanDescription.replace(
		/<img\s+([^>]*?)src="(?!https?:\/\/)([^">]+)"/gi,
		`<img $1src="${base}$2"`
	);

	const descriptionTitleMatch = cleanDescription.match(/<h2[^>]*>(.*?)<\/h2>/i);
	const categoryDescriptionTitle = descriptionTitleMatch?.[1] ?? "";

	return (
		<Accordion
			type="single"
			value={accordionValue}
			onValueChange={setAccordionValue}
			collapsible
			className="w-full p-3 bg-card rounded-md border col-start-2"
		>
			<AccordionItem value="category-description">
				<AccordionTrigger className="items-center">
					<div className="flex items-center gap-3">
						<FileSpreadsheetIcon />
						<h5 className="font-extrabold">{categoryDescriptionTitle}</h5>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div
						className="
							[&_h3]:my-3
							[&_h4]:my-3
							[&_h5]:my-3
							[&_img]:my-3
							"
						dangerouslySetInnerHTML={{ __html: descriptionWithImages }}
					/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
