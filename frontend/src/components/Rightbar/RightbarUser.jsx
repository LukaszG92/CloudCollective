import { useNavigate} from "react-router-dom"
import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../../context/auth-context"
import {NotificationManager} from "react-notifications";

function RightbarUser(props) {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [user, setUser] = useState([])

    const unfollowHandler = async (e) => {
        e.preventDefault()
        let response = await fetch("http://localhost:8000/api/users/follow/" + user.username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: auth.username,
            })
        })
        let responseData = await response.json()
        if(response.status === 200)
            window.location.reload()
        if(response.status === 500)
            NotificationManager.error(responseData.message, 'Internal server error.', 2000)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:8000/api/users/u/'+props.username)
            const responseData = await response.json()
            if(response.status === 200)
                setUser(responseData.data.user)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchUserData()
    }, [props.username])

    return (
            <div key={user.username} className="rightbarFollowing">
                <div className="rightbarfollowingLeft"
                     style={{textDecoration: "none", color: "#000000"}}
                    onClick={() => navigate(`/profile/${user.username}`) }>
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
        )
}

export default RightbarUser
