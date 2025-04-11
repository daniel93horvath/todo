import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "onlinepenztarca.hu",
			},
			{
				protocol: "https",
				hostname: "www.onlinepenztarca.hu",
			},
			{
				protocol: "https",
				hostname: "tapetaposzter.hu",
			},
		],
	},
};

export default nextConfig;
