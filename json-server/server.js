const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("json-server/db.json");
const middlewares = jsonServer.defaults();
const url = require("url");
const querystring = require("querystring");

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware a Laravel-szerű paginációs paraméterek átalakításához
// és a többszörös paraméterek kezeléséhez
server.use((req, res, next) => {
	const parsedUrl = url.parse(req.originalUrl || req.url);
	let queryParams = querystring.parse(parsedUrl.query);
	let modified = false;

	// Repeated parameters handling (like framework=2&framework=3)
	Object.keys(queryParams).forEach((key) => {
		// Check if the parameter is an array (repeated parameters)
		if (Array.isArray(queryParams[key])) {
			// Convert array to comma-separated string for json-server filtering
			queryParams[key] = queryParams[key].join(",");
			modified = true;
		}
	});

	// Handle limit parameter without underscore (limit -> _limit)
	if (queryParams.limit) {
		queryParams._limit = queryParams.limit;
		modified = true;
	}

	// _limit={5} paraméter kezelése
	if (queryParams._limit && typeof queryParams._limit === "string") {
		const match = queryParams._limit.match(/^\{(\d+)\}$/);
		if (match) {
			queryParams._limit = match[1];
			modified = true;
		}
	}

	// Ha van page paraméter, akkor azt állítsuk be _page-ként is
	if (queryParams.page) {
		queryParams._page = queryParams.page;
		modified = true;
	}

	// Ha módosítottuk a paramétereket, frissítsük a kérés URL-jét
	if (modified) {
		const newQueryString = querystring.stringify(queryParams);
		req.url = `${parsedUrl.pathname}?${newQueryString}`;
		req.query = queryParams; // Frissítsük a req.query objektumot is
	}

	next();
});

// Helper függvény a paginációs linkek generálásához
function generatePaginationLinks(req, currentPage, lastPage) {
	const parsedUrl = url.parse(req.originalUrl || req.url);
	const baseUrl = `${req.protocol}://${req.get("host") || "localhost:3001"}${parsedUrl.pathname}`;
	const queryParams = querystring.parse(parsedUrl.query);
	const links = [];

	// Previous link
	if (currentPage > 1) {
		const prevParams = { ...queryParams, page: currentPage - 1 };
		links.push({
			url: `${baseUrl}?${querystring.stringify(prevParams)}`,
			label: "&laquo; Previous",
			active: false,
		});
	} else {
		links.push({ url: null, label: "&laquo; Previous", active: false });
	}

	// Page linkek
	for (let i = 1; i <= lastPage; i++) {
		const pageParams = { ...queryParams, page: i };
		links.push({
			url: `${baseUrl}?${querystring.stringify(pageParams)}`,
			label: String(i),
			active: i === currentPage,
		});
	}

	// Next link
	if (currentPage < lastPage) {
		const nextParams = { ...queryParams, page: currentPage + 1 };
		links.push({
			url: `${baseUrl}?${querystring.stringify(nextParams)}`,
			label: "Next &raquo;",
			active: false,
		});
	} else {
		links.push({ url: null, label: "Next &raquo;", active: false });
	}

	return links;
}

// Egyéni middleware a válaszok formázásához és Laravel-szerű paginációhoz
server.use((req, res, next) => {
	// Eredeti res.send metódus mentése
	const originalSend = res.send;

	res.send = async function (data) {
		await new Promise((resolve) => setTimeout(resolve, 60));

		let parsedData;
		try {
			parsedData = JSON.parse(data);
		} catch (error) {
			parsedData = data;
		}

		// Ha a parsedData üres objektum, cseréljük üres tömbre
		if (
			parsedData &&
			typeof parsedData === "object" &&
			!Array.isArray(parsedData) &&
			Object.keys(parsedData).length === 0
		) {
			parsedData = [];
		}

		// Alap válasz struktúra
		const responseData = {
			success: true,
			message: "Operation successful",
			data: parsedData,
		};

		// Ha van X-Total-Count header (pagináció esetén), hozzáadjuk a meta objektumhoz
		const totalCount = res.getHeader("X-Total-Count");
		if (totalCount) {
			const parsedUrl = url.parse(req.originalUrl || req.url);
			const queryParams = querystring.parse(parsedUrl.query);

			// Paginációs paraméterek kinyerése - használjuk a page változót, nem a _page-et
			const page = parseInt(queryParams.page || 1);
			const perPage = parseInt(queryParams.limit || 10);
			const total = parseInt(totalCount);
			const lastPage = Math.ceil(total / perPage);
			const from = (page - 1) * perPage + 1;
			const to = Math.min(page * perPage, total);

			// URL-ek generálása
			const baseUrl = `${req.protocol}://${req.get("host") || "localhost:3001"}${
				parsedUrl.pathname
			}`;
			const firstPageParams = { ...queryParams, page: 1 };
			const lastPageParams = { ...queryParams, page: lastPage };
			const nextPageParams = page < lastPage ? { ...queryParams, page: page + 1 } : null;
			const prevPageParams = page > 1 ? { ...queryParams, page: page - 1 } : null;

			// Laravel-szerű paginációs metaadatok létrehozása
			responseData.meta = {
				current_page: page,
				from: from <= total ? from : null,
				last_page: lastPage,
				links: generatePaginationLinks(req, page, lastPage),
				path: baseUrl,
				per_page: perPage,
				to: to,
				total: total,
				first_page_url: `${baseUrl}?${querystring.stringify(firstPageParams)}`,
				last_page_url: `${baseUrl}?${querystring.stringify(lastPageParams)}`,
				next_page_url: nextPageParams
					? `${baseUrl}?${querystring.stringify(nextPageParams)}`
					: null,
				prev_page_url: prevPageParams
					? `${baseUrl}?${querystring.stringify(prevPageParams)}`
					: null,
			};
		}

		res.status(200);
		originalSend.call(res, JSON.stringify(responseData));
	};

	next();
});

server.use(router);

server.listen(3001, () => {
	console.log("JSON Server is running on port 3001");
});
