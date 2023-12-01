import { useEffect, useState } from "react";
import axios from "axios";

import CountryView from "./components/CountryView";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = countries
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const content =
    filteredCountries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : filteredCountries.length > 1 ? (
      <Countries countries={filteredCountries} />
    ) : filteredCountries.length === 1 ? (
      <CountryView country={filteredCountries[0]} />
    ) : null;
  return (
    <>
      <div>
        <label htmlFor="countries">Find countries</label>
        <input
          id="countries"
          type="text"
          value={filter}
          onChange={handleChange}
          disabled={!countries}
        />
      </div>
      {filter && content}
    </>
  );
};
export default App;
