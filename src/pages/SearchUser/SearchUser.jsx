import "./SearchUser.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { MyInput } from "../../common/MyInput/MyInput";
import { getUsers } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { writeId } from "../../app/slices/userDetailSlice";
import { useNavigate } from "react-router-dom";

export const SearchUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchCriteria, setSearchCriteria] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const reduxUser = useSelector(userData);

  useEffect(() => {
    setError(false);
    const searching = setTimeout(() => {
      searchUsers();
    }, 350);
    return () => clearTimeout(searching);
  }, [searchCriteria]);

  const inputHandler = (e) => {
    setSearchCriteria(e.target.value);
  };

  const searchUsers = async () => {
    try {
      const query = "userName=" + searchCriteria;

      if (searchCriteria.length === 0) {
        setUsers([]);
        return;
      }
      const newUsers = await getUsers(query, reduxUser.credentials.token);

      if (newUsers === "Users not found") {
        setError(true);
      }
      setUsers(newUsers);
    } catch (error) {}
  };

  const detailUser = (userName) => {
    dispatch(writeId(userName));
    navigate("/detailuser");
  };

  return (
    <div className="searchUserDesign">
      <div className="separator"></div>
      <MyInput
        className="authInputDesign"
        type="text"
        name="searchUser"
        placeholder="Buscar usuario"
        value={searchCriteria || ""}
        onChangeFunction={inputHandler}
      />
      <div className="separator"></div>
      <div className="usersList">
        {Array.isArray(users) &&
          users.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="user"
              onClick={() => detailUser(user.userName)}
            >
              <p>{user.userName}</p>
            </div>
          ))}
        {((Array.isArray(users) && users.length === 0) || error === true) && (
          <p>No hay usuarios que coindidan con la búsqueda</p>
        )}
      </div>
    </div>
  );
};
