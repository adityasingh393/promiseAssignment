async function batchFetch(urls, batchSize) {
    const fetchBatch = async (batch) => {
        const promises = batch.map(url =>
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching ${url}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(error);
                    return null;
                })
        );
        return Promise.all(promises);
    };
    const splitIntoBatches = (urls, batchSize) => {
        const batches = [];
        for (let i = 0; i < urls.length; i += batchSize) {
            batches.push(urls.slice(i, i + batchSize));
        }
        return batches;
    };

    try {
        const batches = splitIntoBatches(urls, batchSize);
        let results = [];
        for (const batch of batches) {
            const batchResults = await fetchBatch(batch);
            results = results.concat(batchResults);
        }

        return results;
    } catch (error) {
        throw new Error(`Error in batch fetching: ${error.message}`);
    }
}
const urls = [
    "google.com",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
];
const batchSize = 2;

batchFetch(urls, batchSize)
    .then(results => console.log('All results:', results))
    .catch(error => console.error('Failed:', error));
