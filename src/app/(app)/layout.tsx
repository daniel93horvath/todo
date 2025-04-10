import Footer from "@/components/template/footer/Footer";
import Header from "@/components/template/header/Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col">
			<Header />
			<main className="flex-1 wrapper mt-25 md:mt-35 flex h-screen flex-col container mx-auto pt-5 wrapper min-h-screen">
				{children}
			</main>
			<Footer />
		</div>
	);
}
