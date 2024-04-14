import { getFollowing } from "../../services/apiCalls";
import "./Following.css";

import React, { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

export function Following() {
    const reduxUser = useSelector(userData);
    const [following, setFollowing] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    
    useEffect(() => {
        fetchFollowing();
    }, [page, limit]);
    
    const fetchFollowing = async () => {
        try {
            const newFollowing = await getFollowing(reduxUser.credentials.token);
            console.log(newFollowing[0].following);
            
            setFollowing(newFollowing[0].following);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClick = (e) => {
        
    };
    return (
        <div className="followingDesign">
        {Array.isArray(following) && following.length > 0 
        ? ( 
            following.map((user) => (
            <div key={user._id} className="followings" onClick={handleClick}>
                <img src={user.photo} alt="profile" />
                <div>
                    <h3>@{user.userName}</h3>
                </div>
            </div>
        ) ) )
        : (<div>No sigues a nadie</div>)}
        </div>
    );
};