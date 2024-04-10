import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Timeline } from "../Timeline/Timeline";
import { OwnPosts } from "../OwnPosts/OwnPosts";
import { SendMessage } from "../SendMessage/SendMessage";
import { SendComment } from "../SendComment/SendComment";
import { DetailPost } from "../DetailPost/DetailPost";

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/ownposts" element={<OwnPosts />} />
      <Route path="/sendmessage" element={<SendMessage />} />
      <Route path="/sendcomment" element={<SendComment />} />
      <Route path="/detailpost" element={<DetailPost />} />
      <Route path="*" element={<Navigate to="/" />} replace />
    </Routes>
  );
};
