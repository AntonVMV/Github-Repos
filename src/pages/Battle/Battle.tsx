import { PlayerEl } from "../../components/batllePage/PlayerEl";
import { useAppSelector } from "../../hooks/storeHooks";
import { PlayerInfo } from "../../components/batllePage/PlayerInfo";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./index.scss";

export const Battle: React.FC = () => {
  const playersData = useAppSelector((state) => state.players);

  return (
    <div className="battle-page">
      <h2 className="battle-page__title">Github Accounts Battle:</h2>
      <PlayerEl player="playerOne">
        <PlayerInfo
          data={playersData.playerOne.data}
          loading={playersData.playerOne.loading}
          error={playersData.playerOne.error}
        />
      </PlayerEl>

      <PlayerEl player="playerTwo">
        <PlayerInfo
          data={playersData.playerTwo.data}
          loading={playersData.playerTwo.loading}
          error={playersData.playerTwo.error}
        />
      </PlayerEl>

      {playersData.playerOne.data && playersData.playerTwo.data && (
        <Link to="Result" className="battle-page__link">
          <Button btnType="primary" text="BATTLE" />
        </Link>
      )}
    </div>
  );
};
