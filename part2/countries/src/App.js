import { useState, useEffect, useCallback } from "react";
import SearchForm from "./SearchForm";
import CountriesList from "./CountriesList";
import CountryDetail from "./CountryDetail";
import countriesService from "./services/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const filtered_countries = useCallback(() => {
    const search_value = search.trim().toLowerCase();
    if (search_value) {
      return countries.filter((country) => {
        return country.name.common.toLowerCase().includes(search_value);
      });
    }

    return countries;
  }, [search, countries]);

  useEffect(() => {
    const data = filtered_countries();
    if (data.length === 1) {
      setCountry(data[0]);
    } else {
      setCountry(null);
    }
  }, [filtered_countries]);

  function handleInput(e) {
    setSearch(e.target.value);
  }

  function handleShow(country) {
    setCountry(country);
  }

  return (
    <div>
      <SearchForm
        search={search}
        onInput={handleInput}
      />
      {filtered_countries().length !== 1 && (
        <CountriesList
          data={filtered_countries()}
          handleShow={handleShow}
        />
      )}
      {country && <CountryDetail country={country} />}
    </div>
  );
};

export default App;
