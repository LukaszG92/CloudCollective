import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Topbar from "../Topbar/Topbar";
import EditProfile from "../EditProfile";
import Modal from "../UI/Modal";
import {useLocation, useNavigate} from "react-router-dom";
import ProfilePost from "../ProfilePost";
import {AuthContext} from "../../context/auth-context";

function Profile() {
    const auth = useContext(AuthContext)
    const { state } = useLocation();
    const [buttonText, setButtonText] = useState("");
    const [posts, setPosts] = useState([])
    const [userData, setUserData] = useState({});
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [showEditProfile, setshowEditProfile] = useState(false);

    const hideEditProfileHandler = () => {
        setshowEditProfile(false);
    };
    const showEditProfileHandler = (e) => {
        e.preventDefault();
        setshowEditProfile(true);
    };

    const followHandler = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:8000/api/users/follow/" + userData.username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: auth.username,
            })
        });
        window.location.reload();
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:8000/api/users/u/'+state.username);
            const responseData = await response.json();
            setUserData(responseData.data.user);
        };
        fetchUserData();
        const fetchPost = async () => {
            const response = await fetch('http://localhost:8000/api/posts/u/'+state.username);
            const responseData = await response.json();
            setPosts(responseData.data.posts)
        };
        fetchPost();
        const fetchFollowing = async () => {
            const response = await fetch('http://localhost:8000/api/users/'+state.username+'/followings');
            const responseData = await response.json();
            setFollowing(responseData.data.followings)
        };
        fetchFollowing();
        const fetchFollower = async () => {
            const response = await fetch('http://localhost:8000/api/users/'+state.username+'/followers');
            const responseData = await response.json();
            console.log(responseData.data.followers)
            setFollower(responseData.data.followers)
            if(responseData.data.followers.includes(auth.username))
                setButtonText("Unfollow");
            else
                setButtonText("Follow");
        };
        fetchFollower();
    }, [state.username, buttonText]);

    return (
        <>
            {showEditProfile && (
                <Modal onClose={hideEditProfileHandler}>
                    <EditProfile onClose={hideEditProfileHandler}
                                 setUserData={setUserData}
                                 user={userData}/>
                </Modal>
            )}
            <Topbar />
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
    );
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
        justify-content: center;
    }
    .profilePostImg {
        width: 100%;
        height: 100%;
        object-fit: fill;
        display: block;
    }
`;
export default Profile;