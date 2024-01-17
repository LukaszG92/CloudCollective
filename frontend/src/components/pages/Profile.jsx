import React from "react";
import styled from "styled-components";
import Topbar from "../Topbar/Topbar";

function Profile() {
    return (
        <>
            <Topbar />
            <ProfileContainer>
                <div className="profileWrapper">
                    <div className="profilePicture">
                        <img
                            src={'http://localhost:3000/images/defaultavatar.png'}
                            alt=""
                            className="ProfilePictureImg"
                        />
                    </div>
                    <div className="profileData">
                        <div className="profileSettings">
                            <span className="profileSettingsUsername">L</span>
                                <a className="profileSettingsButton" href="/">
                                    Edit profile
                                </a>
                                <button className="rightbarFollowButton">
                                    Follow
                                </button>
                        </div>
                        <div className="profileInfo">
                            <span className="profileInfoPost">
                                <span className="profileInfoNum"></span>
                                5 Posts
                            </span>
                            <span className="profileInfoFollowers">
                                <span className="profileInfoNum"></span>
                                5 followers
                            </span>
                            <span className="profileInfoFollowings">
                                <span className="profileInfoNum"></span>
                                5 followings
                            </span>
                        </div>
                        <div className="profileBio">
                            <span className="profileBioUsername">L</span>
                            <span className="profileBioBio">Bio</span>
                        </div>
                    </div>
                </div>
            </ProfileContainer>
            <ProfilePosts>
                <div className="postsWrapper">
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
                    <div className="profilePostWrapper">
                        <div className="profilePost">
                            <img
                                src={"http://localhost:3000/images/defaultpost.jpg"}
                                alt=""
                                className="profilePostImg"
                            />
                        </div>
                    </div>
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
        width: 30;
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