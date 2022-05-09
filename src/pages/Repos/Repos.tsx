import { NavList } from "../../components/elements/navigation/NavList/NavList";
import { Outlet } from "react-router-dom";
import "./index.scss";

const links = ["All", "Javascript", "Typescript", "Ruby", "C++"];

export const Repos: React.FC = () => {
  return (
    <div className="repos">
      <h3 className="repos__title">Popular Repositories</h3>
      <NavList links={links} className="repos-nav" />
      <Outlet />
    </div>
  );
};
