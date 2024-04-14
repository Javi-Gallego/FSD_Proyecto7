import { useEffect, useState } from "react";
import "./ManagementUsers.css";
import { getUsers } from "../../services/apiCalls";
import nextArrowPage from "../../img/nextpage.png";
import prevArrowPage from "../../img/prevpage.png";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { TrashIcon } from "../../common/TrashIcon/TrashIcon";

export const ManagementUsers = () => {
  const reduxUser = useSelector(userData);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(reduxUser.credentials.token);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState("");
  const [userHovered, setUserHovered] = useState("");
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({
    userRole: "",
  });
  const [querys, setQuerys] = useState({
    userName: "",
    email: "",
    role: "",
  });

  useEffect(() => {}, [users, userHovered]);

  useEffect(() => {
    setPage(1);
    fetchUsers();
    fetchRoles();
  }, [limit]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [page]);

  const handleLimit = (e) => {
    setLimit(e.target.innerHTML);
  };
  const fetchUsers = async () => {
    try {
      let newQuery = "";
      if (querys.userName !== "") {
        newQuery += `&userName=${querys.userName}`;
      }
      if (querys.email !== "") {
        newQuery += `&email=${querys.email}`;
      }
      if (querys.role !== "") {
        newQuery += `&role=${querys.role}`;
      }
      newQuery += `&limit=${limit}&skip=${page}`;
      const newUsers = await getUsers(newQuery, token);
      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRoles = async () => {
    try {
      //   const newRoles = await getRoles(token);
      //   setRoles(newRoles);
    } catch (error) {
      console.log(error);
    }
  };
  const inputHandler = (e) => {
    setQuerys((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    fetchUsers();
  };
  const removeUser = async (userId) => {
    try {
      //   const deleted = await deleteUser(token, userId);
      //   const updatedUsers = users.filter((user) => user.id !== userId);
      //   setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDetails = (index) => {
    if (details === index) {
      setDetails("");
      return;
    }
    setDetails(index);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (users.length === parseInt(limit)) {
      setPage(page + 1);
    }
  };
  const roleHandler = (e) => {
    setNewRole({
      ...newRole,
      userRole: e.target.value,
    });
  };
  const changeRole = async (userId) => {
    try {
      //   await updateRole(token, userId, newRole);
      //   fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="adminUsersDesign">
        <div className="separator"></div>
        <div className="searchMenu fadeBack">
          <div>
            <div className="tituloSearch">Nombre</div>
            <MyInput
              type="text"
              name="userName"
              value={querys.userName || ""}
              onChangeFunction={inputHandler}
            />
          </div>
          <div>
            <div className="tituloSearch">Email</div>
            <MyInput
              type="text"
              name="email"
              value={querys.email || ""}
              onChangeFunction={inputHandler}
            />
          </div>
          <div>
            <div className="tituloSearch">Rol</div>
            <MyInput
              type="text"
              name="role"
              value={querys.role || ""}
              onChangeFunction={inputHandler}
            />
          </div>
          <MyButton
            text="Buscar"
            functionClick={fetchUsers}
            currentClass="buttonDesign"
          />
        </div>
        <div className="searchOptions fadeBack">
          <div className="limit">
            Usuarios por página:
            <div className="limitInput" value="5" onClick={handleLimit}>
              5
            </div>
            -
            <div className="limitInput" value="10" onClick={handleLimit}>
              10
            </div>
            -
            <div className="limitInput" value="20" onClick={handleLimit}>
              20
            </div>
          </div>
          <div className="page centerRow">
            <div onClick={prevPage} className="centerRow">
              <img className="pageButton" src={prevArrowPage} />
            </div>
            {`Página: ${page}`}
            <div onClick={nextPage} className="centerRow">
              <img className="pageButton" src={nextArrowPage} />
            </div>
          </div>
        </div>
        <div className="index">
          <div className="userName border centerRow back">User</div>
          <div className="firstName border centerRow back">Nombre</div>
          <div className="lastName border centerRow back">Apellido</div>
          <div className="email border centerRow back">Email</div>
          <div className="role border centerRow back">Role</div>
          <div className="delete2"></div>
        </div>
        <div className="users">
          {Array.isArray(users) &&
            users.lenth !== 0 &&
            users.map((user, index) => (
              <div
                key={index}
                className={`user ${index % 2 === 0 ? `Dark` : `Light`}`}
              >
                <div
                  className=" user firstRow"
                  onClick={() => toggleDetails(index)}
                >
                  <div className="userName centerRow">{user.userName}</div>
                  <div className="firstName centerRow">{user.firstName}</div>
                  <div className="lastName centerRow">{user.lastName}</div>
                  <div className="email centerRow">{user.email}</div>
                  <div className="role centerRow">{user.role}</div>
                  {user.role.name === "super_admin" ? (
                    <div></div>
                  ) : (
                    <div
                      className="delete centerRow"
                      onClick={() => removeUser(user._id)}
                      onMouseEnter={() => setUserHovered(user._id)}
                      onMouseLeave={() => setUserHovered("")}
                    >
                      {(userHovered === user._id) ? (
                        <TrashIcon
                          color1="rgb(252, 119, 119)"
                          color2="var(--secondary-color)"
                        />
                      ) : (
                        <TrashIcon
                          color1="none"
                          color2="var(--secondary-color)"
                        />
                      )}
                    </div>
                  )}
                </div>
                {details === index && user.role.name !== "super_admin" && (
                  <div className="details">
                    <select name="role" onChange={roleHandler}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    <MyButton
                      text="Cambiar rol"
                      functionClick={() => changeRole(user.id)}
                      currentClass="buttonDesign changeRole"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
