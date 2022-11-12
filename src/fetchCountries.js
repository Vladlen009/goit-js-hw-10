
const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchArticles(name) {
return fetch(`${BASE_URL}/${name}?fields=name,official,capital,population,languages,flags`)
.then(response => {
if (!response.ok) {
    throw new Error(response.statusText);
}
    return response.json();
   });
}

