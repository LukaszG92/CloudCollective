import { FiMoreVertical } from "react-icons/fi"
import { useNavigate} from 'react-router-dom'
import styled from "styled-components"
import {AiFillHeart} from "react-icons/ai"
import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/auth-context"
import Modal from "./UI/Modal"
import EditPost from "./EditPost"
import {NotificationManager} from "react-notifications"
import NotificationContainer from "react-notifications/lib/NotificationContainer"

export default function Post( props ) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const post = props.post

    const [commentInput, setCommentInput] = useState("")
    const [comments, setComments] = useState([])
    const [showPost, setShowPost] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState([])
    const [showEditPost, setShowEditPost] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [profilePic, setProfilePic] = useState("")

    const addCommentHandler = async () => {
        let response = await fetch("http://localhost:8000/api/comments/"+post.id+"/new", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth.username
            },
            body: JSON.stringify({
                commentInput
            })
        })
        let responseData = await response.json()
        if(response.status === 200)
            setShowPost(!showPost)
        if(response.status === 422)
            NotificationManager.warning(responseData.message, 'Invalid data warning.', 2000)
        if(response.status === 500)
            NotificationManager.error(responseData.message, 'Internal server error.', 2000)

    }

    const closeHandler = () => {
        setShowEditPost(false)
        setShowMenu(false)
    }

    const likeHandler = async () => {
        let response = await fetch("http://localhost:8000/api/posts/"+post.id+"/like", {
            headers: {
                Authorization: auth.username
            }
        })
        let responseData = await response.json()
        if(response.status === 200)
            setIsLiked(!isLiked)
        if(response.status === 500)
            NotificationManager.error(responseData.message, 'Internal server error.', 2000)
    }

    const deletePostHandler = async () => {
        let response = await fetch("http://localhost:8000/api/posts/"+post.id, {
            method: 'DELETE'
        })
        let responseData = await response.json()
        if(response.status === 200)
            NotificationManager.success(responseData.message, 'Operation completed successfully', 2000)
        if(response.status === 500)
            NotificationManager.error(responseData.message, 'Internal server error.', 2000)
    }

    useEffect(() => {
        const fetchProfilePic = async () => {
            const response = await fetch('http://localhost:8000/api/users/u/'+post.creatorUsername)
            const responseData = await response.json()
            if(response.status === 200)
                setProfilePic(responseData.data.user.profilePic)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchProfilePic()
    }, [])

    useEffect(() => {
        const fetchPostLikes = async () => {
            let response = await fetch('http://localhost:8000/api/posts/' + post.id + '/likes')
            let responseData = await response.json()
            if(response.status === 200)
                setLikes(responseData.data.likes)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchPostLikes()
    }, [isLiked])

    useEffect(() => {
        const getIsLiked = () => {
            setIsLiked(likes.includes(auth.username))
        }
        getIsLiked()
    }, [likes])

    useEffect( () =>{
        const fetchComments = async () => {
            let response = await fetch(`http://localhost:8000/api/comments/${post.id}`)
            let responseData = await response.json()
            if(response.status === 200)
                setComments(responseData.data.comments)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)

        }
        fetchComments()
    }, [showPost])

    return (
        <PostContainer>
            {showEditPost && (
                <Modal onClose={closeHandler}>
                    <EditPost onClose={closeHandler}
                              post={post} />
                </Modal>
            )}
            {showPost && (
                <Modal
                    onClose={() => {
                        setShowPost(false)
                    }}
                >
                    <ShowPostContainer>
                        <NotificationContainer/>
                        <div className="addComment">
                            <form onSubmit={addCommentHandler} >
                            <input
                                onChange={(e) => {
                                    setCommentInput(e.target.value)
                                }}
                                className="addCommentInput"
                                placeholder="Write your comment here..."
                                value={commentInput}
                                required
                                type="text"
                            />
                            <button className="addCommentButton" >
                                Add Comment
                            </button>
                            </form>
                        </div>
                        <div className="showComments">
                            {comments.map( (c) => (
                            <div key={c.id} className="oneComment">
                                <div className="usernameAndCommentWrapper">
                                    <span className="usernameComment">{c.authorUsername}</span>
                                    <span className="Comment">{c.body}</span>
                                </div>
                            </div>
                            ))}
                        </div>
                    </ShowPostContainer>
                </Modal>
            )}
            <div className="postTop">
                <div className="postTopLeft"
                     onClick={() => {navigate(`/profile/${post.creatorUsername}`)}}>
                    <img
                        src={profilePic}
                        alt=""
                        className="postProfileImg"
                    />
                    <span className="postUsername">{post.creatorUsername}</span>
                </div>
                <div className="postTopright">
                    {(post.creatorUsername === auth.username) &&
                        <FiMoreVertical
                            onClick={() => {
                                setShowMenu(!showMenu)
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
                <div className="postBottomLeft" onClick={likeHandler}>
                    <AiFillHeart
                                 className="likeIcon"
                                 color={isLiked ? "red" : "#e0e0e0ed"}
                    />
                    <span className="postLikeCounter">
                        {likes.length} Likes
                    </span>
                </div>
                <div className="postBottomLeft" onClick={() => {setShowPost(true)}}>
                    <img
                         className="commentIcon"
                         src='http://localhost:3000/images/comment.png'
                         alt=''
                    />
                    <span className="postLikeCounter">
                        {comments.length} Comments
                    </span>
                </div>
            </div>
        </PostContainer>
    )
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
        max-height: 450px;
        max-width: 450px;
        margin: auto;
        display: block;
    }

    .postCenter {
        display: flex;
        flex-direction: column;
    }

    .postText {
        padding: 5px;
        font-weight: 400;
        font-size: 15px;
    }

    .postBottom {
        padding-top: 5px;
        display: flex;
        align-items: center;
        padding-left: 4px;
    }

    .postBottomLeft {
        padding-right: 10px;
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

    .commentIcon {
        width: 22px;
        height: 22px;
        padding: 2px 5px 2px 2px;
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

const ShowPostContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .addComment {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: solid 1px #cecdcd;
    @media (max-width: 655px) {
      flex-direction: column;
    }
  }
  .addCommentInput {
    width: 70%;
    border: none;
    padding: 7px;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
    @media (max-width: 655px) {
      width: 90%;
    }
  }
  .addCommentButton {
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: #4a4b4b;
    color: white;
    margin: 5px;
  }
  .showComments {
    width: 100%;
    margin-top: 10px;
    height: 30vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(192, 192, 192);
    }
  }
  .oneComment {
    display: flex;
    margin-bottom: 5px;
  }
  .usernameAndCommentWrapper {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    padding: 5px;
    border: solid 1px #cecdcd;
    border-radius: 10px;
    width: 100%;
  }
  .usernameComment {
    font-weight: bold;
  }
`