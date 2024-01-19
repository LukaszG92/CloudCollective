import PropTypes from 'prop-types';
import { FiMoreVertical } from "react-icons/fi";
import {Link, useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {formatDistance} from "date-fns";
import {AiFillHeart} from "react-icons/ai";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth-context";
import Modal from "./UI/Modal";
import EditPost from "./EditPost";

export default function Post( props ) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(props.post)
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0)
    const [likes, setLikes] = useState([]);
    const [showEditPost, setShowEditPost] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [profilePic, setProfilePic] = useState("");

    const likeHandler = async () => {
        let response = await fetch("http://localhost:8000/api/posts/"+post.id+"/like", {
            headers: {
                Authorization: auth.username
            }
        })
        let responseData = await response.json();
        setLikesCount(isLiked ? likes.length - 1 : likes.length + 1);
    }

    const deletePostHandler = async () => {
        let response = await fetch("http://localhost:8000/api/posts/"+post.id, {
            method: 'DELETE'
        })
        window.location.reload();
    }

    useEffect(() => {
        const fetchProfilePic = async () => {
            const response = await fetch('http://localhost:8000/api/users/u/'+post.creatorUsername);
            const responseData = await response.json();
            setProfilePic(responseData.data.user.profilePic)
        };
        fetchProfilePic();
    }, [post.creatorUsername]);

    useEffect(() => {
        const fetchPostLikes = async () => {
            let response = await fetch('http://localhost:8000/api/posts/' + post.id + '/likes');
            let responseData = await response.json();
            console.log(responseData.data.likes);
            setLikes(responseData.data.likes);
        }
        fetchPostLikes();
    }, [likesCount])

    useEffect(() => {
        const getIsLiked = () => {
            setIsLiked(likes.includes(auth.username));
        }
        getIsLiked();
    }, [likes]);

    return (
        <PostContainer>
            {showEditPost && (
                <Modal onClose={()=>{
                    setShowEditPost(false)
                    setShowMenu(false)
                    }
                }>
                    <EditPost onClose={()=>{
                        setShowEditPost(false)
                        setShowMenu(false)
                        }
                    }
                                 setPost={setPost}
                                 post={post}/>
                </Modal>
            )}
            <div key={post.id} className="postTop">
                <div className="postTopLeft"
                     onClick={() => {navigate("/profile", {state:{username:post.creatorUsername}})}}>
                    <img
                        src={profilePic}
                        alt=""
                        className="postProfileImg"
                    />
                    <span className="postUsername">{post.creatorUsername}</span>
                </div>
                <div className="postTopright">
                    <span className="postDate"> {formatDistance(post.createdAt, new Date())} ago</span>
                    {(post.creatorUsername === auth.username) &&
                        <FiMoreVertical
                            onClick={() => {
                                setShowMenu(!showMenu);
                            }}
                        />
                    }
                    {showMenu && (
                        <div className="TopbarMenu">
                                <span className="menuItems" onClick={()=>{setShowEditPost(true)}}> Edit </span>
                            <span className="menuItems" onClick={deletePostHandler}> Delete </span>
                        </div>
                    )}
                </div>
            </div>
            <hr className="hrh"/>
            <div className="postCenter">
                <div className="postImgWrapper">
                    <img
                        src={post.image}
                        alt=""
                        className="postImg"
                    />
                </div>
                <p className="postText">{post.description}</p>
            </div>
            <hr className="hrh"/>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <AiFillHeart onClick={likeHandler}
                        className="likeIcon"
                        color={isLiked ? "red" : "#e0e0e0ed"}
                    />
                    <span
                        className="postLikeCounter"
                    >
              {likes.length} Likes 0 Comments
            </span>
                </div>
            </div>
        </PostContainer>
    );
}

const PostContainer = styled.div`
    width: 99%;
    border-radius: 10px;
    border: 1px solid rgb(211, 211, 211);
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    margin-top: 10px;
    margin-bottom: 50px;
    .postTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
    }
    .postTopright {
        position: relative;
    }
    .topRightPanel {
        position: absolute;
        background-color: #eaeaea;
        width: 80px;
        height: 30px;
        right: 5px;
        z-index: 60;
        border-radius: 5px;
        border: 1px solid rgb(211, 211, 211);
        -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
        box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
        padding-top: 10px;
        text-align: center;
        &:hover {
            cursor: pointer;
        }
    }
    .postTopLeft {
        display: flex;
        align-items: center;
    }
    .postProfileImg {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }
    .postUsername {
        font-size: 15px;
        font-weight: 500;
        padding: 0 10px;
    }
    .postDate {
        font-size: 10px;
        font-weight: 500;
    }
    .postImgWrapper {
        padding-right: 3px;
        padding-left: 3px;
    }
    .postImg {
        padding-top: 5px;
        width: 100%;
        object-fit: contain;
    }
    .postCenter {
        display: flex;
        flex-direction: column;
    }
    .postText {
        padding-top: 5px;
        padding-bottom: 3px;
        font-weight: 400;
        font-size: 15px;
        padding-left: 4px;
    }
    .postBottom {
        padding-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 4px;
    }
    .postBottomLeft {
        display: flex;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
    }
    .likeIcon {
        font-size: 30px;
        padding-right: 5px;
        cursor: pointer;
    }
    .postLikeCounter {
        font-size: 15px;
    }
    .hrh {
        opacity: 0.4;
    }
    .TopbarMenu {
        position: absolute;
        top: 42px;
        width: 120px;
        right: -4px;
        background-color: #f1f1f1;
        display: flex;
        flex-direction: column;
        -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
        box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    }
    .menuItems {
        margin: 7px;
        border-bottom: 1px solid #e1e1e1;
        color: black;
        cursor: pointer;
    }
`;
