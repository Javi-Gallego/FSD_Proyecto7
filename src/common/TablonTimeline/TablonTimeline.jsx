import "./TablonTimeline.css";
import { getTimeline, likeFunction } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { writeId } from "../../app/slices/userDetailSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MessageIcon } from "../MessageIcon/MessageIcon";
import { LikeIcon } from "../LikeIcon/LikeIcon";

export const TablonTimeline = ({ tablon, focus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector(userData);
  const [usedTablon, setUsedTablon] = useState(tablon);

  useEffect(() => {
    setUsedTablon(tablon);
  }, [tablon]);

  const handleLikeClick = async (postId) => {
    try {
      await likeFunction(postId, reduxUser.credentials.token);
      const newTablon = await getData();
      setUsedTablon(newTablon);
    } catch (error) {}
  };
  
  const handleComment = (postId) => {
    dispatch(writeId(postId));
    navigate("/sendcomment");
  };

  const getData = async () => {
    try {
      if (reduxUser.credentials.token) {
        return (tablon = await getTimeline(reduxUser.credentials.token));
      }
    } catch (error) {}
  };

  const goToUserDetail = (userName) => {
    dispatch(writeId(userName));
    navigate("/detailuser");
  };

  return (
    <div className="tablonDesign">
      <div key="tablon" className="group">
        {usedTablon &&
          usedTablon.map((post, index) => (
            <div key={`message${index}`} className="mensajeDesign">
              <img className="postAuthorPhoto" src={focus === "timeline" ? post.authorId.photo : post.authorId.photo}></img>
              <div className="postInfo">
                <div className="authMessage">
                  <div onClick={() => goToUserDetail(post.authorId.userName)}> @{post.authorId.userName} </div>
                  {(post.photoUrl && post.photoUrl !== "") && (
                    <img
                      className="postImage"
                      src={post.photoUrl}
                      alt="Imagen post"
                    ></img>
                  )}
                  "{post.message}" <br />
                </div>
                <div className="minorText">
                  <div className="imageIcon" onClick={() =>  handleLikeClick(post._id)}>
                  {post.likes && post.likes.some(like => like.userName === reduxUser.credentials.user.userName)
                      ? <LikeIcon color1="red" color2="red" />
                      : <LikeIcon color1="white" color2="var(--secondary-color)" />}
                  </div>
                  Likes({post.likes ? post.likes.length : 0}):
                  <div className="imageIcon" onClick={() => handleComment(post._id)}>
                    <MessageIcon color1="white" color2="var(--secondary-color)" />
                  </div>
                  Comentarios({post.comments ? post.comments.length : 0})
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
