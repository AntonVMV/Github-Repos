import { HTMLAttributes } from "react";
import { IPlayerData } from "../../store/slices/playerSlice";
import "./index.scss";
import { InfoEl } from "../elements/infoEl/InfoEl";
import { PlayerCard } from "./PlayerCard";

interface PlayerInfoProps extends HTMLAttributes<HTMLDivElement> {
  data: IPlayerData | null;
  loading?: boolean;
  error?: null | string;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  data,
  error,
  loading,
}) => {
  if (loading) {
    return <InfoEl text="Loading..." />;
  }

  if (error) {
    return <InfoEl text="User not found" />;
  }

  return (
    <>
      {data ? (
        <PlayerCard data={data} fullInfo={false} />
      ) : (
        <InfoEl text="No player has been chosen" />
      )}
    </>
  );
};
