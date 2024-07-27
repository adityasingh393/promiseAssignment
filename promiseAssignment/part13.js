const fetchWithFallback = async (urls) => {
    const fetchPromises = urls.map(url => 
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching ${url}: ${response.statusText}`);
          }
          return response.json();
        })
        .catch(error => ({
          error: error.message
        }))
    );
  
    try {
      const results = await Promise.all(fetchPromises);
      const successfulResults = results.filter(result => !result.error);
      const errors = results.filter(result => result.error);
      if (successfulResults.length > 0) {
        return successfulResults;
      }
      throw new Error('All fetch attempts failed: ' + errors.map(e => e.error).join(', '));
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const urls = [
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    "https://api.catfact.ninja/fact",
    "https://api.genderize.io/?name=luc",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
  ];
  
  fetchWithFallback(urls)
    .then(results => console.log('Fetched results:', results))
    .catch(error => console.error('Failed:', error.message));
  