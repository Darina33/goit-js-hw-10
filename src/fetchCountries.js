const ENDPOINT = "https://restcountries.com/v3.1/name/"
const fields = 'fields=name,capital,population,flags,languages'


function getCountries(name) {
    return fetch(`${ENDPOINT}${name}?${fields}`)
        .then((data) => data.json())
}

export { getCountries };