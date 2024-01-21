import {Link, useNavigate} from "react-router-dom";
import React from "react";

function SearchUser(props) {

    const navigate = useNavigate();

    return (
        <div className="users"
             style={{textDecoration: "none"}}
             onClick={() => {
                 navigate(`/profile/${props.user.username}`)
                 props.onClose();
             }}
         >
                <div className="user">
                    <div className="userRight">
                        <img
                            src={props.user.profilePic}
                            alt=""
                            className="searchImg"
                        />
                    </div>

                    <div className="userLeft">
                        <span>{props.user.username}</span>
                    </div>
                </div>
        </div>
    )
}

export default SearchUser;