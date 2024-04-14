import { useEffect, useState } from "react";
import { TablonTimeline } from "../../common/TablonTimeline/TablonTimeline";
import { getTimeline, getTopRated } from "../../services/apiCalls";
import "./Timeline.css";
import spinner from "../../img/rocket.gif";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { SendMessageButton } from "../../common/SendMessageButton/SendMessageButton";

export const Timeline = () => {
  const reduxUser = useSelector(userData);
  const [token, setToken] = useState(reduxUser.credentials.token);
  const [focus, setFocus] = useState("timeline");
  const [msg, setMsg] = useState({});

  useEffect(() => {
    if (Object.keys(msg).length === 0) {
      getData();
    }
  }, [msg]);

  useEffect(() => {
      getData();
  }, [focus]);

  const getData = async () => {
    try {
      if (reduxUser.credentials.token) {

        if (focus === "timeline") {
          const currentTimeline = await getTimeline(token);
          setMsg(currentTimeline);
        }
        if(focus === "toprated"){
          const toprated = await getTopRated(token);
          setMsg(toprated);
        }
      }
    } catch (error) {}
  };

  const changeFocus = (newFocus) => {
    console.log(newFocus);
    setFocus(newFocus);
  };
console.log(msg);
  return (
    <>
      {Object.keys(msg).length !== 0 ? (
        <div className="timelineDesign">
          <div className="tablonTitle">
            <div onClick={() => changeFocus("timeline")} className="focus">Mi Timeline</div>
            <div onClick={() => changeFocus("toprated")} className="focus">+ Valorados</div>
            <div onClick={() => changeFocus("trending")} className="focus">+ Trendy</div>
          </div>
          <TablonTimeline tablon={msg} focus={focus} />
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
