import "./index.scss";
import { IPlayerData } from "../../store/slices/playerSlice";

interface PlayerCardProps {
  data: IPlayerData;
  fullInfo: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ data, fullInfo }) => {
  return (
    <>
      {data && (
        <ul className="player-card">
          <li>
            <img
              src={data.avatar_url}
              className="player-card__image"
              alt="user-avatar"
            />
          </li>
          <li>
            Login: <p className="player-card__text">{data.login}</p>
          </li>

          <li>
            Public Repos:{" "}
            <p className="player-card__text">{data.public_repos}</p>
          </li>
          <li>
            Followers: <p className="player-card__text">{data.followers}</p>
          </li>
          {fullInfo && (
            <>
              <li>
                Following: <p className="player-card__text">{data.following}</p>
              </li>
              <li>
                Name: <p className="player-card__text">{data.name}</p>
              </li>
              <li>
                Location: <p className="player-card__text">{data.location}</p>
              </li>
              <li>
                <a href={data.html_url} target="_blank" rel="noreferrer">
                  Github Page
                </a>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
};
