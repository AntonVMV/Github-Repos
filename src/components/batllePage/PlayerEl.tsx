import React, { HTMLAttributes, useState } from "react";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../hooks/storeHooks";
import { playerFetch, clearPlayer } from "../../store/slices/playerSlice";

interface PlayerElProps extends HTMLAttributes<HTMLDivElement> {
  player: "playerOne" | "playerTwo";
  children?: React.ReactNode;
}

export const PlayerEl: React.FC<PlayerElProps> = ({ player, children }) => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(playerFetch({ name: input, player }));
    setInput("");
  };

  const resetHandler = () => {
    dispatch(clearPlayer(player));
    setInput("");
  };

  // Converts camelCase string to a normal string
  const convertString = (string: string) => {
    const str = string.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    return str[0].toUpperCase() + str.substring(1);
  };

  return (
    <div className="player">
      <h3>{convertString(player)}:</h3>
      {children}
      <form
        onSubmit={submitHandler}
        onReset={resetHandler}
        className="player__form"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="player__input"
          placeholder="Enter Github Username"
        />
        <Button text="Find" type="submit" btnType="primary" />
        <Button text="Clear" type="reset" btnType="secondary" />
      </form>
    </div>
  );
};
