import "./OwnTablon.css";
import likeIcon from "../../assets/heart.svg";
import commentIcon from "../../assets/message.svg";
import trashIcon from "../../assets/trash.svg";
import { deletePost } from "../../services/apiCalls";
import { useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

export const OwnTablon = ({ tablon }) => {
  const reduxUser = useSelector(userData);
  const [usedTablon, setUsedTablon] = useState(tablon);

  const handleDeleteClick = async (postId) => {
    try {
      await deletePost(postId, reduxUser.credentials.token);
      const updatedPosts = usedTablon.filter( post => post._id !== postId);
      setUsedTablon(updatedPosts);
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
                  {post.photoUrl && post.photoUrl !== "" && (
                    <img
                      className="postImage"
                      src={post.photoUrl}
                      alt="Imagen post"
                    ></img>
                  )}
                  "{post.message}" <br />
                </div>
                <div className="minorText">
                  <img src={likeIcon} />
                  Likes({post.likes ? post.likes.length : 0}):
                  <img src={commentIcon} />
                  Comentarios({post.comments ? post.comments.length : 0})
                  <img
                    src={trashIcon}
                    onClick={() => {
                      handleDeleteClick(post._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
