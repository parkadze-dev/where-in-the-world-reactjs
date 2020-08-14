import React, { useState } from "react";
import { ReactComponent as UpArrow } from "../../assets/arrow-up.svg";
import { ReactComponent as DownArrow } from "../../assets/arrow-bottom.svg";
import "./filter.scss";

export default function Filter(props) {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };

  const FilterMenu = () => {
    const options = [
      { name: "Africa" },
      { name: "America" },
      { name: "Asia" },
      { name: "Europe" },
      { name: "Oceania" },
    ];
    return (
      <div className="filter-options">
        {options.map((item) => {
          return (
            <button
              value={item.name}
              onClick={(e) => {
                props.handleFilter(e);
                setOpen(false);
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    );
  };
  return (
    <div className="filter-container">
      <button className="filter-btn" onClick={handleClick}>
        {props.filterOption ? (
          <span>{props.filterOption}</span>
        ) : (
          <span>Filter by Region</span>
        )}{" "}
        {open ? <UpArrow /> : <DownArrow />}
      </button>
      {open ? <FilterMenu /> : null}
    </div>
  );
}
