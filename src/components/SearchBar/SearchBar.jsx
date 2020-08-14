import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import "./search-bar.scss";

export default function SearchBar(props) {
  return (
    <div className="search-bar-container">
      <SearchIcon fill="hsl(0, 0%, 52%)" />
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => {
          props.handleSearch(e);
        }}
      />
    </div>
  );
}
