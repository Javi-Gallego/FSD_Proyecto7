import "./SearchUser.css";

import { useState } from "react";
import { useSelector } from "react-redux";

export const SearchUser = () => {
    return (
        <div className="searchUserDesign">
            <input type="text" placeholder="Buscar usuario"></input>
            <button>Buscar</button>
        </div>
    );
};