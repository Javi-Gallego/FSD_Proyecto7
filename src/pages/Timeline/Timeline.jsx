import { useEffect, useState } from "react";
import { TablonTimeline } from "../../common/TablonTimeline/TablonTimeline";
import { getTimeline } from "../../services/apiCalls";
import "./Timeline.css";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

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
        console.log("currentTimeline", currentTimeline);
        setMsg(currentTimeline);
      }
    } catch (error) {}
  };

  return (
    <div className="timelineDesign">
      {Object.keys(msg).length !== 0 && <TablonTimeline tablon={msg} />}
    </div>
  );
};
