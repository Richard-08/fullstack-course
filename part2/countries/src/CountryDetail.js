import React from "react";

export default function CountryDetail({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <dl>
        <dt>Captial</dt>
        <dd>{country.capital.join(",")}</dd>

        <dt>Area</dt>
        <dd>{country.area}</dd>
      </dl>

      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
      />
    </div>
  );
}
