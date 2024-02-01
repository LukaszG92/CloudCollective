import React, {useEffect, useState} from "react"
import Modal from "./UI/Modal"
import Post from "./Post"
import {NotificationManager, NotificationContainer } from "react-notifications"

function ProfilePost(props) {

    const [showPost, setShowPost] = useState(false)
    const [post, setPost] = useState({})

    const hideShowPostHandler = () => {
        setShowPost(false)
    }
    const showShowPostHandler = (e) => {
        e.preventDefault()
        setShowPost(true)
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/p/${props.postId}`)
            const responseData = await response.json()
            if(response.status === 200)
                setPost(responseData.data.post)
            if(response.status === 500)
                NotificationManager.error(responseData.message, 'Internal server error.', 2000)
        }
        fetchPost()
    }, [props.postId])

    return (
    <>
        <NotificationContainer/>
        {showPost && (
            <Modal onClose={hideShowPostHandler}>
                <Post
                    post={post}
                />
            </Modal>
        )}
        <div key={post.id} className="profilePostWrapper" onClick={showShowPostHandler}>
            <div className="profilePost">
                <img
                    src={post.image}
                    alt=""
                    className="profilePostImg"
                />
            </div>
        </div>
    </>
    )
}

export default ProfilePost