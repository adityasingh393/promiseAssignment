const fetchWithExponentialBackoff = async (url, maxRetries) => {
    const getDelay = (attempt) => Math.pow(2, attempt) * 1000;
    const fetchWithRetry = async (attempt) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching ${url}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            if (attempt < maxRetries) {
                const delay = getDelay(attempt);
                console.log(`Retrying in ${delay / 1000} seconds... (Attempt ${attempt + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithRetry(attempt + 1);
            } else {
                throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts: ${error.message}`);
            }
        }
    };
    return fetchWithRetry(0);
};
const url = "https://api.example.com/data";
const maxRetries = 5;

fetchWithExponentialBackoff(url, maxRetries)
    .then(data => console.log('Data fetched:', data))
    .catch(error => console.error('Fetch failed:', error));
