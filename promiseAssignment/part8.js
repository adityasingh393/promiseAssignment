function fetchAnyWithErrors(urls) {
    const fetchPromises = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error Fetching ${url}: ${response.statusText}`);
                }
                return response.json();
            })
    );
    return new Promise((resolve, reject) => {
        Promise.allSettled(fetchPromises)
            .then(results => {
                const successfulResult = results.find(result => result.status === 'fulfilled');
                if (successfulResult) {
                    resolve(successfulResult.value);
                } else {
                    const errorMessages = results
                        .filter(result => result.status === 'rejected')
                        .map(result => result.reason.message)
                        .join('; ');
                    reject(new Error(`All requests failed: ${errorMessages}`));
                }
            });
    });
}

const urls = [
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/"
];

fetchAnyWithErrors(urls)
    .then(result => console.log('First successful response:', result))
    .catch(error => console.error('Error:', error.message));
