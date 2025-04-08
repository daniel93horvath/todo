import { fetchGetPaginated } from "@/lib/api/fetch";
import UsersTable from "./components/UsersTable";
import { User } from "./schema";
import OPpagination from "@/components/custom/opPagination";
import { createURLSearchParams } from "@/lib/helpers/url";
import SearchUsers from "./components/SearchUsers";
import { Suspense } from "react";
import UsersTableSkeleton from "./components/SkeletonUsersTable";

const UsersPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
	const params = await searchParams;
	const queryParams = createURLSearchParams(params);
	const searchKey = queryParams.toString(); // Ez segít azonosítani ha változik a keresés
	return (
		<div>
			<h3>Users page</h3>
			<SearchUsers />
			<Suspense key={searchKey} fallback={<UsersTableSkeleton />}>
				<UsersDataTable queryParams={queryParams} />
			</Suspense>
		</div>
	);
};

export default UsersPage;

// Ez egy új szerver komponens, ami elvégzi az adatok lekérését
async function UsersDataTable({ queryParams }: { queryParams: URLSearchParams }) {
	const { data = [], meta } = await fetchGetPaginated<User[]>(
		`/users?limit=5&${queryParams.toString()}`
	);

	return (
		<>
			<UsersTable data={data} />
			<br />
			<OPpagination
				currentPage={meta.current_page}
				totalItems={meta.total}
				itemsPerPage={meta.per_page}
			/>
		</>
	);
}
