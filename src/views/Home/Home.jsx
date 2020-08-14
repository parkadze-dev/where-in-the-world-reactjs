import React, { useState } from "react";
import Filter from "../../components/Filter/Filter";
import SearchBar from "../../components/SearchBar/SearchBar";
import Countries from "../../components/Countries/Countries";
import "./home.scss";

export default function Home() {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleFilter = (e) => {
    const filterOption = e.target.value;
    setFilter(filterOption);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  };

  return (
    <div className="home-view-container">
      <SearchBar handleSearch={handleSearch} />
      <Filter handleFilter={handleFilter} filterOption={filter} />
      <Countries searchText={search} filterOption={filter} />
    </div>
  );
}
