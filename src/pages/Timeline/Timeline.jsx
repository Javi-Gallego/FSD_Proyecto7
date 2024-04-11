import { useEffect, useState } from "react";
import { TablonTimeline } from "../../common/TablonTimeline/TablonTimeline";
import { getTimeline } from "../../services/apiCalls";
import "./Timeline.css";
import spinner from "../../img/rocket.gif";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { SendMessageButton } from "../../common/SendMessageButton/SendMessageButton";

export const Timeline = () => {
  const reduxUser = useSelector(userData);
  const [msg, setMsg] = useState({});

  useEffect(() => {
    if (Object.keys(msg).length === 0) {
      getData();
    }
  }, [msg]);

  const getData = async () => {
    try {
      if (reduxUser.credentials.token) {
        const token = reduxUser.credentials.token;
        const currentTimeline = await getTimeline(token);

        setMsg(currentTimeline);
      }
    } catch (error) {}
  };

  return (
    <>
      {Object.keys(msg).length !== 0 ? (
        <div className="timelineDesign">
          <TablonTimeline tablon={msg} />
          <SendMessageButton />
        </div>
      ) : (
        <div className="ownPostsDesign">
          <img src={spinner}></img>
        </div>
      )}
    </>
  );
};
