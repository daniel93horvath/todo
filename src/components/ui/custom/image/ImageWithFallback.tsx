"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";
import { BLUR_DATA_URL, FALLBACK_DATA_URL } from "./staticImages";

// override ImageProps.src
type FallbackImageProps = Omit<ImageProps, "src"> & {
	src: string | StaticImageData;
};

export default function ImageWithFallback({ src, alt, ...rest }: FallbackImageProps) {
	const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<>
			{/* {!isLoaded && <div className="absolute inset-0 animate-pulse rounded-md bg-muted/50"></div>} */}
			<Image
				{...rest}
				src={imgSrc}
				alt={alt}
				placeholder="blur"
				blurDataURL={BLUR_DATA_URL}
				onLoad={() => setIsLoaded(true)}
				onError={() => setImgSrc(FALLBACK_DATA_URL)}
				className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${
					rest.className ?? ""
				}`}
			/>
		</>
	);
}
