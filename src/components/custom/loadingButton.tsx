import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentProps } from "react";

interface LoadingButtonProps extends ComponentProps<typeof Button> {
	isLoading?: boolean;
	loadingText?: string;
	children: React.ReactNode;
}

const LoadingButton = ({ isLoading = false, loadingText, children, ...props }: LoadingButtonProps) => {
	return (
		<Button disabled={isLoading} {...props}>
			{isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
			{isLoading && loadingText ? loadingText : children}
		</Button>
	);
};

export default LoadingButton;
