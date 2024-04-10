import { useEffect, useState } from "react";
import "./DetailUser.css";
import { getUsers } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

export const DetailUser = () => {
    const reduxUser = useSelector(userData);
  const [userProfile, setUserProfile] = useState({});
  const [criteria, setCriteria] = useState({
    name: "Ramiro",
  });
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      const user = await getUsers(criteria, reduxUser.credentials.token);
      console.log(user);
      setUserProfile(user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userProfile);
  return (
    <>
      <div className="detailUserDesign">
        {userProfile ? <div>Hay perfil</div> : <div>No hay perfil</div>}
      </div>
    </>
  );
};
