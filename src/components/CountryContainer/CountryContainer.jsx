import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./country-container.scss";

export default function CountryContainer(props) {
  const { item } = props;

  return (
    <div className="country-container">
      <Link
        to={`/country/${item.name}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="country-flag">
          <img src={item.flag} alt="Display of the country's flag" />
        </div>
        <div className="country-desc">
          <div className="country-name">{item.name}</div>
          <div className="country-info">
            <span>Population:</span>{" "}
            <NumberFormat
              value={item.population}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
          <div className="country-info">
            <span>Region:</span> {item.region}
          </div>
          <div className="country-info">
            <span>Capital:</span> {item.capital}
          </div>
        </div>
      </Link>
    </div>
  );
}
