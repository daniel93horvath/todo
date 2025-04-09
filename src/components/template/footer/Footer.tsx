import OpLogo from "@/components/branding/opLogo";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-secondary p-6">
			<div className="max-w-[1800] mx-auto flex-col">
				<div className="flex flex-col md:flex-row gap-4 text-center md:justify-between border-b-1 border-b-foreground/50 p-4">
					<div className="mx-auto md:m-0">
						<OpLogo colorVariant="light" />
					</div>

					<div className="text-muted-foreground text-sm block mx-auto text-center md:m-0 md:text-left">
						Kérdésed van? Segítünk!
						<br />
						<Link href="mailto:ugyfelszolgalat@onlinepenztarca.hu">
							ugyfelszolgalat@onlinepenztarca.hu
						</Link>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex flex-wrap justify-center gap-5 text-accent p-3">
						<Link href="https://www.onlinepenztarca.hu/story" className="hover:text-primary">
							Blog
						</Link>
						<Link
							href="https://api.virtualjog.hu/api/v1/document/5368?access-token=071b2f196268b18731e004c2b182a3ce"
							className="hover:text-primary"
						>
							Adatkezelés
						</Link>
						<Link
							href="https://api.virtualjog.hu/api/v1/document/7606?access-token=071b2f196268b18731e004c2b182a3ce"
							className="hover:text-primary"
						>
							ÁSZF
						</Link>
						<Link
							href="https://www.onlinepenztarca.hu/partner/cikkek"
							className="hover:text-primary"
						>
							B2B tudástár
						</Link>
						<Link href="#" className="hover:text-primary">
							Cookie beállítások
						</Link>
						<Link
							href="https://www.onlinepenztarca.hu/admin/login"
							className="hover:text-primary"
						>
							Webáruházak részére
						</Link>
					</div>
					<div className="flex gap-3">
						<Link target="_blank" href="https://www.facebook.com/OnlinePenztarca">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								height="30"
								width="30"
								className="rounded-full text-primary bg-accent p-1 fill-secondary"
								version="1.1"
								id="Layer_1"
								viewBox="0 0 310 310"
							>
								<g id="XMLID_834_">
									<path
										id="XMLID_835_"
										d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
                                    c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
                                    V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
                                    C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
                                    c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"
									/>
								</g>
							</svg>
						</Link>
						<Link target="_blank" href="https://www.youtube.com/watch?v=IFzQMlcDoDg">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								className="rounded-full text-primary bg-accent p-1 fill-secondary"
								width="30"
								height="30"
								viewBox="0 0 24 24"
							>
								<path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z"></path>
							</svg>
						</Link>
						<Link
							target="_blank"
							href="https://www.instagram.com/onlinepenztarca?igsh=MXV4Y2ZscjR6NmRuaQ=="
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="30"
								height="30"
								className="rounded-full text-primary bg-accent p-1 fill-secondary"
								fill="white"
								viewBox="0 0 30 30"
							>
								<path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
