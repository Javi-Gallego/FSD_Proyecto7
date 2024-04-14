import "./OwnTablon.css";
import likeIcon from "../../assets/heart.svg";
import commentIcon from "../../assets/message.svg";
import trashIcon from "../../assets/trash.svg";
import { deletePost } from "../../services/apiCalls";
import { useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { userDetailData } from "../../app/slices/userDetailSlice";
import { writeId } from "../../app/slices/userDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "../TrashIcon/TrashIcon";
import { LikeIcon } from "../LikeIcon/LikeIcon";
import { MessageIcon } from "../MessageIcon/MessageIcon";

export const OwnTablon = ({ tablon }) => {
  const reduxUser = useSelector(userData);
  const dispatch = useDispatch();
  const reduxUserDetail = useSelector(userDetailData);
  const navigate = useNavigate();
  const [usedTablon, setUsedTablon] = useState(tablon);
  const [activeLikes, setActiveLikes] = useState(false);
  const [activeComments, setActiveComments] = useState(false);
  const [activeLikesNumber, setActiveLikesNumber] = useState("");
  const [activeCommentsNumber, setActiveCommentsNumber] = useState("");

  const handleDeleteClick = async (postId) => {
    try {
      await deletePost(postId, reduxUser.credentials.token);
      const updatedPosts = usedTablon.filter((post) => post._id !== postId);
      setUsedTablon(updatedPosts);
    } catch (error) {}
  };
  const showLikes = (index) => {
    if (activeLikesNumber !== index) {
      setActiveLikesNumber(index);
      setActiveLikes(true);
    } else {
      setActiveLikesNumber("");
      setActiveLikes(false);
    }
  };
  const showComments = (index) => {
    if (activeCommentsNumber !== index) {
      setActiveCommentsNumber(index);
      setActiveComments(true);
    } else {
      setActiveCommentsNumber("");
      setActiveComments(false);
    }
  };
  const showUser = (name) => {
    console.log(name);
    dispatch(writeId(name));
    navigate("/detailuser");
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
                  <div className="imageIcon" onClick={() => showLikes(index)}>
                    <LikeIcon color1="white" color2="var(--secondary-color)" />
                  </div>
                  Likes({post.likes ? post.likes.length : 0})
                  <div className="imageIcon" onClick={() => showComments(index)}>
                    <MessageIcon color1="white" color2="var(--secondary-color)" />
                  </div>
                  Comentarios({post.comments ? post.comments.length : 0})
                  <div className="imageIcon" onClick={() => {handleDeleteClick(post._id)}}>
                    <TrashIcon color1="none" color2="var(--secondary-color)" />
                  </div>
                </div>
                {activeLikes &&
                  post?.likes?.length > 0 &&
                  activeLikesNumber === index && (
                    <div className="likes">
                      <div>Likes:</div>
                      {post.likes.map((like, index) => (
                        <div
                          key={`like${index}`}
                          className="userLikes"
                          onClick={() => showUser(like.userName)}
                        >
                          {like.userName}
                        </div>
                      ))}
                    </div>
                  )}
                {activeComments &&
                  post.comments.length > 0 &&
                  activeCommentsNumber === index && (
                    <div className="comments">
                      {post.comments.map((comment, index) => (
                        <div key={`comment${index}`} className="commentCard">
                          <div className="commentPhoto">
                            <img src={comment.authorId.photo}></img>
                          </div>
                          <div className="commentInfo">
                            <div
                              className="commentAuthor"
                              onClick={() =>
                                showUser(comment.authorId.userName)
                              }
                            >
                              @{comment.authorId.userName}:
                            </div>
                            <div className="commentMessage">
                              {comment.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
