import React from "react";
import { NavLink, Route } from "react-router-dom";
import '../Components/NavBar.css';
import Home from '../Pages/Home';
import Lunch from '../Pages/Lunch';
import Dinner from '../Pages/Dinner';

const NavBar = () => {
  return (
    <div className="radio-inputs">
      <label className="radio">
        <NavLink
          to="/"
          ClassName="selected"
          className="name text-warning"
          style={{ textShadow: '0px 0px 6px #fd7014' }}
        >
          BreakFast
        </NavLink>
      </label>
      <label className="radio">
        <NavLink
          to="/lunch"
          ClassName="selected"
          className="name text-warning"
          style={{ textShadow: '0px 0px 6px #fd7014' }}
        >
          Lunch
        </NavLink>
      </label>
      <label className="radio">
        <NavLink
          to="/dinner"
          ClassName="selected"
          className="name text-warning"
          style={{ textShadow: '0px 0px 6px #fd7014' }}
        >
          Dinner
        </NavLink>
      </label>
    </div>
  );
};

export default NavBar;
