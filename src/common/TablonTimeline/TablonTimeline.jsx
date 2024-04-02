import "./TablonTimeline.css";
import likeIcon from "../../img/likesicon3.png";
import commentIcon from "../../img/comenticon3.png";
import { getTimeline, likeFunction } from "../../services/apiCalls";
import { useState } from "react";

import { MyInput } from "../MyInput/MyInput";

export const TablonTimeline = ({ tablon }) => {
  const [usedTablon, setUsedTablon] = useState(tablon);
  const [commentary, setCommentary] = useState({
    comment: "",
  });

  let likeString = " ";

  const handleLikeClick = async (postId) => {
    try {
      await likeFunction(postId);
      const newTablon = await getData();
      setUsedTablon(newTablon);
    } catch (error) {}
  };

  const handleCommentClick = async (id, index) => {
    try {
      console.log(index);
      const viewComment = document.getElementById(`blockComment${index}`);
      console.log(viewComment);
      viewComment.classList.toggle("invisible");
    } catch (error) {}
  };

  const getData = async () => {
    try {
      if (sessionStorage.getItem("auth") === "true") {
        const token = sessionStorage.getItem("token");
        return (tablon = await getTimeline(token));
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
              {post.authorId.userName} <br />"{post.message}" <br />
              <div key={`likescomments${index}`} className="minorText">
                <img
                  src={likeIcon}
                  onClick={() => {
                    handleLikeClick(post._id);
                  }}
                />
                Likes({post.likes.length}):
                {post.likes &&
                  post.likes.map((like, indexlike) =>
                    likeString.concat(like.userName + " ")
                  )}
                <br />
                <br />
                <img
                  src={commentIcon}
                  onClick={() => {
                    handleCommentClick(post._id, index);
                  }}
                />
                Comentarios({post.comments.length}):
                {post.comments &&
                  post.comments.map((comment, indexcomment) => (
                    <div
                      className="comentary"
                      key={`commentary${indexcomment}`}
                    >
                      {comment.commentatorId.userName} : {comment.commentary}{" "}
                    </div>
                  ))}
                <div
                  id={`blockComment${index}`}
                  className="addComment invisible"
                >
                  <MyInput
                    type="text"
                    name="comment"
                    placeholder="Añade un comentario al post"
                    value={commentary.comment || ""}
                    functionChange={inputHandler}
                  />
                  {/* <CustomButton 
                                    text="Enviar"
                                    functionClick={sendComment}
                                    currentClass="buttonDesign"
                                /> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
