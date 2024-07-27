function fetchWithRetry(url, retries) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (retryCount) => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => resolve(data))
                .catch((error) => {
                    if (retryCount === 0) {
                        reject(new Error(`Failed to fetch data after ${retries} retries: ${error.message}`));
                    } else {
                        console.log(`Retrying... (${retries - retryCount + 1}/${retries})`);
                        attemptFetch(retryCount - 1);
                    }
                });
        };

        attemptFetch(retries);
    });
}

fetchWithRetry('https://google.com', 3)
    .then((data) => console.log('Fetched data:', data))
    .catch((error) => console.error('Error fetching data:', error));