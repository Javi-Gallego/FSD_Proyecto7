import "./UserCard.css";
import spinner from "../../img/rocket.gif";
import likeIcon from "../../assets/heart.svg";
import commentIcon from "../../assets/message.svg";
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { followUser, getPosts } from "../../services/apiCalls";
import { MyButton } from "../MyButton/MyButton";
import dayjs from "dayjs";
import { update } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";

export const UserCard = (user) => {
  const reduxUser = useSelector(userData);
  const [allowed, setAllowed] = useState(false);
  const [follow, setFollow] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (
      user["user"].following.includes(reduxUser.credentials.user.userId) ||
      user["user"].privacy === "public"
    ) {
      setAllowed(true);
    }
    const includes = reduxUser.credentials.user.following.some(follow => follow.userName === user["user"].userName);
    if (includes) {
      setFollow(true);
    }
  }, []);

  useEffect(() => {
    if (allowed) {
      retrievePosts();
    }
  }, [allowed]);

  useEffect(() => {
    if (messages.length > 0) {
    }
  }, [messages]);

  const retrievePosts = async () => {
    try {
      let query = `userName=${user["user"].userName}`;
      const posts = await getPosts(query, reduxUser.credentials.token);

      console.log("messagelength", messages.length)
      setMessages(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const followFunction = async () => {
    try {
      const newfollow = await followUser(user["user"]._id, reduxUser.credentials.token);
      setFollow(!follow);
      newArray = { following: reduxUser.credentials.user.following };
    } catch (error) {
      
    }
  };

  return (
    <>
    <div className="userCardDesign">
      <div className="userCardName">@{user["user"].userName}</div>
      <img className="userPhoto" src={user["user"].photo}></img>
      <div className="userCardData">
        <p>Siguiendo ({user["user"].following.length})</p>
        <p>Seguidores ({user["user"].following.length})</p>
        <MyButton text={follow ? "Unfollow" : "Follow"} functionClick={followFunction} currentClass="buttonFollow"/>
        </div>
    </div>
        {!allowed ? (
          <p>Este usuario tiene la cuenta privada</p>
        ) : messages.length === 0 ? (
          <div className="ownPostsDesign">
            <img src={spinner}></img>
          </div>
        ) : (
          <div className="postMap">
            {Array.isArray(messages) && messages?.map((post, index) => {
               return (
                <div key={`message${index}`} className="mensajeDesign">
                    <img className="messageAuthorPhoto" src={post.authorId.photo}></img>
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
                        <img src={likeIcon} onClick={() => showLikes(index)} />
                        Likes({post.likes ? post.likes.length : 0})
                        <img src={commentIcon} onClick={() => showComments(index)} />
                        Comentarios({post.comments ? post.comments.length : 0})
                        <div className="date">Posteado el {dayjs(post.createdAt).format("DD-MMM-YY HH:mm")}</div>
                    </div>
                    </div>
                </div>)
            })}
            </div>
        )}
      </>
  );
};
