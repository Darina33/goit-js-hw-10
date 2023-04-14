import { Notify } from "notiflix";

const ENDPOINT = "https://restcountries.com/v3.1/name/"
const fields = 'fields=name,capital,population,flags,languages'


function getCountries(name) {
    return fetch(`${ENDPOINT}${name}?${fields}`)
        .then((data) => {
            if (!data.ok) {
                Notify.failure("Oops, there is no country with that name")
                throw new Error(fields.status)
        } return data.json()
        })
}

export { getCountries };