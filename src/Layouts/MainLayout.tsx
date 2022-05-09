import { NavList } from "../components/elements/navigation/NavList/NavList";
import { Outlet } from "react-router-dom";

const links = ["Repos", "Battle"];

export const MainLayout: React.FC = () => {
  return (
    <div>
      <NavList links={links} className="main__nav" />
      <Outlet />
    </div>
  );
};
