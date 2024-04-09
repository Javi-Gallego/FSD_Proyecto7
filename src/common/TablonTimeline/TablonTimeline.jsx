import "./TablonTimeline.css";
import likeIcon from "../../img/likesicon3.png";
import commentIcon from "../../img/comenticon3.png";
import { getTimeline, likeFunction } from "../../services/apiCalls";
import { useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

export const TablonTimeline = ({ tablon }) => {
  const reduxUser = useSelector(userData);
  const [usedTablon, setUsedTablon] = useState(tablon);

  const handleLikeClick = async (postId) => {
    try {
      await likeFunction(postId, reduxUser.credentials.token);
      const newTablon = await getData();
      setUsedTablon(newTablon);
    } catch (error) {}
  };

  const getData = async () => {
    try {
      if (reduxUser.credentials.token) {
        return (tablon = await getTimeline(reduxUser.credentials.token));
      }
    } catch (error) {}
  };

  return (
    <div className="tablonDesign">
      <div key="tablon" className="group">
        {usedTablon &&
          usedTablon.map((post, index) => (
            <div key={`message${index}`} className="mensajeDesign">
              <img className="postAuthorPhoto" src={post.authorId.photo}></img>
              <div className="postInfo">
                <div className="authMessage">
                  @{post.authorId.userName} <br />
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
                  <img
                    src={likeIcon}
                    onClick={() => {
                      handleLikeClick(post._id);
                    }}
                  />
                  Likes({post.likes ? post.likes.length : 0}):
                  <img src={commentIcon} />
                  Comentarios({post.comments ? post.comments.length : 0})
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
