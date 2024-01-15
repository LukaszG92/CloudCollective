import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function RightbarUser(props) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:8000/api/users/u/'+props.username);
            const responseData = await response.json();
            setUser(responseData.data.user)
        };
        fetchUserData();
    }, []);

    return (
        <div className="rightbarFollowing">
            <div className="rightbarfollowingLeft">
                <Link
                    style={{textDecoration: "none", color: "#000000"}}
                    to={"/profile/" + user.username}
                >
                    <img
                        src={user.profilePic}
                        alt=""
                        className="rightbarFollowingImg"
                    />
                </Link>
                <span className="rightbarFollowingName">{user.username}</span>
            </div>
            <div className="rightbarfollowingRight">
                <span className="rightbarFollowingAction">
                    UnFollow
                </span>
            </div>
        </div>
    )
}

export default RightbarUser;