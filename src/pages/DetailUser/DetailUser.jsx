import { useEffect, useState } from "react";
import "./DetailUser.css";
import spinner from "../../img/rocket.gif";
import { getUsers } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import { userDetailData } from "../../app/slices/userDetailSlice";
import { useSelector } from "react-redux";
import { UserCard } from "../../common/UserCard/UserCard";

export const DetailUser = () => {
  const reduxUser = useSelector(userData);
  const reduxUserDetail = useSelector(userDetailData);
  const [userProfile, setUserProfile] = useState({});
  
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      console.log("user a buscar: ", reduxUserDetail.userId);
      let query = "userName=" + reduxUserDetail.userId;
      const user = await getUsers(query, reduxUser.credentials.token);

      setUserProfile(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {Object.keys(userProfile).length !== 0
      ? (
        <div className="detailUserDesign">
          <UserCard user={userProfile[0]} />
        </div>
      ) 
      : (
        <div className="ownPostsDesign">
          <img src={spinner}></img>
        </div>
      )}
    </>
  );
};
