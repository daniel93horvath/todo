import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function CategoryDescription() {
	return (
		<Accordion type="single" collapsible className="w-full p-3 bg-white rounded-md">
			<AccordionItem value="item-1">
				<AccordionTrigger className="hover:no-underline">
					<div>
						<h4>Is it accessible? Yes. It adheres to the WAI-ARIA design pattern Yes.</h4>
						<span className="text-xs font-light">
							Yes. It adheres to the WAI-ARIA design pattern Yes. It adheres to the WAI-ARIA
							design pattern Yes. It adheres to the WAI-ARIA de design pattern Yes. It
							adheres to the WAI-ARIA design pattern Yes. It adheres
						</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					Yes. It adheres to the WAI-ARIA design pattern Yes. It adheres to the WAI-ARIA design
					pattern Yes. It adheres to the WAI-ARIA design pattern Yes. It adheres to the WAI-ARIA
					design pattern Yes. It adheres to the WAI-ARIA design pattern Yes. It adheres to the
					WAI-ARIA design pattern Yes. It adheres to the WAI-ARIA design pattern Yes. It adheres
					to the WAI-ARIA design pattern.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
