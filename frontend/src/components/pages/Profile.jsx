import React, {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import Topbar from "../Topbar/Topbar"
import EditProfile from "../EditProfile"
import Modal from "../UI/Modal"
import { useParams } from "react-router-dom"
import ProfilePost from "../ProfilePost"
import {AuthContext} from "../../context/auth-context"
import {NotificationManager, NotificationContainer } from "react-notifications"

function Profile() {
    const auth = useContext(AuthContext)
    const username = useParams().username

    const [editedProfile, setEditedProfile] = useState(false)
    const [buttonText, setButtonText] = useState("")
    const [posts, setPosts] = useState([])
    const [userData, setUserData] = useState({})
    const [follower, setFollower] = useState([])
    const [following, setFollowing] = useState([])
    const [showEditProfile, setshowEditProfile] = useState(false)

    const hideEditProfileHandler = () => {
        setEditedProfile(true)
        setshowEditProfile(false)
    }
    const showEditProfileHandler = (e) => {
        e.preventDefault()
        setEditedProfile(false)
        setshowEditProfile(true)
    }

    const followHandler = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.BASE_URL}api/users/follow/${userData.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: auth.username,
            })
        })
        let responseData = await response.json()
        if(response.status === 200) {
            NotificationManager.success(responseData.message, 'Operation completed successfully.', 2000)
            setButtonText(buttonText === "Unfollow" ? "Follow" : "Unfollow")
        }
        if(response.status === 500)
            NotificationManager.error(responseData.message, 'Internal server error.', 2000)

    }

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`${process.env.BASE_URL}/api/users/u/${username}`)
            const responseData = await response.json()
            if(response.status === 200)
                setUserData(responseData.data.user)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchUserData()
        const fetchPost = async () => {
            const response = await fetch(`${process.env.BASE_URL}/api/posts/u/${username}`)
            const responseData = await response.json()
            if(response.status === 200)
                setPosts(responseData.data.posts)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchPost()
        const fetchFollowing = async () => {
            const response = await fetch(`${process.env.BASE_URL}/api/users/${username}/followings`)
            const responseData = await response.json()
            if(response.status === 200)
                setFollowing(responseData.data.followings)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchFollowing()
        const fetchFollower = async () => {
            const response = await fetch(`${process.env.BASE_URL}/api/users/${username}/followers`)
            const responseData = await response.json()
            if(response.status === 200) {
                setFollower(responseData.data.followers)
                if(responseData.data.followers.includes(auth.username))
                    setButtonText("Unfollow")
                else
                    setButtonText("Follow")
            }
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)

        }
        fetchFollower()
    }, [username, editedProfile, buttonText, auth.username])

    return (
        <>
            {showEditProfile && (
                <Modal onClose={hideEditProfileHandler}>
                    <EditProfile onClose={hideEditProfileHandler}
                                 user={userData}/>
                </Modal>
            )}
            <Topbar />
            <NotificationContainer/>
            <ProfileContainer>
                <div className="profileWrapper">
                    <div className="profilePicture">
                        <img
                            src={userData.profilePic}
                            alt=""
                            className="ProfilePictureImg"
                        />
                    </div>
                    <div className="profileData">
                        <div className="profileSettings">
                            <span className="profileSettingsUsername">{userData.username}</span>
                            { (userData.username === auth.username) ?
                                <a
                                    className="profileSettingsButton"
                                    onClick={showEditProfileHandler}
                                    href="/"
                                >
                                    Edit profile
                                </a>
                                :
                                <button className="rightbarFollowButton" onClick={followHandler}>
                                    {buttonText}
                                </button>
                            }
                        </div>
                        <div className="profileInfo">
                            <span className="profileInfoPost">
                                <span className="profileInfoNum"></span>
                                {posts.length} Posts
                            </span>
                            <span className="profileInfoFollowers">
                                <span className="profileInfoNum"></span>
                                {follower.length} followers
                            </span>
                            <span className="profileInfoFollowings">
                                <span className="profileInfoNum"></span>
                                {following.length} followings
                            </span>
                        </div>
                        <div className="profileBio">
                            <span className="profileBioUsername">{userData.nome} {userData.cognome}</span>
                            <span className="profileBioBio">{userData.bio}</span>
                        </div>
                    </div>
                </div>
            </ProfileContainer>
            <ProfilePosts>
                <div className="postsWrapper">
                    {posts.map( (p) => (
                            <ProfilePost
                                postId = {p}
                            />
                        )
                    )}
                </div>
            </ProfilePosts>
        </>
    )
}

const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    .profileWrapper {
        display: flex;
        width: 999px;
        @media (max-width: 655px) {
            flex-direction: column;
        }
    }
    .profilePicture {
        display: flex;
        justify-content: center;
        flex-grow: 1;
    }
    .ProfilePictureImg {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        object-fit: cover;
        @media (max-width: 655px) {
            width: 30vw;
            height: 30vw;
            border-radius: 50%;
            object-fit: cover;
        }
    }
    .profileData {
        flex-grow: 2;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media (max-width: 655px) {
            flex-basis: auto;
            padding: 10px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
    }
    .profileSettings {
        display: flex;
        height: 30px;
        width: 100%;
        align-items: flex-end;
        @media (max-width: 655px) {
            padding-bottom: 5px;
        }
    }
    .profileSettingsUsername {
        width: 280px;
        font-size: 30px;
        font-weight: 300;
        @media (max-width: 655px) {
            font-size: 25px;
            width: 200px;
        }
    }
    .profileSettingsButton {
        display: block;
        font-size: 14px;
        border: 1px solid black;
        border-radius: 4px;
        text-decoration: none;
        padding: 5px 9px;
        box-sizing: border-box;
        color: black;
        cursor: pointer;
    }
    .profileSettingsButton:visited {
        text-decoration: none;
    }
    .profileSettingsIcon {
        padding-left: 10px;
        cursor: pointer;
        font-size: 28px;
    }
    .profileInfo {
        display: flex;
    }
    .profileInfoPost {
        padding-right: 30px;
    }
    .profileInfoFollowers {
        padding-right: 30px;
    }
    .profileInfoNum {
        font-weight: bold;
    }
    .profileBio {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .profileBioUsername {
        font-size: 18px;
        font-weight: bold;
    }
    .profileBioBio {
        font-size: 15px;
        font-weight: 300;
        max-width: 400px;
        text-align: justify;
    }
    .rightbarFollowButton {
        margin-top: 30px;
        border: none;
        background-color: #1872f2;
        color: white;
        border-radius: 5px;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }
    .rightbarFollowButton:focus {
        outline: none;  
    }
`;

const ProfilePosts = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    .postsWrapper {
        display: flex;
        width: 999px;
        flex-wrap: wrap;
    }
    .profilePostWrapper {
        padding: 1%;
        aspect-ratio: 1 / 1;
        flex-grow: 1;
        width: 30%;
        max-width: 30%;
        display: flex;
    }
    .profilePost {
        width: 100%;
        height: 100%;
        padding: 1%;
        
    }
    .profilePostImg {
        max-height: 100%;
        max-width: 100%;
        margin: auto;
        display: block;
    }
`

export default Profile