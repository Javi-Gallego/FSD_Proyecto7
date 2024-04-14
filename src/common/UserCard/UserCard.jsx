import "./UserCard.css";
import spinner from "../../img/rocket.gif";
import likeIcon from "../../assets/heart.svg";
import likedIcon from "../../assets/redhearth.svg";
import commentIcon from "../../assets/message.svg";
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { followUser, getPosts } from "../../services/apiCalls";
import { MyButton } from "../MyButton/MyButton";
import dayjs from "dayjs";
import { update } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";
import { writeId } from "../../app/slices/commentSlice";
import { useNavigate } from "react-router-dom";
import { MessageIcon } from "../MessageIcon/MessageIcon";
import { LikeIcon } from "../LikeIcon/LikeIcon";

export const UserCard = (user) => {
  const reduxUser = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [follow, setFollow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [detailUser, setDetailUser] = useState({ user });

  useEffect(() => {
    if (
      user["user"].following.includes(reduxUser.credentials.user.userId) ||
      user["user"].privacy === "public"
    ) {
      setAllowed(true);
      setDetailUser(user["user"]);
    }
    if (reduxUser.credentials.user.following) {
      const includes = reduxUser.credentials.user.following.some(
        (follow) => follow.userName === user["user"].userName
      );
      if (includes) {
        setFollow(true);
      }
    }
  }, [follow]);

  useEffect(() => {
    if (allowed) {
      retrievePosts();
    }
  }, [allowed]);

  useEffect(() => {
    console.log("actualiza detail User");
  }, [messages, detailUser]);

  const [usedTablon, setUsedTablon] = useState([]);

  const handleLikeClick = async (postId) => {
    try {
      newLike = await likeFunction(postId, reduxUser.credentials.token);
      console.log("newLike: ", newLike);
      const newTablon = await getData();
      setUsedTablon(newTablon);
    } catch (error) {}
  };

  const getData = async () => {
    try {
        return (tablon = await getTimeline(reduxUser.credentials.token));
    } catch (error) {}
  };

  const handleComment = (postId) => {
    dispatch(writeId(postId));
    navigate("/sendcomment");
  };

  const retrievePosts = async () => {
    try {
      let query = `userName=${user["user"].userName}`;
      const posts = await getPosts(query, reduxUser.credentials.token);

      setMessages(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const followFunction = async () => {
    try {
      const newfollow = await followUser(
        user["user"]._id,
        reduxUser.credentials.token
      );
      console.log(newfollow.userToFollow.followers);
      setDetailUser(newfollow.userToFollow);
      setFollow(!follow);
    } catch (error) {}
  };

  return (
    <>
      <div className="userCardDesign">
        <div className="userCardName">@{detailUser.userName}</div>
        <img className="userPhoto" src={detailUser.photo}></img>
        <div className="userCardData">
          <p>
            Siguiendo ({detailUser?.following ? detailUser.following.length : 0}
            )
          </p>
          <p>
            Seguidores ({detailUser?.folowers ? detailUser.followers.length : 0}
            )
          </p>
          <MyButton
            text={follow ? "Unfollow" : "Follow"}
            functionClick={followFunction}
            currentClass="buttonFollow"
          />
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
          {Array.isArray(messages) &&
            messages.length > 0 &&
            messages?.map((post, index) => {
              return (
                <div key={`message${index}`} className="mensajeDesign">
                  <img
                    className="messageAuthorPhoto"
                    src={post.authorId.photo}
                  ></img>
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
                      <div
                        className="imageIcon"
                        onClick={() => handleLikeClick(post._id)}
                      >
                        {post.likes.some(
                          (like) =>
                            like.userName ===
                            reduxUser.credentials.user.userName
                        ) ? (
                          <LikeIcon color1="red" color2="red" />
                        ) : (
                          <LikeIcon
                            color1="white"
                            color2="var(--secondary-color)"
                          />
                        )}
                      </div>
                      Likes({post.likes ? post.likes.length : 0}):
                      <div
                        className="imageIcon"
                        onClick={() => handleComment(post._id)}
                      >
                        <MessageIcon
                          color1="white"
                          color2="var(--secondary-color)"
                        />
                      </div>
                      Comentarios({post.comments ? post.comments.length : 0})
                      <div className="date">
                        {dayjs(post.createdAt).format("DD-MMM-YY HH:mm")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
