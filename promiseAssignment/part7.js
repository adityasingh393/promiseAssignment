function fetchWithRace(urls, timeout) {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );
    const fetchPromises = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error Fetching ${url}: ${response.statusText}`);
                }
                return response.json();
            })
    );
    return Promise.race([timeoutPromise, ...fetchPromises]);
}
const urls = [
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/",
    "https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/"
];
const timeout = 5000;
fetchWithRace(urls, timeout)
    .then(result => console.log('First successful response:', result))
    .catch(error => console.error('Error:', error));
