import { HTMLAttributes } from "react";
import cn from "classnames";

interface IReposItem extends HTMLAttributes<HTMLDivElement> {
  name: string;
  login: string;
  image: string;
  stars: number;
  onClick?: () => void;
}

export const ReposItem: React.FC<IReposItem> = ({
  name,
  login,
  image,
  stars,
  onClick,
  className,
}) => {
  return (
    <ul className={cn("repos__list", className)} onClick={onClick}>
      <li className="repos__name">{name}</li>
      <li className="repos__login">{login}</li>
      <li className="repos__image">
        <img src={image} className="repos__avatar" alt="user_avatar" />
      </li>
      <li className="repos__starcount">{stars}</li>
    </ul>
  );
};
