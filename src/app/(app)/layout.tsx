import Header from "@/components/template/header/Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen flex-col">
			<Header />
			<main className="flex-1 wrapper flex h-screen flex-col container mx-auto pt-5 wrapper">
				{children}
			</main>
		</div>
	);
}
