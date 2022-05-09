import { HTMLAttributes } from "react";
import { NavListEl } from "../NavListEl/NavListEl";
import cn from "classnames";
import "./index.scss";

interface NavigationProps extends HTMLAttributes<HTMLUListElement> {
  links: string[];
}

export const NavList: React.FC<NavigationProps> = ({
  links,
  className,
  ...rest
}) => {
  return (
    <ul {...rest} className={cn("nav", className)}>
      {links.map((item, index) => {
        return <NavListEl key={index} link={item} className="nav-el" />;
      })}
    </ul>
  );
};
