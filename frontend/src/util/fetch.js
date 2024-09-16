export default async function fetchFromAPI(httpMethod, path, queries = null, headers = null, body = null) {
    const backendURL = `http://localhost:3000`;
    const passedQueries = new URLSearchParams(queries);
    if (httpMethod === "GET" && body)
        throw new Error("An HTTP GET request must not have a body.");
    try {
        const response = httpMethod === "GET"
            ? await fetch(`${backendURL}${path}${passedQueries && "?" + passedQueries}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
            })
            : await fetch(`${backendURL}${path}${passedQueries && "?" + passedQueries}`, {
                method: httpMethod,
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                body: JSON.stringify(body)
            });
        return response.json();
    }
    catch (err) {
        throw err;
    }
}
