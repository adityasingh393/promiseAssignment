async function conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2) {
    try {
        const initialResponse = await fetch(initialUrl);
        if (!initialResponse.ok) {
            throw new Error(`Initial fetch failed with status: ${initialResponse.status}`);
        }
        const initialData = await initialResponse.json();
        let secondaryUrl;
        if (initialData) {
            secondaryUrl = secondaryUrl1;
        } else {
            secondaryUrl = secondaryUrl2;
        }
        const secondaryResponse = await fetch(secondaryUrl);
        if (!secondaryResponse.ok) {
            throw new Error(`Secondary fetch failed with status: ${secondaryResponse.status}`);
        }
        const secondaryData = await secondaryResponse.json();
        return { initialData, secondaryData };
    } catch (error) {
        console.error(`Error during fetch: ${error.message}`);
    }
}

const initialUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
const secondaryUrl1 = "https://catfact.ninja/fact";
const secondaryUrl2 = "https://api.genderize.io/?name=luc";

conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2)
    .then(data => console.log(data))
    .catch(error => console.error(error));