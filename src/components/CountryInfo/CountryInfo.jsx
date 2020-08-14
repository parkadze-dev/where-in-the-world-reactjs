import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./country-info.scss";
import axios from "axios";

export default function CountryInfo(props) {
  const [info, setInfo] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    const getCountryInfo = () => {
      setLoading(true);
      const info = axios
        .get(`https://restcountries.eu/rest/v2/name/${id}`)
        .then((res) => {
          setLoading(false);
          setInfo(res.data[0]);
          const borderCodes = res.data[0].borders;
          const borderCodesLength = res.data[0].borders.length;
          let bordersString = "";
          borderCodes.forEach((code, index) => {
            if (borderCodesLength !== index) {
              bordersString += code + ";";
            }
          });
          const getBorderCountries = axios
            .get(
              `https://restcountries.eu/rest/v2/alpha?codes=${bordersString}`
            )
            .then((res) => setBorderCountries(res.data))
            .catch((err) => console.log(err));
          console.log(res.data);
          console.log(borderCodes);
          console.log("this is the border string:" + bordersString);

          console.log(res.data[0]);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    getCountryInfo();
  }, []);

  const getCurrencies = () => {
    if (info.currencies) {
      return (
        <React.Fragment>
          {info.currencies.map((item, index) => {
            return <span key={index}>{item.name}</span>;
          })}
        </React.Fragment>
      );
    } else return null;
  };

  const getLanguages = () => {
    if (info.languages) {
      return (
        <React.Fragment>
          {info.languages.map((item, index) => {
            return <span key={index}>{item.name}, </span>;
          })}
        </React.Fragment>
      );
    } else return null;
  };

  return (
    <React.Fragment>
      {loading ? (
        <span className="loading-text">Loading...</span>
      ) : (
        <div className="country-info-container">
          <button className="back-btn" onClick={() => history.goBack()}>
            {" "}
            ← Back
          </button>
          <div className="country-details">
            {/* first block */}
            <div className="country-flag">
              <img src={info.flag} alt="Display of the country's flag" />
            </div>
            {/* second block */}
            <div className="country-info">
              <div className="country-name">{info.name}</div>
              <div className="country-description-container">
                <div className="country-description">
                  <span>
                    <span>Native Name: </span> {info.nativeName}
                  </span>
                  <span>
                    <span>Population: </span>
                    <NumberFormat
                      value={info.population}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </span>
                  <span>
                    <span>Region: </span>
                    {info.region}
                  </span>
                  <span>
                    <span>Sub Region: </span>
                    {info.subregion}
                  </span>
                  <span>
                    <span>Capital: </span>
                    {info.capital}
                  </span>
                </div>
                <div className="country-description">
                  <span>
                    <span>Top Level Domain: </span> {info.topLevelDomain}
                  </span>
                  <span>
                    <span>Currencies: </span>
                    {getCurrencies()}
                  </span>
                  <span>
                    <span>Languages: </span>
                    {getLanguages()}
                  </span>
                </div>
              </div>

              <div className="country-border-countries">
                <span>Border Countries:</span>
                {borderCountries.map((item, index) => {
                  if (index < 3) {
                    return (
                      <button
                        className="border-country-tag"
                        key={index}
                        style={{ marginRight: index === 2 ? "0" : "12px" }}
                      >
                        {item.name}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
