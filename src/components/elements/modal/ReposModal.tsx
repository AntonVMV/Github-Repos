import React from "react";
import "./index.scss";

interface IRepoItem {
  name: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    repos_url: string;
  };
}

interface IReposModal {
  onClick?: () => void;
  item: IRepoItem;
}

export const ReposModal: React.FC<IReposModal> = ({ onClick, item }) => {
  const clickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="repos-modal-container" onClick={onClick}>
      <ul className="repos-modal" onClick={clickHandler}>
        <div onClick={onClick} className="repos-modal__close">
          close
        </div>
        <img
          src={item.owner.avatar_url}
          className="repos-modal__img"
          alt="avatar"
        />
        <li className="repos-modal__title">{item.name}</li>
        <li className="repos-modal__subtitle">{item.owner.login}</li>
        <li className="test"></li>
        <li>
          <a
            className="repos-modal__url"
            href={item.html_url}
            target="_blank"
            rel="noreferrer"
          >
            Repository page
          </a>
        </li>
        <li>
          <a
            className="repos-modal__url"
            href={item.owner.repos_url}
            target="_blank"
            rel="noreferrer"
          >
            User page
          </a>
        </li>
      </ul>
    </div>
  );
};
