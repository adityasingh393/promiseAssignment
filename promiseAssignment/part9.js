async function fetchSequentially(urls) {
    const results = [];

    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error Fetching ${url}: ${response.statusText}`);
            }
            const data = await response.json();
            results.push(data);
        } catch (error) {
            results.push(error);
        }
    }

    return results;
}

const urls = [
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/"
];

fetchSequentially(urls)
    .then(results => console.log('Results:', results))
    .catch(error => console.error('Error:', error));
