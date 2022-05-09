import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";
import { reposFetch } from "../../store/slices/reposSlice";
import React, { useEffect, useState } from "react";
import { InfoEl } from "../elements/infoEl/InfoEl";
import { ReposItem } from "./ReposItem";
import { MainPortal } from "../../MainPortal/MainPortal";
import { ReposModal } from "../elements/modal/ReposModal";
import "./index.scss";

export const ReposCards: React.FC = () => {
  const [isModal, setModal] = useState<number | null>(null);
  const { id } = useParams();

  const { data, error, loading } = useAppSelector((store) => store.repos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(reposFetch(id));
    }
  }, [id]);

  const getItem = () => {
    const element = data?.items.find((item) => item.id === isModal);
    return element;
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <InfoEl text="Loading..." />;
  }

  return (
    <div className="repos__wrap">
      {isModal && (
        <MainPortal>
          <ReposModal onClick={() => setModal(null)} item={getItem()} />
        </MainPortal>
      )}

      {data &&
        data.items.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <ReposItem
                name={item.name}
                login={item.owner.login}
                image={item.owner.avatar_url}
                stars={item.stargazers_count}
                onClick={() => setModal(item.id)}
                className="clickable"
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};
