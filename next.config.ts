import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
	async rewrites() {
		return [
			{
				// Illeszkedik a kliens oldali /api/v3/... hívásokr
				source: "/api/v3/:path*",
				// Továbbítja a backend URL-re, levágva az /api/v3 részt a source-ból
				destination: `${process.env.NEXT_PUBLIC_APP_URL_BACKEND}/:path*`,
			},
		];
	},
};

export default nextConfig;
