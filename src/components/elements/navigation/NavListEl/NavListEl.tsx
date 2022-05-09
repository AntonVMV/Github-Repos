import React, { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import cn from "classnames";
import { useRef } from "react";

interface NavListElProps extends HTMLAttributes<HTMLLIElement> {
  link: string;
}

export const NavListEl: React.FC<NavListElProps> = ({ link, ...rest }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ref.current && ref.current.classList.contains("active")) {
      e.preventDefault();
    }
  };

  return (
    <li {...rest}>
      <NavLink
        ref={ref}
        onClick={clickHandler}
        to={link}
        className={({ isActive }) => cn("nav-link", isActive && "active")}
      >
        {link}
      </NavLink>
    </li>
  );
};
