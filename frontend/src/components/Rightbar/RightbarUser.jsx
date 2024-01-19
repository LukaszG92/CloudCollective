import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Post from "../Post";
import {AuthContext} from "../../context/auth-context";

function RightbarUser(props) {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [user, setUser] = useState([]);

    const unfollowHandler = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:8000/api/users/follow/" + user.username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: auth.username,
            })
        });
        props.setUnfollowed(!props.unfollowed);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:8000/api/users/u/'+props.username);
            const responseData = await response.json();
            setUser(responseData.data.user)
        };
        fetchUserData();
    }, [props.username]);

    return (
            <div className="rightbarFollowing">
                <div className="rightbarfollowingLeft"
                     style={{textDecoration: "none", color: "#000000"}}
                    onClick={() => navigate("/profile/", {state: { username: user.username } } ) }>
                        <img
                            src={user.profilePic}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                    <span className="rightbarFollowingName">{user.username}</span>
                </div>
                <div className="rightbarfollowingRight">
                    <button className="rightbarFollowButton" onClick={unfollowHandler}>
                        Unfollow
                    </button>
                </div>
            </div>
        );
}

export default RightbarUser;

Post.propTypes = {
    username: PropTypes.string.isRequired
}