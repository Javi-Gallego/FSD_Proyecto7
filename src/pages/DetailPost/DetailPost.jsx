import "./DetailPost.css";

export const DetailPost = () => {
  return (
    <>
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
    </>
  );
};
