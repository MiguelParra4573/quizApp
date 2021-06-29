import { useState } from "react"

const useFetch = () => {
    const [countries, setCountry] = useState(null)
    try {
        const fetchCountries = async () => {
            const response = await fetch(`https://restcountries.eu/rest/v2/all`);
            const data = await response.json();
            setCountry(data)
          }
          fetchCountries()
    } catch (error) {
        throw new Error()
    }
    return { countries }
}

export default useFetch