import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { User } from "../schema";
import { formatDate } from "date-fns";
import { DialogDrawer } from "./DialogDrawer";

//Miért nem volt jó akkor, amikor csak a data-t adta be? Ezt majd meg kell próbálni megcsinálni!
const UsersTable = ({ data }: { data: User[] }) => {
	return (
		<div>
			<Table>
				<TableCaption>Felhasználói lista</TableCaption>
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
					{data.map((user) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{user.id}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>{user.status}</TableCell>
							<TableCell>{user.location}</TableCell>
							<TableCell>{formatDate(user.createdAt, "yyyy-MM-dd")}</TableCell>
							<TableCell>
								<DialogDrawer />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UsersTable;
