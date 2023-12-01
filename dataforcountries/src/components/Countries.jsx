import { useState } from "react";
import CountryView from "./CountryView";

const Country = ({ country }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <li>
      {country.name.common}
      <button onClick={() => setIsShow(!isShow)}>
        {isShow ? "Hide" : "Show"}
      </button>
      {isShow && <CountryView country={country} />}
    </li>
  );
};

const Countries = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </ul>
  );
};
export default Countries;
