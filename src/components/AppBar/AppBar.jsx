import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LightMoon } from "../../assets/light-moon.svg";
import { ReactComponent as DarkMoon } from "../../assets/dark-moon.svg";

import "./app-bar.scss";

export default function AppBar() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="app-bar-container">
      <Link to="/" className="logo">
        <span>Where in the world?</span>
      </Link>
      <span
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          var element = document.body;
          element.classList.toggle("dark-mode");
          setClicked(!clicked);
        }}
      >
        <div style={{ display: "inline-block", marginRight: "6px" }}>
          {clicked ? (
            <DarkMoon
              width="12px"
              height="12px"
              fill="#fff"
              style={{ marginTop: "16px" }}
            />
          ) : (
            <LightMoon width="12px" height="12px" />
          )}
        </div>
        <span>Dark Mode</span>
      </span>
    </div>
  );
}
