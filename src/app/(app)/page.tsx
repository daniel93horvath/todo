import Link from "next/link";

const HomePage = async () => {
	return (
		<div>
			<div>
				Lorem ipsum, dolor <Link href="#">sit amet consectetur adipisicing</Link> elit. Sint ut
				magni vel, quia nesciunt eum molestiae neque eius incidunt! Sapiente a saepe totam
				facilis. Doloremque libero vel ut dignissimos numquam!
			</div>
			<br />
			<br />
			<div className="h-96">4</div>
			<div className="h-96">3</div>
			<div className="h-96">2</div>
			<div className="h-96">1</div>
		</div>
	);
};

export default HomePage;
