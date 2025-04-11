import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface OPselectProps extends React.ComponentPropsWithoutRef<typeof Select> {
	triggerClassName?: string;
	contentClassName?: string;
	placeholder?: string;
	children: React.ReactNode; // Mostantól gyermek elemeket várunk
}

export function OPselect({
	triggerClassName,
	contentClassName,
	placeholder,
	children,
	...props
}: OPselectProps) {
	return (
		<Select {...props}>
			<SelectTrigger
				className={cn(
					"focus-visible:ring-1 rounded-md peer w-full bg-transparent px-0 pt-6 pb-6 ps-3 pr-3 border text-sm text-gray-900 dark:text-gray-200",
					triggerClassName
				)}
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className={contentClassName}>{children}</SelectContent>
		</Select>
	);
}

/*HASZNÁLATA:
Mivel a mi OPselect komponensünk teljesen átadja a prop-okat az alapul szolgáló shadcn Select komponensnek (a {...props} kifejezéssel), ezért ugyanúgy használhatod a value vagy defaultValue prop-okat, mint az eredeti komponensnél.

--------------------------------------------------------------------------------
Kontrollált komponens - Használj egy React state-et a value prop-pal:
const [value, setValue] = useState("banana");
<OPselect value={value} onValueChange={setValue}>
    <SelectItem value="banana">Banán</SelectItem>
    .......
</OPselect>

--------------------------------------------------------------------------------
Nem kontrollált komponens - Használd a defaultValue vagy value prop-ot:
<OPselect defaultValue="banana">
    <SelectItem value="banana">Banán</SelectItem>
    .......
</OPselect>
--------------------------------------------------------------------------------
GROUP HASZNÁLATA:
<OPselect 
    defaultValue="cucumber" 
    onValueChange={(value) => console.log("Kiválasztott zöldség:", value)}
>
    <SelectGroup>
        <SelectLabel>Zöldségek</SelectLabel>
        <SelectItem value="carrot">Répa</SelectItem>
        <SelectItem value="tomato">Paradicsom</SelectItem>
        <SelectItem value="cucumber">Uborka</SelectItem>
    </SelectGroup>
</OPselect>
*/
