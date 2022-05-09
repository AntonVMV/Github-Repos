import React from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRootEl = document.querySelector("body")!;

interface IMainPortal {
  children?: React.ReactNode;
}

export const MainPortal: React.FC<IMainPortal> = ({ children }) => {
  const element = document.createElement("div");

  useEffect(() => {
    modalRootEl.appendChild(element);

    return () => {
      modalRootEl.removeChild(element);
    };
  }, []);

  return createPortal(children, element);
};
