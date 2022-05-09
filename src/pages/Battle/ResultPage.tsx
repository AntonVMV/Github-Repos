import { useAppSelector } from "../../hooks/storeHooks";
import { useEffect, useState } from "react";
import { IPlayerData } from "../../store/slices/playerSlice";
import { PlayerCard } from "../../components/batllePage/PlayerCard";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const ResultPage: React.FC = () => {
  const { playerOne, playerTwo } = useAppSelector((state) => state.players);
  const [winner, setWinner] = useState<IPlayerData | IPlayerData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (playerOne.data && playerTwo.data) {
      battleResult();
    }
  }, []);

  const calculateScore = (player: IPlayerData) => {
    const stars = playerOne.repos.reduce(
      (stars, repo) => repo.stargazers_count + stars,
      0
    );

    return player.followers * 3 + stars;
  };

  const battleResult = () => {
    if (playerOne.data && playerTwo.data) {
      if (calculateScore(playerOne.data) > calculateScore(playerTwo.data)) {
        setWinner(playerOne.data);
      } else if (
        calculateScore(playerOne.data) < calculateScore(playerTwo.data)
      ) {
        setWinner(playerTwo.data);
      } else {
        setWinner([playerOne.data, playerTwo.data]);
      }
    }
  };

  return (
    <div className="results-page">
      {!Array.isArray(winner) ? (
        <>
          <h3 className="results-page-title">Winner</h3>
          <PlayerCard data={winner} fullInfo={true} />
        </>
      ) : (
        <>
          <h3 className="results-page-title">Draw</h3>
          <div className="results-page__draw">
            <PlayerCard data={winner[0]} fullInfo={true} />
            <PlayerCard data={winner[1]} fullInfo={true} />
          </div>
        </>
      )}
      <Button
        className="result__button"
        text="Go Back"
        type="button"
        btnType="primary"
        onClick={() => navigate(-1)}
      />
    </div>
  );
};
