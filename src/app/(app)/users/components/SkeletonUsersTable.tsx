import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const UsersTableSkeleton = () => {
	// 5 sorból áll a skeleton, mert 5 elemet kérünk le egyszerre
	const skeletonRows = Array(10).fill(0);

	return (
		<div className="min-h-85">
			<Table>
				<TableCaption>Felhasználói lista betöltése...</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Created at</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{skeletonRows.map((_, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">
								<div className="h-4 w-10 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
							<TableCell>
								<div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
							<TableCell>
								<div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
							<TableCell>
								<div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
							<TableCell>
								<div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
							<TableCell>
								<div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
							<TableCell>
								<div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
							<TableCell>
								<div className="h-4 w-8 animate-pulse rounded bg-gray-200"></div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UsersTableSkeleton;
