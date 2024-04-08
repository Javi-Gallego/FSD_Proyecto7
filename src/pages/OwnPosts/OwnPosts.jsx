import { useEffect, useState } from "react";
import { TablonTimeline } from "../../common/TablonTimeline/TablonTimeline";
import { getOwnPosts } from "../../services/apiCalls";
import "./OwnPosts.css";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { SendMessageButton } from "../../common/SendMessageButton/SendMessageButton";

export const OwnPosts = () => {
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
        const ownPosts = await getOwnPosts(token);

        setMsg(ownPosts);
      }
    } catch (error) {}
  };

  return (
    <div className="ownPostsDesign">
      {Object.keys(msg).length !== 0 && <TablonTimeline tablon={msg} />}
      <SendMessageButton />
    </div>
  );
};