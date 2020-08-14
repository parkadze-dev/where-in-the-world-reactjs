import React, { useEffect, useState } from "react";
import CountryContainer from "../CountryContainer/CountryContainer";
import axios from "axios";
import "./countries.scss";

export default function Countries(props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { searchText, filterOption } = props;

  useEffect(() => {
    const getCountries = () => {
      if (searchText === "") {
        setLoading(true);
        const fetchedCountries = axios
          .get("https://restcountries.eu/rest/v2/all")
          .then((res) => {
            setCountries(res.data);
            setError("");
            setLoading(false);
          })
          .catch((err) => {
            setError("Error code 404: No countries have been found");
            setLoading(false);
          });
      } else {
        setLoading(true);
        const fetchedCountries = axios
          .get(`https://restcountries.eu/rest/v2/name/${searchText}`)
          .then((res) => {
            const countries = res.data;
            const textLength = searchText.length;
            const filteredCountries = countries.filter(
              (country) =>
                country.name.toLowerCase().substr(0, textLength) ===
                searchText.toLowerCase()
            );
            setCountries(filteredCountries);
            setError("");
            setLoading(false);
          })
          .catch((err) => {
            setError("Error code 404: No countries have been found");
            setLoading(false);
          });
      }
    };
    getCountries();
  }, [searchText]);

  return (
    <React.Fragment>
      {error === "" ? (
        <div className="countries-container">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : (
            <React.Fragment>
              {countries.map((item, index) => {
                if (filterOption !== "") {
                  if (
                    item.region.toLowerCase() === filterOption.toLowerCase()
                  ) {
                    return <CountryContainer item={item} key={index} />;
                  } else return null;
                } else return <CountryContainer item={item} key={index} />;
              })}
            </React.Fragment>
          )}
        </div>
      ) : (
        <div className="error-text">{error}</div>
      )}
    </React.Fragment>
  );
}
