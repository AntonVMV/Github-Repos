import { HTMLAttributes } from "react";
import "./index.scss";

interface InfoProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const InfoEl: React.FC<InfoProps> = ({ text, ...rest }) => {
  return (
    <div className="info-el" {...rest}>
      {text}
    </div>
  );
};
