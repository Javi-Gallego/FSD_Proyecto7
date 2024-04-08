import "./TablonTimeline.css";
import likeIcon from "../../img/likesicon3.png";
import commentIcon from "../../img/comenticon3.png";
import { getTimeline, likeFunction } from "../../services/apiCalls";
import { useState } from "react";
import { MyInput } from "../MyInput/MyInput";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

export const TablonTimeline = ({ tablon }) => {
  const reduxUser = useSelector(userData);
  const [usedTablon, setUsedTablon] = useState(tablon);
  const [commentary, setCommentary] = useState({
    comment: "",
  });

  let likeString = " ";

  const handleLikeClick = async (postId) => {
    try {
      await likeFunction(postId, reduxUser.credentials.token);
      const newTablon = await getData();
      setUsedTablon(newTablon);
    } catch (error) {}
  };

  const handleCommentClick = async (id, index) => {
    try {
      const viewComment = document.getElementById(`blockComment${index}`);
      viewComment.classList.toggle("invisible");
    } catch (error) {}
  };

  const getData = async () => {
    try {
      if (reduxUser.credentials.token) {
        return (tablon = await getTimeline(reduxUser.credentials.token));
      }
    } catch (error) {}
  };

  const inputHandler = (e) => {
    setCommentary(e.target.value);
  };

  // const sendComment = async () => {
  //     try {
  //         if(comment === ""){
  //             setMsgError("El comentario está vacío")
  //             return;
  //         }

  //         await addComment(postId, commentary)
  //     } catch (error) {

  //     }
  // }

  return (
    <div className="tablonDesign">
      <div key="tablon">
        {usedTablon &&
          usedTablon.map((post, index) => (
            <div key={`message${index}`} className="mensajeDesign">
              <img className="postAuthorPhoto" src={post.authorId.photo}></img>
              <div className="postInfo">
                <div className="authMessage">
                  @{post.authorId.userName} <br />
                  {post.photoUrl && (
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
